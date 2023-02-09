class Media {
	constructor(data) {
		this.id = data.id
		this.photographerId = data.photographerId
		this.title = data.title
		this.likes = data.likes
		this.date = data.date
	}

	render() {
		return `
      <article class="gallery_item" id="${this.id}">
        <figure>
          ${this.renderMedia()}
          <figcaption class="photo_infos">
            <p>${this.title}</p>
            <div class="photo_likes">
              <p class="likes">${this.likes}</p>
              <a href="">
                <img aria-label="ajouter ou retirer un like" class="red-like" src="../../assets/icons/red-heart.svg">
              </a>
            </div>
          </figcaption>
        </figure>
      </article>
    `
	}
}

class Image extends Media {
	constructor(data) {
		super(data)
		this.image = data.image
	}

	renderMedia() {
		return `<img aria-label="${this.title}" class="single_media" onclick='displayLightbox()' src="../../assets/photographers/${this.photographerId}/${this.image}">`
	}
}

class Video extends Media {
	constructor(data) {
		super(data)
		this.video = data.video
	}

	renderMedia() {
		return `<video class="single_media" onclick='displayLightbox()' src="../../assets/photographers/${this.photographerId}/${this.video}" controls></video>`
	}
}

class MediaRenderer {
	constructor(media) {
		this.media = media
		this.gallery = document.querySelector('.photograph-gallery')
	}

	render() {
		this.gallery.innerHTML += this.media.render()
	}
}

class MediaFactory {
	constructor(data, photographerPrice, totalLikes) {
		this.data = data
		this.photographerPrice = photographerPrice
		this.totalLikes = totalLikes
	}

	createMedia() {
		if (this.data.video) {
			return new Video(this.data)
		} else {
			return new Image(this.data)
		}
	}
}

function PhotographerRenderer(photographer) {
	const photographerTab = document.querySelector('.ratePriceLabel')

	const photographerHTML = `
			<div>
			<span>${photographer.totalLikes}</span>
			<img aria-label="nombre total de likes du photographe" src="../../assets/icons/black-heart.svg">
			</div>
      <span>${photographer.photographerPrice}€/jour</span>
		`
	photographerTab.innerHTML = photographerHTML
}

function mediaFactory(data, photographerPrice, totalLikes) {
	const media = new Media(data, photographerPrice, totalLikes)
	MediaRenderer(media)
	PhotographerRenderer(media)
	return media
}
