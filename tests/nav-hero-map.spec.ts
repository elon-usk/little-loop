import { test, expect } from '@playwright/test'

test('header renders logo and nav', async ({ page }) => {
  await page.goto('/')

  // Logo text and .ro suffix coloring
  const logo = page.locator('.logo')
  await expect(logo).toBeVisible()
  await expect(logo).toContainText('littleloop')
  await expect(logo.locator('.tld')).toHaveText('.ro')

  // Check the .ro color equals brand amber in RGB (F7B538)
  const tld = logo.locator('.tld')
  await expect(tld).toHaveCSS('color', 'rgb(247, 181, 56)')

  // Nav items present (scope to header to avoid CTA matches)
  const header = page.locator('.site-header')
  await expect(header.getByRole('link', { name: 'Acasă' })).toBeVisible()
  await expect(header.getByRole('link', { name: 'Misiune' })).toBeVisible()
  await expect(header.getByRole('link', { name: 'Blog' })).toBeVisible()
  await expect(header.getByRole('link', { name: 'Contact' })).toBeVisible()
})

test('hero heading and subtext are stacked closely', async ({ page }) => {
  await page.goto('/')
  const h1 = page.locator('#hero h1')
  const p = page.locator('#hero p')
  await expect(h1).toBeVisible()
  await expect(p).toBeVisible()
  // Ensure paragraph is near the heading (within ~16px)
  const h1Box = await h1.boundingBox()
  const pBox = await p.boundingBox()
  expect(h1Box && pBox).toBeTruthy()
  if (h1Box && pBox) {
    const verticalGap = pBox.y - (h1Box.y + h1Box.height)
    expect(verticalGap).toBeLessThan(18)
  }
})

test('map container is present (right side column)', async ({ page }) => {
  await page.goto('/')
  const map = page.locator('#activitati #map')
  await expect(map).toBeVisible()
})
