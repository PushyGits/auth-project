
const numImages = 15

// Before reload, ensure browser at top of page
window.onbeforeunload = () => window.scrollTo(0, 0)

// getPhotos from server
const getPhotos = (n, cb) => {
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', () => {
    cb(null, JSON.parse(xhr.responseText))
  })

  xhr.addEventListener('error', (err) => {
    cb(err)
  })

  xhr.open('GET', '/api/get-photo?images=' + n)
  xhr.send()
}

getPhotos(numImages, (err, photos) => {
  if (err) throw err

  const container = document.getElementById('example')

  photos.forEach(photo => {
    const domImg = document.createElement('div')
    domImg.className = 'imageContainer'
    domImg.style.backgroundImage = 'url(' + photo.source + ')'
    container.appendChild(domImg)
  })
})


let imageContainers
let interval

document.addEventListener('scroll', () => {
  if (!imageContainers || imageContainers.length === 0) {
    imageContainers = Array.from(document.getElementsByClassName('imageContainer')).reverse()
    interval = ((document.body.clientHeight + 1) - window.innerHeight) / (numImages)
  }

  if (imageContainers.length === 0) return

  const scrollY = document.body.scrollTop
  const crntPercent = (scrollY % interval) / interval
  const crntImg = Math.floor(scrollY / interval)
  const opacity = (1 - crntPercent) * 4

  console.log(crntImg, crntPercent)
  imageContainers.forEach((elem, idx) => {
    if (idx > crntImg) elem.style.opacity = 1;
    if (idx < crntImg) elem.style.opacity = 0;
    if (idx === crntImg && crntPercent < 0.75) elem.style.opacity = 1;
  })

  if (crntPercent > 0.75 && crntImg !== numImages - 1) {
    imageContainers[crntImg].style.opacity = opacity;
  }
})
