import { Browser } from 'puppeteer'

import login from './login'

const ENTRY_URL = 'https://event.rakuten.co.jp/campaign/card/pointday/'

const TARGET_BUTTON_CLASS = '.riCheckEntryMulti__noLoginButton'

export default async function entry(browser: Browser) {
  const page = await browser.newPage()

  const cookies = await login(browser)
  for (const cookie of cookies) { await page.setCookie(cookie) }

  await page.goto(ENTRY_URL, { waitUntil: 'domcontentloaded' })
  if (await page.$(TARGET_BUTTON_CLASS) == null) {
    console.error('There seems to be no campaign held now')
    process.exit(1)
  }
  await page.click(TARGET_BUTTON_CLASS)
  await page.waitForNavigation({ timeout: 30000, waitUntil: 'domcontentloaded' })
}
