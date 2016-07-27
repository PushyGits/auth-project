const request = require('request')
const querystring = require('querystring')
const jwt = require('jwt-simple')

module.exports = {

  method: 'GET',
  path: '/welcome',
  handler: (req, reply) => {
    // serve welcome page with handlebars vision

    const payload = querystring.stringify({
      code: req.query.code,
      client_id: process.env.FACEBOOK_CLIENT_ID,
      client_secret: process.env.FACEBOOK_SECRET,
      redirect_uri: `${process.env.BASE_URL}/welcome`
    })

    request(`https://graph.facebook.com/v2.3/oauth/access_token?${payload}`, (err, response, body) => {
      console.log(err, body)

      const access_token = JSON.parse(body).access_token
      // creating a web token with jwt-simple
      // 1. setting up an object with key calue access_token
      // 2. second arguemt is a secret string that is used to encode the token
      const token = jwt.encode({
        access_token: access_token
      }, process.env.JWT_SECRET)
      console.log(token)
      reply.redirect('/').state('token', token)
    })
  }
}
