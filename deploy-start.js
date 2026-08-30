const { spawnSync } = require('child_process')
const path = require('path')

const rootDir = __dirname
const backendDir = path.join(rootDir, 'backend')
const frontendDir = path.join(rootDir, 'frontend')
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function run(command, args, cwd) {
  console.log(`> ${command} ${args.join(' ')}`)

  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  if (result.status !== 0) {
    process.exit(result.status || 1)
  }
}

run(npmCommand, ['install'], backendDir)
run(npmCommand, ['install'], frontendDir)
run(npmCommand, ['run', 'build'], frontendDir)

require('./backend/server')
