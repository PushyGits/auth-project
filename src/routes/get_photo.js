const jwt = require('jwt-simple')
const request = require('request')

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

    const url = `https://graph.facebook.com/v2.3/${userDetails.id}/photos/uploaded?access_token=${userDetails.access_token}`

    request(url, (err, response, body) => {
      if (err) throw err
      const photos = JSON.parse(body).data

      const randoms =
        Array.from({ length: 10 }, () => getRandom(photos.length))
             .filter((number, idx, arr) => arr.indexOf(number) === idx)
             .slice(0, 5)
             .map(number => photos[number])
      console.log('randoms', randoms)

      reply(JSON.parse(body))
    })
  }
}
