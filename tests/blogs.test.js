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

    describe('And valid input', async () => {
      beforeEach(async () => {
        // submit form with valid data
        const titleInputElem = '.title input';
        const contentInputElem = '.content input';
        const nextBtn = 'button.next-submit-btn';
        await page.type(titleInputElem, 'Mal\'s big day out');
        await page.type(contentInputElem, 'Mal had a great day out! He chased after bugs and made some new friends.');
        await page.click(nextBtn);
      });

      it('submitting a post takes user to confirmation screen', async () => {
        const elem = 'h5.form-review-headline';
        const text = await page.getContents(elem);
        expect(text.trim()).toEqual('Please confirm your entries');
      });

      it('submitting a post and then saving adds a blog post to /blogs page', async () => {
        const buttonElem = 'button.blog-save-button';
        const titleElem = 'span.card-title';
        const contentElem = 'p.card-content';
        await page.click(buttonElem);
        await page.waitFor('.card');
        page.testURL('/blogs$');
        const titleText = await page.getContents(titleElem);
        const contentText = await page.getContents(contentElem);
        expect(titleText.trim()).toEqual('Mal\'s big day out');
        expect(contentText.trim()).toEqual('Mal had a great day out! He chased after bugs and made some new friends.');
      });
    });
  });

  describe('User is not logged in', async () => {
    it('user cannot create blog posts', async () => {
      const result = await page.postAPI({
        path: '/api/blogs',
        title: 'My New Blog',
        content: 'This is a new blog post.',
      });
      expect(result).toEqual({ error: 'You must log in!' });
    });

    it('user cannot get list of blogs', async () => {
      const result = await page.getAPI('/api/blogs');
      expect(result).toEqual({ error: 'You must log in!' });
    });
  });
});
