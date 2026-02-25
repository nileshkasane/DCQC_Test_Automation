import path from 'path';
import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { login } from '../utils/login.js';

test('Job Creation', async ({ page }) => {

    await page.goto(BASE_URL);
    await login(page);

    await page.locator("//p[contains(text(),'CG_Gr_1-8_En_Para')]/following-sibling::button[contains(text(),'Start')]").click({ force: true });
    const footertext = await page.locator("p[class='MuiTypography-root MuiTypography-body1 Footer-module__7ULjua__footer-text mui-5lr4o']");
    await expect(footertext).toBeVisible();
    await page.getByText('Collect Data').click();
    // await expect(page.locator("//div[contains(text(),'Need Permissions')]")).toBeVisible();
    // await page.locator("span[class='MuiTouchRipple-root mui-4mb1j7']").click({ force: true });
    // await page.getByRole('button', { name: 'I Approve' }).click();
    await page.getByRole('button', { name: 'Proceed' }).click();
    await page.getByRole('button', { name: 'Skip' }).click();

    // District dropdown: use xpath= prefix, scroll into view, then click the inner trigger (MUI clickable part)
    const districtDropdown = page.locator('xpath=(//div[contains(@class,"Dropdown-module__yG70Qq__dropdown-container")])[2]');
    await districtDropdown.scrollIntoViewIfNeeded();
    await districtDropdown.locator('[role="button"], div[class*="MuiSelect-select"]').first().click();
    await page.getByRole('listbox').getByText('Balrampur').click();

    // School dropdown (e.g. school/block): same approach
    const schoolDropdown = page.locator('xpath=(//div[contains(@class,"Dropdown-module__yG70Qq__dropdown-container")])[3]');
    await schoolDropdown.scrollIntoViewIfNeeded();
    await schoolDropdown.locator('[role="button"], div[class*="MuiSelect-select"]').first().click();
    await page.getByRole('listbox').getByText('22260910001 - P.S. NEHRUNAGAR').click();
    await page.getByRole('button', { name: 'Proceed' }).click();

    const firstName = `User_${Date.now()}`;
    const lastName = `Auto_${Math.random().toString(36).slice(2, 8)}`;
    await page.getByLabel('Name').fill(`${firstName} ${lastName}`);

    // Gender dropdown
    const genderDropdown = page.locator('xpath=(//div[@class="Dropdown-module__yG70Qq__dropdown-container MuiBox-root mui-0"])[1]');
    await genderDropdown.scrollIntoViewIfNeeded();
    await genderDropdown.locator('[role="button"], div[class*="MuiSelect-select"]').first().click();
    await page.locator("li[data-value='Male']").click();

    // Grade dropdown
    const gradeDropdown = page.locator('xpath=(//div[@class="Dropdown-module__yG70Qq__dropdown-container MuiBox-root mui-0"])[2]');
    await gradeDropdown.scrollIntoViewIfNeeded();
    await gradeDropdown.locator('[role="button"], div[class*="MuiSelect-select"]').first().click();
    await page.getByText('1').click();
    await page.getByRole('button', { name: 'Proceed' }).click();

    // Generate Consent ID
    await page.getByRole('button', { name: 'Generate Consent ID' }).click();

    // Upload picture from test-data/images folder
    const imagePath = path.join(process.cwd(), 'test-data', 'images', 'StockCake-Kids_Enjoying_Reading-1098958-small.jpg');
    await page.locator("//p[contains(text(),'Take photo')]").setInputFiles(imagePath);
    await page.getByRole('button', { name: 'Proceed' }).click();

    await page.getByRole('button', { name: 'Proceed' }).click();


});