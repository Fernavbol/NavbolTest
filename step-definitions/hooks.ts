import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { ICustomWorld } from './world';

class CustomWorld implements ICustomWorld {
  page!: Page;
}

setWorldConstructor(CustomWorld);

let browser: Browser;

Before(async function(this: ICustomWorld) {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    baseURL: 'https://www.saucedemo.com'
  });
  this.page = await context.newPage();
});

After(async function(this: ICustomWorld) {
  if (this.page) {
    await this.page.context().close();
  }
  if (browser) {
    await browser.close();
  }
});
