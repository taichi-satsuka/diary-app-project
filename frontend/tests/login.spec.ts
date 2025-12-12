import { test, expect } from '@playwright/test';
import { login, logout } from './utils/auth'

test("login", async ({ browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = "yamanaka"
    const password = "secret444"

    await login(page, userName, password)
    await logout(page)

    await context.close()
});