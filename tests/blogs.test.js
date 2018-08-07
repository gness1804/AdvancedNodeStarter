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
    await page.login(null, '/blogs');
    // await page.goto('localhost:3000/blogs');
    // const myBlogsElem = 'a.my-blogs-link';
    // const buttonElem = 'a.btn-large';
    // const targetElem = 'div.title label';
    // await page.login(myBlogsElem);
    // await page.click(myBlogsElem);
    // await page.waitFor(buttonElem);
    // await page.click(buttonElem);
    // const text = await page.getContents(targetElem);
    // expect(text.trim()).toEqual('Blog Title');
  });
});
