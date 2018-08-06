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

  async login(elem) {
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
    await this.goto('localhost:3000/');
    await this.waitFor(elem);
  }

  async getContents(elem) {
    const target = await this.$eval(elem, el => el.innerHTML);
    return target;
  }

  constructor(page) {
    this.page = page;
  }
}

module.exports = CustomPage;
