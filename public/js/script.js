
const getPhotos = (cb) => {
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', () => {
    cb(null, JSON.parse(xhr.responseText))
  })

  xhr.addEventListener('error', (err) => {
    cb(err)
  })

  xhr.open('GET', '/api/get-photo')
  xhr.send()
}

getPhotos((err, photos) => {
  if (err) throw err
  console.log(photos)
  const d = document.getElementById('example')

  photos.forEach(photo => {
    const domImg = document.createElement('img')
    domImg.src = photo.source
    d.appendChild(domImg)
  })
})
