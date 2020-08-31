import { Handler } from 'aws-lambda'
import { Browser } from 'puppeteer'
import * as chromium from 'chrome-aws-lambda'
import 'source-map-support/register'

import entry from './rc-entry/entry'

export const rcEntry: Handler = async (_event, _context) => {
  let browser: Browser = null

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })
    entry(browser).catch(err => console.error(err))
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }
}
