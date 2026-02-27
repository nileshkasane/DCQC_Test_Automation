import { expect } from '@playwright/test';
import { LOGIN } from '../config/constants.js';

export class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async login(phone = LOGIN.phone, otp = LOGIN.otp) {

        await this.page.getByRole('button', { name: 'Get Started' }).click();

        await this.page.getByRole('textbox', { name: /phone number/i }).fill(phone);

        await this.page.getByRole('button', { name: 'Send OTP' }).click();

        const digits = otp.split('');

        for (let i = 0; i < 6; i++) {
            await this.page.locator(`#_r_${i + 3}_`).fill(digits[i] ?? '');
        }

        await this.page.getByRole('button', { name: 'Verify OTP' }).click();
    }

    async verifyPageTitle(title = 'Data Collection & Quality Check') {

        await expect(this.page).toHaveTitle(title);

    }
}
