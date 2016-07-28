const jwt = require('jwt-simple')
const request = require('request')
const querystring = require('querystring')

const getRandom = (len) => Math.floor(Math.random() * len)

module.exports = {
  method: 'GET',
  path: '/api/get-photo',
  handler: (req, reply) => {
    if (!req.state.token) {
      console.log('No token found :(')
      return
    }
    const userDetails = jwt.decode(req.state.token, process.env.JWT_SECRET)

    const options = querystring.stringify({
      fields: 'link,name',
      access_token: userDetails.access_token
    })

    const url = `https://graph.facebook.com/v2.3/${userDetails.id}/photos/uploaded?${options}`

    request(url, (err, response, body) => {
      if (err) throw err
      const photos = JSON.parse(body).data
      console.log(photos)

      const randoms =
        Array.from({ length: 10 }, () => getRandom(photos.length))
             .filter((number, idx, arr) => arr.indexOf(number) === idx)
             .slice(0, 5)
             .map(number => photos[number].id)
            //  .map(number => photos[number])

        const url2 = `https://graph.facebook.com/v2.3/${randoms[0]}?fields=images`

        request(url2, (err, response, body) => {

        })
      // reply(randoms)
    })
  }
}
