/* global it, describe, expect, beforeEach */
const puppeteer = require('puppeteer');

describe('Home page', () => {
  let page;

  beforeEach(async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
    await page.goto('localhost:3000/');
  });

  it('has the correct headline text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
  });
});
