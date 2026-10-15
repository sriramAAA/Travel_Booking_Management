import { expect, test } from '@playwright/test'

test('traveler can discover places and save a stay as a demo booking', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /go where/i })).toBeVisible()
  await page.getByRole('link', { name: /stays/i }).click()
  await expect(page.getByRole('heading', { name: /somewhere to settle in/i })).toBeVisible()
  await page.getByRole('button', { name: /view stay/i }).first().click()
  await page.getByLabel('Lead traveler').fill('Alex Morgan')
  await page.getByLabel('Email address').fill('alex@example.com')
  await page.getByLabel('Check in').fill('2026-10-18')
  await page.getByLabel('Check out').fill('2026-10-21')
  await page.getByRole('button', { name: /save demo booking/i }).click()
  await expect(page.getByText(/your demo booking is saved/i)).toBeVisible()
})

test('traveler can start a trip plan', async ({ page }) => {
  await page.goto('/trips')
  await page.getByRole('button', { name: /create a trip/i }).click()
  await page.getByLabel('Give your trip a name').fill('A few days in Lisbon')
  await page.getByLabel('Destination').fill('Lisbon, Portugal')
  await page.getByLabel('Dates').fill('Nov 08 — Nov 12, 2026')
  await page.getByRole('button', { name: /create my trip/i }).click()
  await expect(page.getByRole('heading', { name: 'A few days in Lisbon' })).toBeVisible()
})

test('admin can hide a mock destination from discovery', async ({ page }) => {
  await page.goto('/admin')
  await page.getByRole('button', { name: 'Enter admin mode' }).click()
  await page.getByRole('button', { name: 'Hide Kyoto' }).click()
  await expect(page.getByRole('button', { name: 'Publish Kyoto' })).toBeVisible()
  await page.goto('/destinations')
  await expect(page.getByRole('heading', { name: 'Kyoto', exact: true })).toHaveCount(0)
})

test('travelers can add a shared group expense', async ({ page }) => {
  await page.goto('/groups')
  await page.getByRole('button', { name: 'Add cost' }).click()
  await page.getByLabel('What was it?').fill('Market lunch')
  await page.getByLabel('Amount').fill('24')
  await page.getByRole('button', { name: 'Save shared cost' }).click()
  await expect(page.getByText('Market lunch')).toBeVisible()
  await expect(page.locator('.group-total strong')).toHaveText('$530')
})
