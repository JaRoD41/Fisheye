class Media {
  constructor(data, photographerPrice, totalLikes, currentMediaIndex) {
    this.id = data.id
    this.photographerId = data.photographerId
    this.title = data.title
    this.likes = data.likes
    this.date = data.date
    this.video = data.video
    this.image = data.image
    this.photographerPrice = photographerPrice
    this.totalLikes = totalLikes
    this.currentMediaIndex = currentMediaIndex
  }

  // Création de la section contenant les médias

  getMediaGallery() {
    const gallery = document.querySelector('.photograph-gallery')

    let media
    let playLogo
    // Si le média est une vidéo, on crée un élément video et un élément img pour le logo play
    if (this.video) {
      media = document.createElement('video')
      playLogo = document.createElement('img')
      media.classList.add('single_media')
      playLogo.classList.add('video_logo')
      playLogo.setAttribute('alt', 'play logo')
      media.setAttribute('src', `./assets/photographers/${this.photographerId}/${this.video}`)
      media.setAttribute('alt', `courte vidéo de ${this.title}, agrandir l'image`)
      media.setAttribute('width', 350)
      media.setAttribute('height', 300)
      media.setAttribute('tabindex', '0')
      media.setAttribute('onclick', `displayLightbox(${this.currentMediaIndex})`)
      media.setAttribute('onkeyup', `if(event.keyCode == 13){displayLightbox(${this.currentMediaIndex})}`)
      playLogo.setAttribute('src', './assets/icons/play.png')
      playLogo.setAttribute('onclick', `displayLightbox(${this.currentMediaIndex})`)
    } else {
      // Sinon on crée un élément img
      media = document.createElement('img')
      media.classList.add('single_media')
      media.setAttribute('alt', `miniature de ${this.title}, agrandir l'image`)
      media.setAttribute('width', 350)
      media.setAttribute('height', 300)
      media.setAttribute('tabindex', '0')
      media.setAttribute('src', `./assets/photographers/${this.photographerId}/${this.image}`)
      media.setAttribute('onclick', `displayLightbox(${this.currentMediaIndex})`)
      media.setAttribute('onkeyup', `if(event.keyCode == 13){displayLightbox(${this.currentMediaIndex})}`)
    }
    // On ajoute une classe spécifique pour les médias des photographes 82 et 925 car ils ont une position différente
    if (this.photographerId === 82 || this.photographerId === 925) {
      media.classList.add('centered-media-position')
    } else {
      media.classList.add('original-media-position')
    }

    const article = document.createElement('article')
    article.classList.add('gallery_item')

    const figure = document.createElement('figure')
    figure.classList.add('media_figure')
    this.video ? figure.append(media, playLogo) : figure.appendChild(media)

    // Création de la légende du média
    const figcaption = document.createElement('figcaption')
    figcaption.classList.add('photo_infos')

    const p1 = document.createElement('h3')
    p1.textContent = this.title

    // Création de la section contenant le nombre de likes et le coeur rouge
    const photo_likes = document.createElement('div')
    photo_likes.classList.add('photo_likes')

    const p2 = document.createElement('h4')
    p2.classList.add('likes-counter')
    p2.textContent = this.likes

    // Création de l'élément img pour le coeur rouge
    const img = document.createElement('img')
    img.setAttribute('alt', 'likes')
    img.setAttribute('aria-label', 'ajouter ou retirer un like')
    img.setAttribute('id', this.id)
    img.classList.add('red-like')
    img.setAttribute('tabindex', '0')
    img.setAttribute('role', 'button')
    img.setAttribute('src', './assets/icons/red-heart.svg')

    photo_likes.appendChild(p2)
    photo_likes.appendChild(img)

    figcaption.appendChild(p1)
    figcaption.appendChild(photo_likes)

    figure.appendChild(figcaption)

    article.appendChild(figure)

    gallery.appendChild(article)
  }
}
