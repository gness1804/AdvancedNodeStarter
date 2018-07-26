/* global it, describe, expect */
const puppeteer = require('puppeteer');

describe('Chromium browser', () => {
  it('We can launch a new instance of Chromium ', async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto('localhost:3000/');
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
  });
});
