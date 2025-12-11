import { test, expect } from '@playwright/test';

test("sign up ", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = "hana"

    await page.goto(
        'http://diary-app-lb-1869033578.ap-northeast-1.elb.amazonaws.com/login',
        {
            timeout: 120000
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
    await page.waitForURL("**/login", { timeout: 120000 });

    await context.close();
});


test("sign up with existing email show error", async ({ browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = "akiba"

    await page.goto(
        'http://diary-app-lb-1869033578.ap-northeast-1.elb.amazonaws.com/login',
        {
            timeout: 120000
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

    await context.close();
});
