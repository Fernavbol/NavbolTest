import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

let productsPage: ProductsPage;

Given('que el usuario está en la página de inventario', async ({ page }) => {
  productsPage = new ProductsPage(page);
  await expect(page).toHaveURL(/.*inventory/);
  const isVisible = await productsPage.isInventoryVisible();
  expect(isVisible).toBeTruthy();
  console.log('✅ Usuario en página de inventario');
});

When('selecciona el producto {string}', async ({ page }, productName: string) => {
  productsPage = productsPage || new ProductsPage(page);
  const product = productsPage.getProductByName(productName);
  await expect(product).toBeVisible();
  console.log(`✅ Producto "${productName}" ubicado`);
});

When('lo agrega al carrito', async ({ page }) => {
  productsPage = productsPage || new ProductsPage(page);
  // Obtener el nombre del producto del contexto anterior
  const addButton = page.locator('button:has-text("Add to cart")').first();
  await addButton.click();
  console.log('✅ Producto agregado al carrito');
});

Then('el producto debe aparecer en el carrito', async ({ page }) => {
  productsPage = new ProductsPage(page);
  await productsPage.goToCart();
  const cartItem = page.locator('.cart_item');
  await expect(cartItem).toBeVisible({ timeout: 5000 });
  console.log('✅ Producto visible en el carrito');
});

Then('el contador del carrito debe mostrar {string}', async ({ page }, expectedCount: string) => {
  productsPage = productsPage || new ProductsPage(page);
  const badgeCount = await productsPage.getCartBadgeCount();
  expect(badgeCount).toBe(expectedCount);
  console.log(`✅ Contador del carrito muestra ${expectedCount}`);
});

When('navega al carrito', async ({ page }) => {
  productsPage = new ProductsPage(page);
  await productsPage.goToCart();
  await expect(page).toHaveURL(/.*cart/);
  console.log('✅ Usuario en página del carrito');
});

When('remueve el producto del carrito', async ({ page }) => {
  productsPage = new ProductsPage(page);
  await productsPage.removeProductInCart();
  console.log('✅ Producto removido del carrito');
});

Then('el carrito debe estar vacío', async ({ page }) => {
  productsPage = new ProductsPage(page);
  const isEmpty = await productsPage.isCartEmpty();
  expect(isEmpty).toBeTruthy();
  console.log('✅ Carrito vacío');
});
