import { test, expect } from '@playwright/test';

const BASE_URL = 'https://arms.glba.ricoh.co.jp/ARMS/index.jsp';
const ADFS_URL = 'https://adfs.jp.ricoh.com/adfs/ls/';

test('ricoh arms login and device search', async ({ page }) => {
  test.setTimeout(60000);
  const username = process.env.RICOH_ARMS_USERNAME;
  const password = process.env.RICOH_ARMS_PASSWORD;

  if (!username || !password) {
    throw new Error('RICOH_ARMS_USERNAME and RICOH_ARMS_PASSWORD must be set in .env');
  }

  // Navigate to ARMS — redirects to ADFS login
  await page.goto(BASE_URL);

  // ADFS login page: select partner login type
  await page.getByText('Partner (Dealer / Supplier)').click();

  // Fill credentials
  await page.getByRole('textbox', { name: 'User Account' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait for ADFS redirect back to ARMS
  await page.waitForURL(url => url.hostname !== 'adfs.jp.ricoh.com', { timeout: 15000 });

  // Launch ARMS application and wait for it to load
  await page.getByRole('link', { name: 'Click to Start RICOH ARMS' }).click();
  await page.waitForLoadState('networkidle');

  // Navigate to Supply page and search for the device
  await page.goto('https://arms.glba.ricoh.co.jp/ARMS/supply');
  await page.waitForLoadState('networkidle');
  await page.getByRole('textbox').waitFor({ state: 'visible', timeout: 10000 });

  await page.getByRole('textbox').fill('3913P550353');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForLoadState('networkidle');
  // Spinner appears after networkidle — wait for all Loading headings to clear
  await page.locator('h2:has-text("Loading")').first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  await page.locator('h2:has-text("Loading")').first().waitFor({ state: 'hidden', timeout: 30000 });

  await page.screenshot({ path: '.tmp/device-condition.png', fullPage: true });

  // Click Supply in the sidebar to get cartridge-level toner data
  await page.getByTestId('menu-item-text').filter({ hasText: 'Supply' }).click();
  await page.locator('h2:has-text("Loading")').first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  await page.locator('h2:has-text("Loading")').first().waitFor({ state: 'hidden', timeout: 30000 });
  await page.screenshot({ path: '.tmp/supply-detail.png', fullPage: true });

  const fs = require('fs');
  fs.writeFileSync('.tmp/supply-detail.html', await page.content());
});
