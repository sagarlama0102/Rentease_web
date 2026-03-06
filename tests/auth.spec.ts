import { test, expect } from "@playwright/test";

test.describe('RentEase Authentication Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Sad Path: Should show error for wrong credentials', async ({ page }) => {
    await page.locator('#email').fill('hacker@test.com');
    await page.locator('#password').fill('123456');
    await page.click('button[type="submit"]');

    await expect(page.locator('.text-red-600')).toBeVisible();
  });

  test('Happy Path: Should login successfully and show Dashboard', async ({ page }) => {
    await page.locator('#email').fill('bidhan123@gmail.com');
    await page.locator('#password').fill('bidhan123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*admin/, { timeout: 15000 });

    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    await expect(page.getByText('Total Users')).toBeVisible();
  });
});