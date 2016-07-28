const jwt = require('jwt-simple')
const request = require('request')
const querystring = require('querystring')

const getRandom = (len) => Math.floor(Math.random() * len)

const getImages = (access_token, photos, cb) => {
  const randoms =
    Array.from({ length: 10 }, () => getRandom(photos.length))
         .filter((number, idx, arr) => arr.indexOf(number) === idx)
         .slice(0, 5)
         .map(number => ({
           method: 'GET',
           relative_url: `/${photos[number].id}?fields=images`
         }))

    const options = {
      form: {
        access_token: access_token,
        batch: JSON.stringify(randoms)
      }
    }

    request.post('https://graph.facebook.com/v2.3/', options , (err, response, body) => {
      if (err) cb(err)

      const imgs = JSON.parse(body)
                    .map(o => JSON.parse(o.body).images[0])

      cb(null, imgs)
    })
}

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

      const json = JSON.parse(body)
      const photos = json.data
      const next = json.paging.next

      const replyFn = (err, images) => {
        if (err) throw err
        reply(images)
      }

      if (!next) {
        getImages(userDetails.access_token, photos, replyFn)
      } else {
        request(next, (err, response, body) => {
          if (err) throw err

          const json = JSON.parse(body)
          const morePhotos = json.data

          getImages(userDetails.access_token, [...morePhotos, ...photos], replyFn)
        })
      }

    })
  }
}
