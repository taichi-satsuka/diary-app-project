import { test, expect } from '@playwright/test';
import { waitForAttribute, waitForVisible } from './utils/waiter';

test("sign up ", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = "akasaka"
    const url = "http://localhost/login";

    await page.goto(url);

    // Sign up に遷移
    const signupLink = page.getByRole('link', { name: /Sign up/i });
    waitForVisible(signupLink)
    await signupLink.click();
    await page.waitForURL("**/register", { timeout: 30000 });

    // 入力フォーム
    const nameInput = page.getByRole('textbox', { name: /name/i });
    waitForVisible(nameInput);
    await nameInput.fill(userName);

    const emailInput = page.getByRole('textbox', { name: /your email/i });
    waitForVisible(emailInput);
    await emailInput.fill(`${userName}@example.com`);

    const passwordInput = page.getByRole('textbox', { name: 'password', exact: true });
    waitForVisible(passwordInput);
    await passwordInput.fill('secret444');

    const passwordConfirmInput = page.getByRole('textbox', { name: 'password confirmation', exact: true });
    waitForVisible(passwordConfirmInput);
    await passwordConfirmInput.fill('secret444');

    // 作成ボタン
    const createButton = page.getByRole('button', { name: /create/i });
    waitForVisible(createButton);
    await createButton.click();

    // ログインページに遷移
    await page.waitForURL("**/login", { timeout: 120000 });

    await context.close();
});


test("sign up with existing email show error", async ({ browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = "akiba"
    const url = "http://localhost/register";

    await page.goto(url);

    // 入力フォーム
    const nameInput = page.getByRole('textbox', { name: /name/i });
    waitForVisible(nameInput);
    await nameInput.fill(userName);

    const emailInput = page.getByRole('textbox', { name: /your email/i });
    waitForVisible(emailInput);
    await emailInput.fill(`${userName}@example.com`);

    const passwordInput = page.getByRole('textbox', { name: 'password', exact: true });
    waitForVisible(passwordInput);
    await passwordInput.fill('secret444');

    const passwordConfirmInput = page.getByRole('textbox', { name: 'password confirmation', exact: true });
    await expect(passwordConfirmInput).toBeVisible();
    await passwordConfirmInput.fill('secret444');

    // 作成ボタン
    const createButton = page.getByRole('button', { name: /create/i });
    waitForVisible(createButton);
    await createButton.click();

    // エラーメッセージを検証
    const errorMessage = page.locator('p', { hasText: /email.*already.*taken/i });
    waitForVisible(errorMessage);
    await expect(errorMessage).toHaveText(/The Email has already been taken/i);

    // URL は登録できないので /register のまま
    await expect(page).toHaveURL(/.*\/register$/);

    await context.close();
});
