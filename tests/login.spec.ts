import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login exitoso con credenciales válidas', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  
  // Act
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Assert
  await expect(page).toHaveURL(/.*inventory/);
  console.log('✅ Login exitoso - Usuario en la página de inventario');
});


test('Login no exitoso con credenciales inválidas', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  
  // Act
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'pass123');
  
  // Assert
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
  await expect(errorMessage).toContainText('Username and password do not match any user');

  await expect(page).not.toHaveURL(/.*inventory/);
  console.log('✅ Login fallido correctamente - Mensaje de error mostrado');
});
