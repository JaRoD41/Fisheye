class LightboxFactory {
  constructor(data, currentMediaIndex) {
    this.data = data[currentMediaIndex]
    this.currentMediaIndex = currentMediaIndex
    this.photographerId = data[currentMediaIndex].photographerId
    this.title = data[currentMediaIndex].title
    this.id = data[currentMediaIndex].id
    this.image = data[currentMediaIndex].image
    this.video = data[currentMediaIndex].video

    if (this.data.video) {
      mediaSrc = `./assets/photographers/${this.photographerId}/${this.video}`
      mediaToCreate = document.createElement('iframe')
      mediaToCreate.setAttribute('controls', true)
      mediaToCreate.setAttribute('title', 'lecture de la vidéo')
    } else {
      mediaSrc = `./assets/photographers/${this.photographerId}/${this.image}`
      mediaToCreate = document.createElement('img')
    }
  }

  // création du gros plan affiché dans la lightbox

  createLightboxMediaElement() {
    const displayZone = document.getElementById('lightbox-media')
    displayZone.setAttribute('aria-labelledby', `media-${this.id}`)
    mediaToCreate.classList.add('lightboxMediaToShow')
    mediaToCreate.setAttribute('src', mediaSrc)
    mediaToCreate.setAttribute('tabindex', '0')
    mediaToCreate.setAttribute('id', `media-${this.id}`)
    mediaToCreate.setAttribute('alt', `gros plan sur le média nommé ${this.title}`)
    return mediaToCreate
  }

  // création du nom du média affiché dans la lightbox

  createLightboxMediaName() {
    const mediaName = document.createElement('figcaption')
    mediaName.setAttribute('id', 'media-name')
    return mediaName
  }
}
