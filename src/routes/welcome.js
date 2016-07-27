const request = require('../lib/request.js')
const querystring = require('querystring')

module.exports = {

  method: 'GET',
  path: '/welcome',
  handler: (req, reply) => {
    const payload = querystring.stringify({
      code: req.query.code,
      client_id: process.env.FACEBOOK_CLIENT_ID,
      client_secret: process.env.FACEBOOK_SECRET,
      redirect_uri: `${process.env.BASE_URL}/welcome`
    })
    const options = {
      hostname: 'graph.facebook.com',
      port: 433,
      path: '/v2.3/oauth/access_token',
      method: 'GET',
      body: payload
    }
    console.log(options);
    request(options, (err, data) => {
      console.log(err, data)
    })
  }
}
