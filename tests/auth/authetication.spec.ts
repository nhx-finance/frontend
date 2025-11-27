import { test, expect } from "@playwright/test";
import { ROUTES } from "./helpers";

test.describe("Authentication", () => {
  test("should display login form", async ({ page }) => {
    await page.goto(ROUTES.LOGIN);

    await expect(
      page.getByRole("heading", { name: "Login to your account" })
    ).toBeVisible();

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();

    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

  test("should login with valid credentials", async ({ page }) => {
    await page.goto(ROUTES.LOGIN);

    await page.getByLabel("Email").fill("testuser@gmail.com");
    await page.getByLabel("Password").fill("password");

    await page.getByRole("button", { name: /login/i }).click();

    await page.waitForURL(ROUTES.DASHBOARD, { timeout: 30000 });

    await expect(page).toHaveURL(ROUTES.DASHBOARD);
  });

  test("should show error when email is empty", async ({ page }) => {
    await page.goto(ROUTES.LOGIN);

    await page.getByLabel("Password").fill("password");

    await page.getByRole("button", { name: /login/i }).click();

    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible({ timeout: 5000 });

    await expect(toast).toContainText(/fill in all fields/i);
  });

  test("should show error with invalid credentials", async ({ page }) => {
    await page.goto(ROUTES.LOGIN);

    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: /login/i }).click();

    await expect(page).toHaveURL(ROUTES.LOGIN);

    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible({ timeout: 5000 });

    await expect(toast).toContainText(/login failed/i);
  });
});
