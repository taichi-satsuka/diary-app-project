import { test, expect } from '@playwright/test';

test("login", async ({ browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = "tanaka"

    await page.goto(
        'http://diary-app-lb-1869033578.ap-northeast-1.elb.amazonaws.com/login',
        {
            waitUntil: 'domcontentloaded',
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
    await page.waitForURL("**", { timeout: 60000 });

    context.close()
});