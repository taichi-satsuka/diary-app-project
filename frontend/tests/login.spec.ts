import { test, expect } from '@playwright/test';

test("sign up ", async ({ page }) => {
    const userName = "tanaka"

    await page.goto(
        'http://diary-app-lb-950760368.ap-northeast-1.elb.amazonaws.com/login',
        {
            waitUntil: 'load',
            timeout: 60000
        }
    );

    // 入力フォーム
    const emailInput = page.getByRole('textbox', { name: /your email/i });
    await expect(emailInput).toBeVisible();
    await emailInput.fill(`${userName}@example.com`);

    const passwordInput = page.getByRole('textbox', { name: 'password', exact: true });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('secret444');

    // ログインボタン
    const loginButton = page.getByRole('button', { name: /Sign in/i });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    // ホームページに遷移
    await page.waitForURL("**", { timeout: 30000 });
});