from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Listen for console events
    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
    # Listen for page errors
    page.on("pageerror", lambda exc: print(f"PAGE ERROR: {exc}"))

    page.goto("http://localhost:5173/")

    # Wait for the footer to be visible
    expect(page.locator("footer")).to_be_visible(timeout=10000)

    page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
