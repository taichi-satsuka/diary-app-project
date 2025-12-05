import { test, expect } from '@playwright/test';

test("sign up ", async ({ page }) => {
    const userName = "yamamoto"

    await page.goto(
        'http://diary-app-lb-950760368.ap-northeast-1.elb.amazonaws.com/login',
        {
            waitUntil: 'load',
            timeout: 60000
        }
    );

    // Sign up に遷移
    const signupLink = page.getByRole('link', { name: /Sign up/i });
    await expect(signupLink).toBeVisible();
    await signupLink.click();
    await page.waitForURL("**/register", { timeout: 30000 });

    // 入力フォーム
    const nameInput = page.getByRole('textbox', { name: /name/i });
    await expect(nameInput).toBeVisible();
    await nameInput.fill(userName);

    const emailInput = page.getByRole('textbox', { name: /your email/i });
    await expect(emailInput).toBeVisible();
    await emailInput.fill(`${userName}@example.com`);

    const passwordInput = page.getByRole('textbox', { name: 'password', exact: true });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('secret444');

    const passwordConfirmInput = page.getByRole('textbox', { name: 'password confirmation', exact: true });
    await expect(passwordConfirmInput).toBeVisible();
    await passwordConfirmInput.fill('secret444');

    // 作成ボタン
    const createButton = page.getByRole('button', { name: /create/i });
    await expect(createButton).toBeVisible();
    await createButton.click();

    // ログインページに遷移
    await page.waitForURL("**/login", { timeout: 30000 });
});


test("sign up with existing email show error", async ({ page }) => {
    const userName = "tanaka"

    await page.goto(
        'http://diary-app-lb-950760368.ap-northeast-1.elb.amazonaws.com/register',
        {
            waitUntil: 'load',
            timeout: 60000
        }
    );

    // 入力フォーム
    const nameInput = page.getByRole('textbox', { name: /name/i });
    await expect(nameInput).toBeVisible();
    await nameInput.fill(userName);

    const emailInput = page.getByRole('textbox', { name: /your email/i });
    await expect(emailInput).toBeVisible();
    await emailInput.fill(`${userName}@example.com`);

    const passwordInput = page.getByRole('textbox', { name: 'password', exact: true });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('secret444');

    const passwordConfirmInput = page.getByRole('textbox', { name: 'password confirmation', exact: true });
    await expect(passwordConfirmInput).toBeVisible();
    await passwordConfirmInput.fill('secret444');

    // 作成ボタン
    const createButton = page.getByRole('button', { name: /create/i });
    await expect(createButton).toBeVisible();
    await createButton.click();

    // エラーメッセージを検証
    const errorMessage = page.locator('p', { hasText: /email.*already.*taken/i });
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/The Email has already been taken/i);

    // URL は登録できないので /register のまま
    await expect(page).toHaveURL(/.*\/register$/);
});
