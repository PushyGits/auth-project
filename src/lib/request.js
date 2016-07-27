const https = require('https')

module.exports = (options, cb) => {
  const req = https.request(options, (res) => {
    let data = ''

    res.on('data', (d) => {
      data += d
    })

    res.on('end', () => {
      cb(null, data)
    })
  })

  req.write(options.body || '')

  req.end()

  req.on('error', (err) => {
    console.log(err)
    cb(err)
  })
}
