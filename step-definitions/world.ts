import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export interface ICustomWorld {
  page: Page;
  loginPage?: LoginPage;
}
