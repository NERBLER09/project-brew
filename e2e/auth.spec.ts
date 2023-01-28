import { test, expect } from "@playwright/test"

test("user can't access protected route", async ({ page }) => {
  await page.goto("http://localhost:5173/app/home")
  await expect(page).toHaveURL("http://localhost:5173/")
})

test("user can log out", async ({ page }) => {
  await page.goto("http://localhost:5173/login")
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('finnegan.beaudin@protonmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('49095008');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page).toHaveURL("http://localhost:5173")
})

test("user can automatically log in when authed", async ({ page }) => {
  await page.goto("http://localhost:5173/login")
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('finnegan.beaudin@protonmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('49095008');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL("http://localhost:5173/app/home")

  await page.reload()
  await expect(page).toHaveURL("http://localhost:5173/app/home")
})
