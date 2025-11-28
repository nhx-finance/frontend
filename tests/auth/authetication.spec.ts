import { test, expect } from "@playwright/test";
import { generateRandomEmail, ROUTES } from "./helpers";

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
  test("should display signup form", async ({ page }) => {
    await page.goto(ROUTES.SIGNUP);

    await expect(
      page.getByRole("heading", { name: "Create your account" })
    ).toBeVisible();

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Confirm Password")).toBeVisible();

    await expect(
      page.getByRole("button", { name: /create account/i })
    ).toBeVisible();
  });

  test("should show error when email is empty", async ({ page }) => {
    await page.goto(ROUTES.LOGIN);

    await page.getByLabel("Password").fill("password");

    await page.getByRole("button", { name: /login/i }).click();

    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible({ timeout: 5000 });

    await expect(toast).toContainText(/fill in all fields/i);
  });
  test("should show error when signup email is empty", async ({ page }) => {
    await page.goto(ROUTES.SIGNUP);

    await page.getByLabel("Password", { exact: true }).fill("password");
    await page.getByLabel("Confirm Password").fill("password");

    await page.getByRole("button", { name: /create account/i }).click();

    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible({ timeout: 5000 });

    await expect(toast).toContainText(/please fill in all fields/i);
  });

  test("should show error when passwords do not match", async ({ page }) => {
    await page.goto(ROUTES.SIGNUP);

    const email = generateRandomEmail();
    await page.getByLabel("Email").fill(email);
    await expect(page.getByLabel("Email")).toHaveValue(email);

    await page.waitForTimeout(200);

    await page.getByLabel("Password", { exact: true }).fill("password123");
    await page.getByLabel("Confirm Password").fill("wrongpassword");

    await expect(page.getByLabel("Email")).toHaveValue(email);
    await expect(page.getByLabel("Password", { exact: true })).toHaveValue(
      "password123"
    );
    await expect(page.getByLabel("Confirm Password")).toHaveValue(
      "wrongpassword"
    );

    await page.getByRole("button", { name: /create account/i }).click();

    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible({ timeout: 5000 });

    await expect(toast).toContainText(/passwords do not match/i);
  });

  test("should show error with invalid password", async ({ page }) => {
    await page.goto(ROUTES.SIGNUP);

    const email = generateRandomEmail();
    await page.getByLabel("Email").fill(email);
    // Wait for email to be filled
    await expect(page.getByLabel("Email")).toHaveValue(email);

    // Wait a bit to ensure form state is updated
    await page.waitForTimeout(200);

    await page.getByLabel("Password", { exact: true }).fill("123");
    await page.getByLabel("Confirm Password").fill("123");

    // Verify all fields are filled before submitting
    await expect(page.getByLabel("Email")).toHaveValue(email);
    await expect(page.getByLabel("Password", { exact: true })).toHaveValue(
      "123"
    );
    await expect(page.getByLabel("Confirm Password")).toHaveValue("123");

    await page.getByRole("button", { name: /create account/i }).click();

    await expect(page).toHaveURL(ROUTES.SIGNUP);

    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible({ timeout: 5000 });

    await expect(toast).toContainText(
      /password must be at least 8 characters long/i
    );
  });
});
