import { Page } from '@playwright/test';

export async function login(page: Page) {
  // Le baseURL est maintenant configuré dans playwright.config.js
  await page.goto('http://localhost:5173');
  
  // Processus de connexion
  await page.getByRole('button', { name: 'Se connecter avec Trello' }).click();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByTestId('username').fill('ilyes.benkerripro@gmail.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByTestId('password').fill('Supertoad27.');
  await page.getByTestId('form-login').click();
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Autoriser' }).click();
} 