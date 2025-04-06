import { test, expect } from '@playwright/test';
import { login } from './utils/auth';

test.beforeEach(async ({ page }) => {
  await login(page);
});


test('Création d\'un workspace', async ({ page }) => {
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
  await page.getByRole('textbox', { name: 'Nom du workspace' }).fill('Test');
  await page.getByRole('button', { name: 'Créer' }).click();
  await expect(page.getByRole('link', { name: 'Test' }).first()).toBeVisible();
  
  
});

test('Suppression d\'un workspace', async ({ page }) => {
  await page.getByRole('complementary').getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole('button', { name: 'Supprimer' }).click();
  await page.getByRole('button', { name: 'Supprimer' }).click();
  await expect(page.getByRole('link', { name: 'Test' }).first()).toBeHidden();
  
});

test('Invitation d\'un utilisateur', async ({ page }) => {
  await page.getByRole('link', { name: 'Mon tableau Trello' }).click();
  await page.locator('div').filter({ hasText: /^Espaces de travail$/ }).first().click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole('textbox', { name: 'Adresse email' }).click();
  await page.getByRole('textbox', { name: 'Adresse email' }).fill('jfontinha17@gmail.com');
  await page.getByRole('button', { name: 'Inviter' }).click();
  await expect(page.getByText('JJoaquim Fontinhajfontinha17')).toBeVisible();
});

test('Suppression d\'un utilisateur', async ({ page }) => {
  await page.getByRole('link', { name: 'Mon tableau Trello' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Gérer les membres' }).click();
  await page.locator('div').filter({ hasText: /^JJoaquim Fontinhajfontinha17Supprimer$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^Membres de Mon tableau Trello$/ }).getByRole('button').click();
  await expect(page.getByText('JJoaquim Fontinhajfontinha17')).toBeHidden();
});

test('Création d\'une card', async ({ page }) => {

  await page.getByRole('link', { name: 'Mon tableau Trello' }).click();
  await page.getByRole('button', { name: '+ Ajouter une carte' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Entrez un titre pour cette' }).fill('Test');
  await page.getByRole('button', { name: 'Ajouter', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Test ×' })).toBeVisible();
});

test('Suppression d\'une card', async ({ page }) => {
  await page.getByRole('link', { name: 'Mon tableau Trello' }).click();
  await page.locator('div').filter({ hasText: /^Test×$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Supprimer' }).click();
  await expect(page.getByRole('button', { name: 'Test ×' })).toBeHidden();
});
