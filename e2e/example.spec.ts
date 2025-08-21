
import { test, expect } from '@playwright/test'

test('renders home and has search input', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(page.getByPlaceholder('Paste BTC address or transaction hash...')).toBeVisible()
})
