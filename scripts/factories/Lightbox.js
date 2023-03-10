class LightboxFactory {
  constructor(data, currentMediaIndex) {
    this.data = data[currentMediaIndex]
    this.currentMediaIndex = currentMediaIndex
    this.photographerId = data[currentMediaIndex].photographerId
    this.title = data[currentMediaIndex].title
    this.id = data[currentMediaIndex].id
    this.image = data[currentMediaIndex].image
    this.video = data[currentMediaIndex].video

    // On crée une variable qui va contenir le chemin et le type d'élément vers le média à afficher dans la lightbox
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

  // Création du gros plan affiché dans la lightbox

  createLightboxMediaElement() {
    const displayZone = document.getElementById('lightbox-media')
    displayZone.setAttribute('aria-labelledby', `media-${this.id}`)
    mediaToCreate.classList.add('lightboxMediaToShow')
    mediaToCreate.setAttribute('src', mediaSrc)
    mediaToCreate.setAttribute('tabindex', '0')
    mediaToCreate.setAttribute('id', `media-${this.id}`)
    mediaToCreate.setAttribute('alt', `gros plan sur le média nommé ${this.title}`)
    // On ajoute une classe spécifique pour les médias des photographes 82 et 925 car ils ont une position différente
    if (this.photographerId === 82 || this.photographerId === 925) {
      mediaToCreate.classList.add('centered-media-position')
    } else {
      mediaToCreate.classList.add('original-media-position')
    }
    return mediaToCreate
  }

  // Création du nom du média affiché dans la lightbox

  createLightboxMediaName() {
    const mediaName = document.createElement('figcaption')
    mediaName.setAttribute('id', 'media-name')
    return mediaName
  }
}
