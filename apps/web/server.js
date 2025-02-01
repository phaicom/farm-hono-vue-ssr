import fsp from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

function resolve(p) {
  return path.resolve(p)
}

const app = new Hono()

app.use('/*', serveStatic({ root: resolve('build') }))

app.use('/*', async (c) => {
  const url = c.req.path

  try {
    const template = await fsp.readFile(resolve('build/client.html'), 'utf8')
    const serverEntry = resolve('dist/index.js')
    const render = (await import(process.platform === 'win32' ? pathToFileURL(serverEntry) : serverEntry)).default

    const renderedHtml = await render(url)

    const html = template.replace(
      '<div>app-html-to-replace</div>',
      renderedHtml,
    )

    c.header('Content-Type', 'text/html')
    c.status(200)
    return c.html(html)
  }
  catch (error) {
    c.status(500)
    console.error(error.stack)
  }
})

const port = process.env.FARM_DEFAULT_SERVER_PORT || 3000
export default {
  port,
  fetch: app.fetch,
}
