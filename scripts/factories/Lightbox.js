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
    } else {
      mediaSrc = `./assets/photographers/${this.photographerId}/${this.image}`
      mediaToCreate = document.createElement('img')
    }
  }

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

  createLightboxMediaName() {
    const mediaName = document.createElement('figcaption')
    mediaName.setAttribute('id', 'media-name')
    return mediaName
  }
}
