from playwright.sync_api import Page, expect

def verify_key_page(page: Page):
    """
    This test verifies the key page animation.
    """
    # 1. Arrange: Go to the key page on the preview server.
    page.goto("http://localhost:4173/key")

    # 2. Wait for the page to load
    page.wait_for_timeout(5000)
    expect(page.get_by_role("link", name="takagi.dev")).to_be_visible()

    # 3. Screenshot initial state
    page.screenshot(path="jules-scratch/verification/key_page_initial.png")

    # 4. Act: Click the key container.
    key_container = page.locator('.key-container')
    key_container.click()

    # 5. Assert: Wait for the animation to complete and check for "Unlocked!" text.
    expect(page.locator('text=Unlocked!')).to_be_visible()

    # Wait for animation
    page.wait_for_timeout(1000)

    # 6. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/key_page_unlocked.png")

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    verify_key_page(page)
    browser.close()
