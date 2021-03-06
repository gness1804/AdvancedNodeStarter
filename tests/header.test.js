/* global it, describe, expect, beforeEach, afterEach, beforeAll */
const { execSync } = require('child_process');
const Page = require('./helpers/page');

describe('Home page', () => {
  let page;

  beforeAll(async () => {
    const status = await execSync('cat .TEST-STATUS').toString().trim();
    console.log(`Chromium windows' status set to: ${status}`);
  });

  beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000/');
  });

  afterEach(async () => {
    const status = await execSync('cat .TEST-STATUS').toString().trim();
    if (status === 'close') {
      page.close();
    }
  });

  it('has the correct headline text', async () => {
    const elem = 'a.brand-logo';
    const text = await page.getContents(elem);
    expect(text).toEqual('Blogster');
  });

  it('Log in link has the correct text (logged out by default)', async () => {
    const elem = 'a.login-link';
    const text = await page.getContents(elem);
    expect(text).toEqual('Login With Google');
  });

  it('clicking on the log in link starts oauth flow', async () => {
    await page.click('a.login-link');
    page.testURL('^https://accounts.google.com');
  });

  it('shows logout button when signed in', async () => {
    const elem = 'a.logout-button';
    await page.login(elem);
    const text = await page.getContents(elem);
    expect(text).toEqual('Logout');
  });

  it('shows logged in as button when signed in', async () => {
    const elem = 'p.logged-in-as-elem';
    await page.login(elem);
    const text = await page.getContents(elem);
    expect(text.trim()).toEqual('Logged is as: Dwayne Johnson');
  });
});
