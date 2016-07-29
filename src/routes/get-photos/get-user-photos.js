const request = require('request')
const querystring = require('querystring')

const getUserPhotos = (access_token, userId, crntPage, maxPages, acc, cb) => {
  const options = querystring.stringify({
    fields: 'created_time,name',
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

module.exports = getUserPhotos
