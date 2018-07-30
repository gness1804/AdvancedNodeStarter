/* global it, describe, expect, beforeEach, afterEach, afterAll */
const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const { sessionStr, sig } = require('../config/test_config/fakeLoginConfig');

describe('Home page', () => {
  let page;
  let browser;

  const setCookies = async () => {
    await page.setCookie({
      name: 'session',
      value: sessionStr,
    });
    await page.setCookie({
      name: 'session.sig',
      value: sig,
    });
  };

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
    exec('npm run test:killall');
  });

  it('has the correct headline text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
  });

  it('Log in link has the correct text (logged out by default)', async () => {
    const text = await page.$eval('a.login-link', el => el.innerHTML);
    expect(text).toEqual('Login With Google');
  });

  it('clicking on the log in link starts oauth flow', async () => {
    await page.click('a.login-link');
    const url = await page.url();
    const regex = new RegExp('^https://accounts.google.com');
    expect(regex.test(url)).toEqual(true);
  });

  it('shows logout button when signed in', async () => {
    const elem = 'a.logout-button';
    await setCookies();
    await page.goto('localhost:3000/');
    await page.waitFor(elem);
    const text = await page.$eval(elem, el => el.innerHTML);
    expect(text).toEqual('Logout');
  });

  // it('shows the "Logged in as..." text once logged in', () => {
  // setCookies();
  // await page.goto('localhost:3000/');
  // expect logged in text to appear...
  // });
});
