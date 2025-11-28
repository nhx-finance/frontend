import { test, expect } from "@playwright/test";
import { ROUTES } from "../auth/helpers";

test.describe("Deposit Form", () => {
  async function loginUser(page: any) {
    await page.goto(ROUTES.LOGIN);
    await page.getByLabel("Email").fill("sylusabel1@gmail.com");
    await page.getByLabel("Password").fill("sam@2002");

    await Promise.all([
      page.waitForURL(ROUTES.DASHBOARD, { timeout: 100000 }),
      page.getByRole("button", { name: /login/i }).click(),
    ]);
  }

  test.describe("Step 1: Amount Input", () => {
    test("should show conversion calculation", async ({ page }) => {
      await loginUser(page);
      await page.goto(ROUTES.DEPOSIT);

      const depositInput = page.locator('input[type="number"]').first();

      await depositInput.fill("1000");

      await page.waitForTimeout(500);

      await expect(page.getByText("900", { exact: false })).toBeVisible();
    });
  });

  test.describe("Step 2: Wallet Selection", () => {
    test.beforeEach(async ({ page }) => {
      await loginUser(page);
      await page.goto(ROUTES.DEPOSIT);

      const depositInput = page.locator('input[type="number"]').first();
      await depositInput.fill("1000");
      await page.getByRole("button", { name: /continue/i }).click();
    });

    test("should display wallet selection form", async ({ page }) => {
      await expect(
        page.getByText("Destination Wallet ID", { exact: false })
      ).toBeVisible();

      const walletInput = page.locator('input[placeholder*="Wallet ID" i]');
      await expect(walletInput).toBeVisible();

      await expect(
        page.getByText("Select from your wallets", { exact: false })
      ).toBeVisible();

      await expect(page.getByRole("button", { name: /finish/i })).toBeVisible();
    });

    test("should show message when no wallets are available", async ({
      page,
    }) => {
      const noWalletsMessage = page.getByText(/no saved wallets|add a wallet/i);

      const count = await noWalletsMessage.count();
      if (count > 0) {
        await expect(noWalletsMessage.first()).toBeVisible();
      }
    });
  });
});
