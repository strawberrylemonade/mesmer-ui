module.exports = {
  launch: {
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  server: {
    command: 'npm start',
    port: 3000,
    launchTimeout: 20000,
    debug: false
  },
}