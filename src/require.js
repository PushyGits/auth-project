const staticfile = require('./routes/staticfile.js')
const homepage = require('./routes/homepage.js')
const login = require('./routes/login.js')
const welcome = require('./routes/welcome.js')

module.exports = {
  Hapi: require('hapi'),
  Handlebars: require('handlebars'),
  plugins: [require('inert'), require('vision')],
  routes: [staticfile, homepage, login, welcome]
}
