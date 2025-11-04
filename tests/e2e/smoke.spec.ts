import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Saint Lucid/);
  });

  test('should have all main sections', async ({ page }) => {
    await page.goto('/');

    // Check for main sections
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#domains')).toBeVisible();
    await expect(page.locator('#experience')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Click on About link
    await page.click('a[href="#about"]');
    await page.waitForTimeout(500);

    // Should scroll to about section
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('should pass accessibility audit', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Project Pages', () => {
  test('should load ASTRA OS project page', async ({ page }) => {
    await page.goto('/projects/astra-os-core');
    await expect(page.locator('h1')).toContainText('ASTRA OS');
  });

  test('should load Floating Through Dimensions project page', async ({
    page,
  }) => {
    await page.goto('/projects/floating-through-dimensions');
    await expect(page.locator('h1')).toContainText(
      'Floating Through Dimensions'
    );
  });

  test('project pages should pass accessibility audit', async ({ page }) => {
    await page.goto('/projects/astra-os-core');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('404 Page', () => {
  test('should show 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.locator('h1')).toContainText('404');
  });
});
