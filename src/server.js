// Load environment variables
const env = require('env2')
env('config.env')

// Load core dependencies
const req = require('./require.js')

// Create server and connect to port
const server = new req.Hapi.Server()
server.connection({ port: process.env.PORT || 3000 })

// Register plugins with serve
server.register(req.plugins, (err) => {
  // Handle errors (by crashing server)
  if (err) throw err

  // Load routes
  server.route(req.routes)

  // Configure view defaults (NOTE: think this needs to come last?)
  server.views({
    engines: {html: req.Handlebars},
    relativeTo: __dirname,
    path: '../views/templates',
    layout: 'default',
    layoutPath: '../views/layout',
    partialsPath: '../views/partials',
    helpersPath: '../views/helpers'
  })

  // Start server (NOTE: safer to call start from inside register in case any plugins are async)
  server.start((err) => {
    // Handle errors (by crashing server)
    if (err) throw err

    console.log('Server running at:', server.info.uri)
  })
})

module.exports = server
