import { Handler } from 'aws-lambda'
import { Browser } from 'puppeteer'
import * as chromium from 'chrome-aws-lambda'
import 'source-map-support/register'

import entry from './rcEntry/entry'

export const rcEntry: Handler = async (_event, _context) => {
  let browser: Browser = null

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })
    await entry(browser)
    const title =  await page.title()
    console.log(`After finishing entry, the page title: ${title}`)
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }
}
