import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { login } from '../utils/login.js';

test('Job Creation', async ({ page }) => {

    await page.goto(BASE_URL);
    await login(page);

    await page.locator("//p[contains(text(),'CG_Gr_1-8_Hi_Para')]/following-sibling::button").click();


});