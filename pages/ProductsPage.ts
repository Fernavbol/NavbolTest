import { Page } from '@playwright/test';

export class ProductsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Localizadores
  inventoryContainer = () => this.page.locator('.inventory_list');
  cartBadge = () => this.page.locator('.shopping_cart_badge');
  cartButton = () => this.page.locator('.shopping_cart_link');
  checkoutButton = () => this.page.locator('[data-test="checkout"]');

  // Métodos
  async isInventoryVisible() {
    return await this.inventoryContainer().isVisible();
  }

  async getProductByName(productName: string) {
    return this.page.locator(`.inventory_item:has-text("${productName}")`);
  }

  async addProductToCart(productName: string) {
    const product = this.getProductByName(productName);
    const addButton = product.locator('button:has-text("Add to cart")');
    await addButton.click();
  }

  async removeProductFromCart(productName: string) {
    const product = this.getProductByName(productName);
    const removeButton = product.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  async getCartBadgeCount() {
    const badge = this.cartBadge();
    if (await badge.isVisible()) {
      return await badge.textContent();
    }
    return '0';
  }

  async goToCart() {
    await this.cartButton().click();
  }

  async isCartEmpty() {
    const cartItems = this.page.locator('.cart_item');
    return (await cartItems.count()) === 0;
  }

  async removeProductInCart() {
    const removeButton = this.page.locator('button:has-text("Remove")');
    if (await removeButton.isVisible()) {
      await removeButton.first().click();
    }
  }

  async getCartItemsCount() {
    const cartItems = this.page.locator('.cart_item');
    return await cartItems.count();
  }
}
