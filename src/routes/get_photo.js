const jwt = require('jwt-simple')
const request = require('request')
const querystring = require('querystring')

const getRandom = (len) => Math.floor(Math.random() * len)

const getImagesFromPhotos = (access_token, photos, numImages, cb) => {
  const randoms =
    Array.from({ length: 100 }, () => getRandom(photos.length))
         .filter((number, idx, arr) => arr.indexOf(number) === idx)
         .slice(0, numImages)
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


const getUserPhotos = (access_token, userId, crntPage, maxPages, acc, cb) => {
  const options = querystring.stringify({
    fields: 'link,name',
    access_token: access_token
  })

  const url = `https://graph.facebook.com/v2.3/${userId}/photos/uploaded?${options}`

  request(url, (err, response, raw) => {
    if (err) cb(err)

    const results = JSON.parse(raw)
    const photos = [...acc, ...results.data]
    const next = results.paging.next

    if (!next || crntPage === maxPages) {
      return cb(null, photos)
    }

    getUserPhotos(access_token, userId, crntPage + 1, maxPages, photos, cb)
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

    const numImages = req.query.images || 5
    const userDetails = jwt.decode(req.state.token, process.env.JWT_SECRET)

    getUserPhotos(userDetails.access_token, userDetails.id, 1, 4, [], (err, photos) => {
      if (err) throw err

      getImagesFromPhotos(userDetails.access_token, photos, numImages, (err, images) => {
        if (err) throw err
        reply(images)
      })
    })
  }
}
