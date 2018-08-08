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

    it('clicking on cancel button in new blog creation page returns user to prior page', async () => {
      const cancelBtn = 'a.cancel-btn';
      await page.click(cancelBtn);
      page.testURL('/blogs$');
    });

    describe('And invalid input', async () => {
      beforeEach(async () => {
        // submit form with no data entered
        const nextBtn = 'button.next-submit-btn';
        await page.click(nextBtn);
      });

      it('the form should show an error message', async () => {
        const errorText1 = '.title .error-text';
        const errorText2 = '.content .error-text';
        const text1 = await page.getContents(errorText1);
        expect(text1.trim()).toEqual('You must provide a value');
        const text2 = await page.getContents(errorText2);
        expect(text2.trim()).toEqual('You must provide a value');
      });
    });
  });
});
