import { Browser, Cookie } from 'puppeteer'

const LOGIN_URL = 'https://grp02.id.rakuten.co.jp/rms/nid/login'

export default async function login(browser: Browser): Promise<Cookie[]> {
  const username = process.env.EMAIL
  const password = process.env.PASSWORD
  if (username == null || password == null) {
    console.error('Environment variables: EMAIL and PASSWORD must be specified')
    process.exit(1)
  }

  const page = await browser.newPage()
  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' })
  await page.type('#loginInner_u', username)
  await page.type('#loginInner_p', password)
  page.click('.loginButton')

  await page.waitForNavigation({ timeout: 30000, waitUntil: 'domcontentloaded' })
  const title = await page.title()
  console.log(`After logging in, the page title: ${title}`)
  const cookies =  await page.cookies()
  return cookies
}
