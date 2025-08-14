import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

// @ts-expect-error page is a global
const page = globalThis.page;

describe('Footer VRT', () => {
  it('desktop', async () => {
    await page.setViewportSize({ width: 1280, height: 720 });
    render(<Footer />);
    await expect(document.body).toMatchImageSnapshot();
  });

  it('mobile', async () => {
    await page.setViewportSize({ width: 375, height: 667 });
    render(<Footer />);
    await expect(document.body).toMatchImageSnapshot();
  });
});
