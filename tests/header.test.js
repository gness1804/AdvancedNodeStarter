/* global it, describe, expect, beforeEach, afterEach, beforeAll */
const { execSync } = require('child_process');
const createSession = require('../tests/config/login');
const createUser = require('../tests/config/user');
const Page = require('./helpers/page');

describe('Home page', () => {
  let page;

  const setCookies = async () => {
    const user = await createUser();
    const { session, sig } = createSession(user);
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
    page = await Page.build();
    await page.goto('localhost:3000/');
  });

  afterEach(async () => {
    const status = await execSync('cat .TEST-STATUS').toString().trim();
    if (status === 'close') {
      page.close();
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
    expect(text.trim()).toEqual('Logged is as: Dwayne Johnson');
  });
});
