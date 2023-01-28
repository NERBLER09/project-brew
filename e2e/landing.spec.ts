import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:5173');
})

test('landing page can load', async ({ page }) => {
	await page.goto('http://localhost:5173');

	await expect(page).toHaveTitle('Project Brew');
});

test('log in page can load', async ({ page }) => {
	await page.getByRole("link", { name: "Log in" }).click()
	await expect(page).toHaveURL("http://localhost:5173/login")
	await expect(page.getByRole("heading", { name: "Log in" })).toHaveText("Log in")
})

test("sign up page can load", async ({ page }) => {
	await page.getByRole("link", { name: "Sign up" }).click()
	await expect(page).toHaveURL("http://localhost:5173/sign-up")
	await expect(page.getByRole("heading", { name: "Sign up" })).toHaveText("Sign Up")
})

test("loggin in user works", async ({ page }) => {
	await page.goto("http://localhost:5173/login")
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill('finnegan.beaudin@protonmail.com');
	await page.getByPlaceholder('Email').press('Tab');
	await page.getByPlaceholder('Password').fill('49095008');
	await page.getByRole('button', { name: 'Log in' }).click();
	await expect(page).toHaveURL("http://localhost:5173/app/home")
})
