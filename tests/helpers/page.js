/* global expect */
const puppeteer = require('puppeteer');
const createSession = require('../config/login');
const createUser = require('../config/user');

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: process.env.NODE_ENV === 'ci',
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function (target, property) {
        return customPage[property] || browser[property] || page[property];
      },
    });
  }

  async login(elem, route) {
    const user = await createUser();
    const { session, sig } = createSession(user);
    await this.setCookie({
      name: 'session',
      value: session,
    });
    await this.setCookie({
      name: 'session.sig',
      value: sig,
    });
    await this.goto(`http://localhost:3000${route || ''}`);
    if (elem) {
      await this.waitFor(elem);
    }
  }

  async getContents(elem) {
    const target = await this.$eval(elem, el => el.innerHTML);
    return target;
  }

  async testURL(_regex) {
    const url = await this.url();
    const regex = new RegExp(_regex);
    expect(regex.test(url)).toEqual(true);
  }

  hitAPI(opts) {
    const { path, method, bodyData } = opts;

    return this.page.evaluate((_path, _method, _bodyData) => {
      return fetch(_path, {
        method: _method,
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(_bodyData) || undefined,
      }).then(res => res.json());
    }, path, method, bodyData);
  }

  constructor(page) {
    this.page = page;
  }
}

module.exports = CustomPage;
