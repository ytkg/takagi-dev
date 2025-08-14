import { test, expect } from '@playwright/test';

test('homepage has no visual regressions', async ({ page }) => {
  await page.goto('/');
  // Add a style tag to pause all animations and transitions
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-play-state: paused !important;
        transition-property: none !important;
      }
    `,
  });
  await expect(page).toHaveScreenshot({ caret: 'hide' });
});
