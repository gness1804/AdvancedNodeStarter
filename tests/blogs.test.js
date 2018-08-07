/* global it, describe, expect, beforeEach, afterEach, beforeAll */

const { execSync } = require('child_process');
const Page = require('./helpers/page');

describe('blogs', () => {
  let page;

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
      await page.close();
    }
  });

  it('user flow of going to the new blog creation page works', async () => {
    const buttonElem = 'a.btn-floating';
    await page.login(buttonElem, '/blogs');
    const targetElem = 'div.title label';
    await page.click(buttonElem);
    const text = await page.getContents(targetElem);
    expect(text.trim()).toEqual('Blog Title');
  });
});
