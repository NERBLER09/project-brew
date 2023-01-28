import { test, expect } from "@playwright/test"

test("user can't access protected route", async ({ page }) => {
  await page.goto("http://localhost:5173/app/home")
  await expect(page).toHaveURL("http://localhost:5173/")
})
