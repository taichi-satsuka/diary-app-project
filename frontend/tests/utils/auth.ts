import { type Page, expect } from "@playwright/test"
import { waitForAttribute, waitForVisible } from "./waiter";

export async function login(page: Page, userName: string, password: string) {
    const url = "http://localhost/login";
    await page.goto(url);

    // 入力フォーム
    const emailInput = page.getByRole('textbox', { name: /your email/i });
    await emailInput.waitFor({state: 'visible', timeout: 5000});
    waitForVisible(emailInput);
    await emailInput.fill(`${userName}@example.com`);

    const passwordInput = page.getByRole('textbox', { name: 'password', exact: true });
    waitForVisible(passwordInput);
    await passwordInput.fill(password);

    // ログインボタン
    const loginButton = page.getByRole('button', { name: /Sign in/i });
    waitForVisible(loginButton);
    await loginButton.click();

    // ホームページに遷移
    await page.waitForURL("**/", { timeout: 60000 });
}

export async function logout(page: Page){
  await page.getByRole('link', { name: 'Diary App' }).click();

  const userCard = page.locator('aside').getByRole("link")
  await expect(userCard).toHaveAttribute('href', /\/users\/\d+/, { timeout: 10000 });
  waitForAttribute(userCard, 'href', /\/users\/\d+/, 10000);
  await userCard.click();

  const settingLink =  page.getByRole('link', { name: /settings/i })
  await settingLink.waitFor({ state: 'visible', timeout: 10000})
  waitForVisible(settingLink);
  await settingLink.click()

  // ログアウト
  const logoutButton = page.getByRole('button', { name: /logout/i })
  await logoutButton.waitFor({ state: 'visible', timeout: 10000 })
  waitForVisible(logoutButton);
  await logoutButton.click()

  await page.waitForURL('**/login?from=logout')
}