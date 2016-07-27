const request = require('request');
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

    request(`https://graph.facebook.com/v2.3/oauth/access_token?${payload}`, (err, response, body) => {
      console.log(err, body);
    })
  }
}
