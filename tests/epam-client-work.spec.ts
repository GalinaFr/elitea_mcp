import { test, expect } from '@playwright/test';

/**
 * Test Suite: EPAM Services - Client Work Navigation
 *
 * Scenario:
 * 1. Navigate to https://www.epam.com/
 * 2. Select "Services" from the header menu
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 */
test.describe('EPAM Services - Client Work Navigation', () => {

  test('should navigate to Client Work page via Services menu', async ({ page }) => {

    // Step 1: Navigate to EPAM homepage
    await page.goto('https://www.epam.com/');
    await expect(page).toHaveTitle(/EPAM/);
    console.log('✅ Step 1: Navigated to https://www.epam.com/');

    // Step 2: Select "Services" from the header menu
    // Note: The homepage hero slider overlay intercepts pointer events on the header link,
    // so we use evaluate() to trigger a direct JS click on the Services anchor.
    await page.evaluate(() => {
      const servicesLink = document.querySelector<HTMLAnchorElement>('a[href="/services"]');
      if (servicesLink) servicesLink.click();
    });
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://www.epam.com/services');
    await expect(page).toHaveTitle(/Services/);
    console.log('✅ Step 2: Clicked "Services" in the header menu — navigated to /services');

    // Step 3: Click the "Explore Our Client Work" link on the Services page
    const exploreLink = page.getByRole('link', { name: 'Explore Our Client Work' });
    await expect(exploreLink).toBeVisible();
    await exploreLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://www.epam.com/services/client-work');
    console.log('✅ Step 3: Clicked "Explore Our Client Work" — navigated to /services/client-work');

    // Step 4: Verify "Client Work" heading is visible on the page
    const clientWorkHeading = page.getByRole('heading', { name: 'Client Work', level: 1 });
    await expect(clientWorkHeading).toBeVisible();
    console.log('✅ Step 4: "Client Work" heading is visible on the page');

    // Additional assertion: verify page title
    await expect(page).toHaveTitle('Client Work');
    console.log('✅ Page title is "Client Work" — all assertions passed!');
  });

});
