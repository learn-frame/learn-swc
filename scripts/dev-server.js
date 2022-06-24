const packagejson = require('../package.json')
const util = require('node:util')
const execPromisofy = util.promisify(require('node:child_process').exec)
const chokidar = require('chokidar')
const { closeServer } = require('../build/index.js')

const watcher = chokidar.watch('../lib').on('all', async (evt, path) => {
  closeServer()

  const { stdout, stderr } = await execPromisofy(
    packagejson.scripts['dev-server']
  )
})

watcher
  .on('addDir', (path) => console.log(`Directory ${path} has been added`))
  .on('unlinkDir', (path) => console.log(`Directory ${path} has been removed`))
  .on('error', (error) => console.log(`Watcher error: ${error}`))
  .on('ready', () => console.log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => {
    console.log('Raw event info:', event, path, details)
  })
