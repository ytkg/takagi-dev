import { test, expect } from '@playwright/test';

test('homepage has no visual regressions', async ({ page }) => {
  await page.goto('/');

  // Find the scroller and hover over it to pause the JS animation
  const scroller = page.getByTestId('repo-scroller');
  await scroller.hover();

  // The CSS-based animation stopper is still good practice to keep
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
