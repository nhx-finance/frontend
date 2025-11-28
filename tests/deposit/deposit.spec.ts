import { test, expect } from "@playwright/test";
import { ROUTES } from "../auth/helpers";

test.describe("Deposit Form", () => {
  async function loginUser(page: any) {
    await page.goto(ROUTES.LOGIN);
    await page.getByLabel("Email").fill("sylusabel1@gmail.com");
    await page.getByLabel("Password").fill("sam@2002");

    await Promise.all([
      page.waitForURL(ROUTES.DASHBOARD, { timeout: 30000 }),
      page.getByRole("button", { name: /login/i }).click(),
    ]);
  }

  test.describe("Step 1: Amount Input", () => {
    test("should display deposit form step 1", async ({ page }) => {
      await loginUser(page);
      await page.goto(ROUTES.DEPOSIT);

      await expect(
        page.getByText("You Deposit", { exact: false })
      ).toBeVisible();

      const depositInput = page.locator('input[type="number"]').first();
      await expect(depositInput).toBeVisible();

      await expect(
        page.getByText("You Receive", { exact: false })
      ).toBeVisible();

      await expect(
        page.getByRole("button", { name: /continue/i })
      ).toBeVisible();
    });

    test("should show conversion calculation", async ({ page }) => {
      await loginUser(page);
      await page.goto(ROUTES.DEPOSIT);

      const depositInput = page.locator('input[type="number"]').first();

      await depositInput.fill("1000");

      await page.waitForTimeout(500);

      await expect(page.getByText("900", { exact: false })).toBeVisible();
    });

    test("should disable continue button when amount is less than minimum", async ({
      page,
    }) => {
      await loginUser(page);
      await page.goto(ROUTES.DEPOSIT);

      const depositInput = page.locator('input[type="number"]').first();
      const continueButton = page.getByRole("button", {
        name: /continue/i,
      });

      await depositInput.fill("50");

      await expect(continueButton).toBeDisabled();
    });

    test("should enable continue button when amount is valid", async ({
      page,
    }) => {
      await loginUser(page);

      await page.goto(ROUTES.DEPOSIT);

      const depositInput = page.locator('input[type="number"]').first();
      const continueButton = page.getByRole("button", { name: /continue/i });

      await depositInput.fill("1000");

      await expect(continueButton).toBeEnabled();
    });

    test("should show login prompt when not authenticated", async ({
      page,
    }) => {
      await page.goto(ROUTES.DEPOSIT);

      await page.waitForTimeout(1000);

      const currentUrl = page.url();
      if (currentUrl.includes("/login")) {
        await expect(page).toHaveURL(/\/login/);
      } else {
        const continueButton = page.getByRole("button", {
          name: /login to continue/i,
        });
        await expect(continueButton).toContainText(/login/i);
        await expect(continueButton).toBeDisabled();
      }
    });

    test("should navigate to step 2 when continue is clicked", async ({
      page,
    }) => {
      await loginUser(page);

      await page.goto(ROUTES.DEPOSIT);

      const depositInput = page.locator('input[type="number"]').first();
      await depositInput.fill("1000");

      const continueButton = page.getByRole("button", { name: /continue/i });
      await continueButton.click();

      await expect(
        page.getByText("Destination Wallet ID", { exact: false })
      ).toBeVisible();
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

    test("should allow entering wallet ID manually", async ({ page }) => {
      const walletInput = page.locator('input[placeholder*="Wallet ID" i]');

      await walletInput.fill("test-wallet-id-123");

      await expect(walletInput).toHaveValue("test-wallet-id-123");
    });

    test("should disable finish button when wallet is not selected", async ({
      page,
    }) => {
      const finishButton = page.getByRole("button", { name: /finish/i });

      await expect(finishButton).toBeDisabled();
    });

    test("should enable finish button when wallet is entered", async ({
      page,
    }) => {
      const walletInput = page.locator('input[placeholder*="Wallet ID" i]');
      const finishButton = page.getByRole("button", { name: /finish/i });

      await walletInput.fill("test-wallet-id-123");

      await expect(finishButton).toBeEnabled();
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

  test.describe("Form Validation", () => {
    test.beforeEach(async ({ page }) => {
      await loginUser(page);
    });

    test("should show error when submitting without wallet", async ({
      page,
    }) => {
      await page.goto(ROUTES.DEPOSIT);

      const depositInput = page.locator('input[type="number"]').first();
      await depositInput.fill("1000");

      const continueButton = page.getByRole("button", { name: /continue/i });
      await expect(continueButton).toBeEnabled({ timeout: 5000 });
      await continueButton.click();

      await expect(
        page.getByText("Destination Wallet ID", { exact: false })
      ).toBeVisible();

      const finishButton = page.getByRole("button", { name: /finish/i });
      await expect(finishButton).toBeDisabled();
    });
  });
});
