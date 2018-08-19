/* global expect */
const puppeteer = require('puppeteer');
const createSession = require('../config/login');
const createUser = require('../config/user');

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false,
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
    await this.goto(`localhost:3000${route || ''}`);
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

  getAPI(path) {
    return this.page.evaluate((_path) => {
      return fetch(_path, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
    }, path);
  }

  postAPI(path, data) {
    return this.page.evaluate((_path, _data) => {
      return fetch(_path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(_data),
      }).then(res => res.json());
    }, path, data);
  }

  deleteAPI(path) {
    return this.page.evaluate((_path) => {
      return fetch(_path, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
    }, path);
  }

  constructor(page) {
    this.page = page;
  }
}

module.exports = CustomPage;
