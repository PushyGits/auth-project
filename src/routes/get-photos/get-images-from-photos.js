const request = require('request')

const getRandom = (len) => Math.floor(Math.random() * len)

const getImagesFromPhotos = (access_token, photos, numImages, cb) => {
  const randomImgIndices =
    Array.from({ length: 100 }, () => getRandom(photos.length))
         .filter((number, idx, arr) => arr.indexOf(number) === idx)
         .slice(0, numImages)

  const randomImgQueries =
    randomImgIndices.map(number => ({
           method: 'GET',
           relative_url: `/${photos[number].id}?fields=images`
         }))

    const options = {
      form: {
        access_token: access_token,
        batch: JSON.stringify(randomImgQueries)
      }
    }

    request.post('https://graph.facebook.com/v2.3/', options , (err, response, body) => {
      if (err) cb(err)

      const imgs = JSON.parse(body)
                       .map(o => JSON.parse(o.body).images[0])

      const res = imgs.map((img, idx) => Object.assign({}, {img}, photos[randomImgIndices[idx]]))
      // console.log(res)
      cb(null, res)
    })
}

module.exports = getImagesFromPhotos
