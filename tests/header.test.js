/* global it, describe, expect, beforeEach, afterEach, afterAll */
const puppeteer = require('puppeteer');
const { exec } = require('child_process');

describe('Home page', () => {
  let page;
  let browser;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
    await page.goto('localhost:3000/');
  });

  afterEach(() => {
    browser.close();
  });

  afterAll(() => {
    exec('npm run test:kill');
  });

  it('has the correct headline text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
  });

  it('Log in link has the correct text (logged out by default)', async () => {
    const text = await page.$eval('a.login-link', el => el.innerHTML);
    expect(text).toEqual('Login With Google');
  });
});
