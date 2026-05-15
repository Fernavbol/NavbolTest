import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { ICustomWorld } from './world';

let productsPage: ProductsPage;

Given('que el usuario está en la página de inventario', async function(this: ICustomWorld) {
  productsPage = new ProductsPage(this.page);
  await expect(this.page).toHaveURL(/.*inventory/);
  const isVisible = await productsPage.isInventoryVisible();
  expect(isVisible).toBeTruthy();
  console.log('✅ Usuario en página de inventario');
});

When('selecciona el producto {string}', async function(this: ICustomWorld, productName: string) {
  productsPage = productsPage || new ProductsPage(this.page);
  const product = productsPage.getProductByName(productName);
  const isVisible = await product.isVisible();
  expect(isVisible).toBeTruthy();
  console.log(`✅ Producto "${productName}" ubicado`);
});

When('lo agrega al carrito', async function(this: ICustomWorld) {
  productsPage = productsPage || new ProductsPage(this.page);
  // Obtener el nombre del producto del contexto anterior
  const addButton = this.page.locator('button:has-text("Add to cart")').first();
  await addButton.click();
  console.log('✅ Producto agregado al carrito');
});

Then('el producto debe aparecer en el carrito', async function(this: ICustomWorld) {
  productsPage = new ProductsPage(this.page);
  await productsPage.goToCart();
  const cartItem = this.page.locator('.cart_item');
  const isVisible = await cartItem.isVisible({ timeout: 5000 });
  expect(isVisible).toBeTruthy();
  console.log('✅ Producto visible en el carrito');
});

Then('el contador del carrito debe mostrar {string}', async function(this: ICustomWorld, expectedCount: string) {
  productsPage = productsPage || new ProductsPage(this.page);
  const badgeCount = await productsPage.getCartBadgeCount();
  expect(badgeCount).toBe(expectedCount);
  console.log(`✅ Contador del carrito muestra ${expectedCount}`);
});

When('navega al carrito', async function(this: ICustomWorld) {
  productsPage = new ProductsPage(this.page);
  await productsPage.goToCart();
  await expect(this.page).toHaveURL(/.*cart/);
  console.log('✅ Usuario en página del carrito');
});

When('remueve el producto del carrito', async function(this: ICustomWorld) {
  productsPage = new ProductsPage(this.page);
  await productsPage.removeProductInCart();
  console.log('✅ Producto removido del carrito');
});

Then('el carrito debe estar vacío', async function(this: ICustomWorld) {
  productsPage = new ProductsPage(this.page);
  const isEmpty = await productsPage.isCartEmpty();
  expect(isEmpty).toBeTruthy();
  console.log('✅ Carrito vacío');
});
