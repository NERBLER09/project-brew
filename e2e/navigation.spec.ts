import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('finnegan.beaudin@protonmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('49095008');
  await page.getByPlaceholder('Password').press('Enter');
})

test('desktop sidebar navigation', async ({ page }) => {
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page).toHaveURL("http://localhost:5173/app/home")
  await page.getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL("http://localhost:5173/app/projects")
  await page.getByRole('link', { name: 'Focus' }).click();
  await expect(page).toHaveURL("http://localhost:5173/app/focus")
  await page.getByRole('link', { name: 'Team' }).click();
  await expect(page).toHaveURL("http://localhost:5173/app/team")
  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL("http://localhost:5173/app/settings")
});
