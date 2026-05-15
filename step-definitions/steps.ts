import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

Given('que el usuario navega a la página de login', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigateTo();
});

When('ingresa su usuario {string} y contraseña {string} y hace clic en login', async ({ page }, username: string, password: string) => {
  loginPage = loginPage || new LoginPage(page);
  await loginPage.login(username, password);
});

Then('debe ver el inventario de productos', async ({ page }) => {
  await expect(page).toHaveURL(/.*inventory/);
  console.log('✅ Login exitoso - Usuario en inventario');
});

Then('debe ver un mensaje de error de autenticación', async ({ page }) => {
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
  await expect(errorMessage).toContainText('Username and password do not match any user');
  await expect(page).not.toHaveURL(/.*inventory/);
  console.log('✅ Login rechazado - Mensaje de error mostrado');
});

Then('debe ver un mensaje de error que indique que el usuario se encuentra bloqueado.', async ({ page }) => {
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
  await expect(errorMessage).toContainText('This user has been locked out');
  await expect(page).not.toHaveURL(/.*inventory/);
  console.log('✅ Usuario bloqueado - Mensaje de bloqueo mostrado');
});
