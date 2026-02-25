import { LOGIN } from '../config/constants.js';

export async function login(page) {

  await page.getByRole('button', { name: 'Get Started' }).click();

  await page.getByRole('textbox', { name: /phone number/i }).fill(LOGIN.phone);

  await page.getByRole('button', { name: 'Send OTP' }).click();

  const otpDigits = LOGIN.otp.split('');

  for (let i = 0; i < 6; i++) {
    await page.locator(`#_r_${i + 3}_`).fill(otpDigits[i] ?? '');
  }

  await page.getByRole('button', { name: 'Verify OTP' }).click();
}
