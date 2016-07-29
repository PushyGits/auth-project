// Require routes
const staticfile = require('./routes/staticfile')
const homepage = require('./routes/homepage')
const login = require('./routes/login')
const welcome = require('./routes/welcome')
const getPhotos = require('./routes/get-photos')

// Export core includes
module.exports = {
  Hapi: require('hapi'),
  Handlebars: require('handlebars'),
  plugins: [require('inert'), require('vision')],
  routes: [staticfile, homepage, login, welcome, getPhotos]
}
