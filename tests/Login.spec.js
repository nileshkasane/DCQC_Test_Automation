import { test } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { LoginPage } from '../pages/LoginPage.js';

test('Login', async ({ page }) => {

  await page.goto(BASE_URL);

  const loginPage = new LoginPage(page);

  await loginPage.verifyPageTitle();
  await loginPage.login();

});
