import { Browser } from 'puppeteer'

import login from './login'

const ENTRY_URL = 'https://event.rakuten.co.jp/campaign/card/pointday/'

export default async function entry(browser: Browser) {
  const page = await browser.newPage()

  const cookies = await login(browser)
  for (const cookie of cookies) { await page.setCookie(cookie) }

  await page.goto(ENTRY_URL, { waitUntil: 'domcontentloaded' })
  page.click('.riCheckEntryMulti__noLoginButton')
  await page.waitForNavigation({ timeout: 30000, waitUntil: 'domcontentloaded' })
  const title =  await page.title()
  console.log(`After finishing entry, the page title: ${title}`)
}
