import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Localizadores para SauceDemo
  usernameInput = () => this.page.locator('#user-name');
  passwordInput = () => this.page.locator('#password');
  loginButton = () => this.page.locator('#login-button');
  errorMessage = () => this.page.locator('[data-test="error"]');

  // Métodos
  async navigateTo() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async isLoginPageVisible() {
    await this.loginButton().isVisible();
  }
}
