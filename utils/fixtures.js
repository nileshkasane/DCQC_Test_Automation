import { test as base } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { login } from './login.js';


export const test = base.extend({

  page: async ({ page }, use) => {
    await page.goto(BASE_URL);
    await login(page);
    await use(page);
  },
  
});

export { expect } from '@playwright/test';
