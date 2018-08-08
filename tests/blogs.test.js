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

  describe('When logged in', async () => {
    beforeEach(async () => {
      const buttonElem = 'a.btn-floating';
      await page.login(buttonElem, '/blogs');
      await page.click(buttonElem);
    });

    it('user flow of going to the new blog creation page works', async () => {
      const targetElem = 'div.title label';
      const text = await page.getContents(targetElem);
      expect(text.trim()).toEqual('Blog Title');
    });

    it('going to new blog creation page and trying to submit without valid data shows an error', async () => {
      const nextBtn = 'button.next-submit-btn';
      const errorText = 'div.error-text';
      await page.click(nextBtn);
      const text = await page.getContents(errorText);
      expect(text.trim()).toEqual('You must provide a value');
    });
  });
});
