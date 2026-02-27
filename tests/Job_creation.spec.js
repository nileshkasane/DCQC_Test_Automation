import path from 'path';
import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { login } from '../utils/login.js';

test('Job Creation', async ({ page }) => {

    await page.goto(BASE_URL);
    await login(page);

    // Start Job
    const startButton = page.locator(
        "//p[normalize-space()='CG_Gr_1-8_En_Para']/following-sibling::button[normalize-space()='Start']"
    );
    await expect(startButton).toBeEnabled({ timeout: 20000 });
    await startButton.click();

    // Collect Data
    // await expect(page.locator('p.Footer-module__7ULjua__footer-text')).toBeVisible();
    await page.getByText('Collect Data', { exact: true }).click();

    await page.getByRole('button', { name: 'Proceed' }).click();
    await page.getByRole('button', { name: 'Skip' }).click();

    // District Dropdown
    const districtDropdown = page.locator('(//div[contains(@class,"Dropdown-module__yG70Qq__dropdown-container")])[2]');
    await districtDropdown.scrollIntoViewIfNeeded();
    await districtDropdown.locator('[role="button"], div[class*="MuiSelect-select"]').first().click();
    await page.getByRole('listbox').getByText('Balrampur').click();

    // School Dropdown
    const schoolDropdown = page.locator('(//div[contains(@class,"Dropdown-module__yG70Qq__dropdown-container")])[3]');
    await schoolDropdown.scrollIntoViewIfNeeded();
    await schoolDropdown.locator('[role="button"], div[class*="MuiSelect-select"]').first().click();
    await page.getByRole('listbox').getByText('22260910001 - P.S. NEHRUNAGAR').click();

    await page.getByRole('button', { name: 'Proceed' }).click();

    // Fill Student Details
    const firstName = `User_${Date.now()}`;
    const lastName = `Auto_${Math.random().toString(36).slice(2, 8)}`;
    await page.getByLabel('Name').fill(`${firstName} ${lastName}`);

    // Gender Dropdown
    const genderDropdown = page.locator('(//div[contains(@class,"Dropdown-module__yG70Qq__dropdown-container")])[1]');
    await genderDropdown.scrollIntoViewIfNeeded();
    await genderDropdown.locator('[role="button"], div[class*="MuiSelect-select"]').first().click();
    await page.locator("li[data-value='Male']").click();

    // Grade Dropdown
    const gradeDropdown = page.locator('(//div[contains(@class,"Dropdown-module__yG70Qq__dropdown-container")])[2]');
    await gradeDropdown.scrollIntoViewIfNeeded();
    await gradeDropdown.locator('[role="button"], div[class*="MuiSelect-select"]').first().click();
    await page.getByText('1', { exact: true }).click();

    await page.getByRole('button', { name: 'Proceed' }).click();

    // Generate Consent ID
    await page.getByRole('button', { name: 'Generate Consent ID' }).click();

    // Upload Picture
    const imagePath = path.join(
        process.cwd(),
        'test-data',
        'images',
        'StockCake-Kids_Enjoying_Reading-1098958-small.jpg'
    );

    await page.locator("//p[contains(text(),'Take photo')]").setInputFiles(imagePath);
    await page.getByRole('button', { name: 'Proceed' }).click();

    await page.getByRole('button', { name: 'Proceed' }).click();

    // Start Recording
    await page.getByRole('button', { name: 'Start' }).click();

    // Wait for Stop button instead of hard wait
    const stopBtn = page.getByRole('button', { name: 'Stop' });
    await expect(stopBtn).toBeVisible({ timeout: 30000 });
    await stopBtn.click();

    // Wait for Save button dynamically
    const saveBtn = page.getByText('Save', { exact: true });
    await expect(saveBtn).toBeVisible({ timeout: 60000 });
    await expect(saveBtn).toBeEnabled({ timeout: 60000 });
    await saveBtn.click();

    // Wait for Submit button to become enabled (instead of loader wait)
    const submitBtn1 = page.getByRole('button', { name: 'Submit' });
    await expect(submitBtn1).toBeEnabled();
    await submitBtn1.click();

    // Final Submit Confirmation
    const submitBtn2 = page.getByRole('button', { name: 'Submit' });
    await expect(submitBtn2).toBeEnabled({ timeout: 30000 });
    await submitBtn2.click();

    // Verify Success Message
    await expect(
        page.getByText('Record Saved Successfully', { exact: false })
    ).toBeVisible();

});
