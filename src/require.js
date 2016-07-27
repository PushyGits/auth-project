const staticfile = require('./routes/staticfile.js')
const homepage = require('./routes/homepage.js')
const login = require('./routes/login.js')

module.exports = {
  Hapi: require('hapi'),
  Handlebars: require('handlebars'),
  plugins: [require('inert'), require('vision')],
  routes: [staticfile, homepage, login]
}
