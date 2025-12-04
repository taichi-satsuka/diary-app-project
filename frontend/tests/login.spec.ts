import { test, expect } from '@playwright/test';

test("sign up user test", async ({page}) => {
  await page.goto('http://diary-app-lb-398792068.ap-northeast-1.elb.amazonaws.com', { waitUntil: 'load', timeout: 60000 });
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.waitForURL("**/register", { timeout: 10000})

  await expect(page.getByRole('heading', { name: "Create your account"})).toBeVisible();
})

