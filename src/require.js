const staticfile = require('./routes/staticfile.js')
const homepage = require('./routes/homepage.js')
const login = require('./routes/login.js')
const welcome = require('./routes/welcome.js')
const get_photo = require('./routes/get_photo.js')

module.exports = {
  Hapi: require('hapi'),
  Handlebars: require('handlebars'),
  plugins: [require('inert'), require('vision')],
  routes: [staticfile, homepage, login, welcome, get_photo]
}
