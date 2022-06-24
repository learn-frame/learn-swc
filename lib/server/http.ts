import { promises, } from 'fs'
import path from 'path'
import { createServer, Server } from 'http'

let server: Server

export function startServer() {
  server = createServer(async (req, res) => {
    const htmlFile = await promises.readFile(path.join(__dirname, 'public/index.html'), 'utf-8');

    res.setHeader('content-type', 'text/html')
    res.write(htmlFile)
    res.end()
  })

  server.listen(8965)
}

export function closeServer() {
  if (server instanceof Server) {
    server.close()
  }
} 