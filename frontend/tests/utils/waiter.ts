import { type Locator, expect } from "@playwright/test"

export async function waitForAttribute(locator: Locator, attr:string, value: string | RegExp, timeout = 5000) {
    await expect(locator).toHaveAttribute(attr, value, { timeout });
}

export async function waitForVisible(locator: Locator, timeout = 5000) {
    await expect(locator).toBeVisible({ timeout: timeout});
}