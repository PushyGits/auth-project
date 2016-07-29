const jwt = require('jwt-simple')
const getImagesFromPhotos = require('./get-images-from-photos')
const getUserPhotos = require('./get-user-photos')


module.exports = {
  method: 'GET',
  path: '/api/get-photo',
  handler: (req, reply) => {
    // If no token: redirect to root url
    if (!req.state.token) return reply.redirect('/')

    const numImages = req.query.images || 5
    const userDetails = jwt.decode(req.state.token, process.env.JWT_SECRET)

    getUserPhotos(null, userDetails.access_token, userDetails.id, 1, 4, [], (err, photos) => {
      if (err) throw err

      getImagesFromPhotos(userDetails.access_token, photos, numImages, (err, images) => {
        if (err) throw err
        reply(images)
      })
    })
  }
}
