/* global it, describe, expect, beforeEach, afterEach, afterAll, beforeAll */
const puppeteer = require('puppeteer');
const { exec, execSync } = require('child_process');
const { session, sig } = require('../tests/config/login');

describe('Home page', () => {
  let page;
  let browser;

  const setCookies = async () => {
    await page.setCookie({
      name: 'session',
      value: session,
    });
    await page.setCookie({
      name: 'session.sig',
      value: sig,
    });
  };

  beforeAll(async () => {
    const status = await execSync('cat .TEST-STATUS').toString().trim();
    console.log(`Chromium windows' status set to: ${status}`);
  });

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
    await page.goto('localhost:3000/');
  });

  afterEach(async () => {
    const status = await execSync('cat .TEST-STATUS').toString().trim();
    if (status === 'close') {
      browser.close();
    }
  });

  afterAll(async () => {
    const status = await execSync('cat .TEST-STATUS').toString().trim();
    if (status === 'close') {
      exec('npm run test:killall');
    }
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

  it('shows logged in as button when signed in', async () => {
    const elem = 'p.logged-in-as-elem';
    await setCookies();
    await page.goto('localhost:3000/');
    await page.waitFor(elem);
    const text = await page.$eval(elem, el => el.innerHTML);
    expect(text.trim()).toEqual('Logged is as: Graham Nessler');
  });
});
