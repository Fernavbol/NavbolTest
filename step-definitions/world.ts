import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';

export interface ICustomWorld {
  page: Page;
  loginPage?: LoginPage;
}
