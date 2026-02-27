import { LoginPage } from '../pages/LoginPage.js';

export async function login(page) {

  const loginPage = new LoginPage(page);

  await loginPage.login();

}
