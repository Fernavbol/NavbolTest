import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ICustomWorld } from './world';

let loginPage: LoginPage;

Given('que el usuario navega a la página de login', async function(this: ICustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigateTo();
});

When('ingresa su usuario {string} y contraseña {string} y hace clic en login', async function(this: ICustomWorld, username: string, password: string) {
  loginPage = loginPage || new LoginPage(this.page);
  await loginPage.login(username, password);
});

Then('debe ver el inventario de productos', async function(this: ICustomWorld) {
  await expect(this.page).toHaveURL(/.*inventory/);
  console.log('✅ Login exitoso - Usuario en inventario');
});

Then('debe ver un mensaje de error de autenticación', async function(this: ICustomWorld) {
  const errorMessage = this.page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
  await expect(errorMessage).toContainText('Username and password do not match any user');
  console.log('✅ Login rechazado - Mensaje de error mostrado');
});

Then('debe ver un mensaje de error que indique que el usuario se encuentra bloqueado.', async function(this: ICustomWorld) {
  const errorMessage = this.page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
  await expect(errorMessage).toContainText('Sorry, this user has been locked out');
  console.log('✅ Usuario bloqueado - Mensaje de bloqueo mostrado');
});
