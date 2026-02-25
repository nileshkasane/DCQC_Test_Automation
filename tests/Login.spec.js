import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { login } from '../utils/login.js';

test('Login', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page).toHaveTitle("Data Collection & Quality Check");

  await login(page);
});
