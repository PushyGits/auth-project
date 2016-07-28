
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
    const domImg = document.createElement('div')
    domImg.className = 'imageContainer'
    domImg.style.backgroundImage = 'url(' + photo.source + ')'
    d.appendChild(domImg)
  })
})

document.addEventListener('scroll', (e) => {
  const scrollY = document.body.scrollTop
  const interval = document.body.clientHeight / 6
  const crntPercent = (scrollY % interval) / interval
  const crntImg = 4 - (Math.floor(scrollY / interval))
  const opacity = (1 - crntPercent) * 4

  Array.from(document.getElementsByClassName('imageContainer')).forEach((elem, idx) => {
    if (idx > crntImg) elem.style.opacity = 0;
    if (idx < crntImg) elem.style.opacity = 1;
    if (idx === crntImg && crntPercent < 0.75) elem.style.opacity = 1;
  })

  if (crntPercent > 0.75) {
    document.getElementsByClassName('imageContainer')[crntImg].style.opacity = opacity;
  }
  // console.log(crntPercent, crntImg);
})
