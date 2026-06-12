import { test, expect } from "@playwright/test";

// Requires the app running with a reachable DATABASE_URL (e.g. `make compose-up`,
// then PLAYWRIGHT_BASE_URL=http://localhost:3100 make test-e2e).
test("home page renders the app and redirects to a locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(en|uk)(\/|$)/);
  await expect(page).toHaveTitle(/Skills&Work/);
});

test("the jobs page is reachable", async ({ page }) => {
  await page.goto("/en/jobs");
  await expect(page.getByRole("main")).toBeVisible();
});
