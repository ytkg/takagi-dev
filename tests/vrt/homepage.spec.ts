import { test, expect } from '@playwright/test';

test('homepage has no visual regressions', async ({ page }) => {
  await page.goto('/');
  // Allow a small pixel difference ratio to account for the animation
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
});
