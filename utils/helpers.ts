import { Page } from '@playwright/test';

export async function waitForElement(page: Page, selector: string, timeout = 5000) {
  await page.waitForSelector(selector, { timeout });
}

export async function fillForm(page: Page, data: Record<string, string>) {
  for (const [selector, value] of Object.entries(data)) {
    await page.fill(selector, value);
  }
}

export function getRandomString(length: number): string {
  return Math.random().toString(36).substring(2, 2 + length);
}
