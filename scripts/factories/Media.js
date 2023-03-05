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
	getMediaGallery() {
		const gallery = document.querySelector('.photograph-gallery')
		
		let media
		let playLogo

		if (this.video) {
			media = document.createElement('video')
			playLogo = document.createElement('img')
			media.classList.add('single_media')
			playLogo.classList.add('video_logo')
			media.setAttribute(
				'src',
				`./assets/photographers/${this.photographerId}/${this.video}`
			)
			media.setAttribute('width', 350)
			media.setAttribute('height', 300)
			media.setAttribute('tabindex', '0')
			media.setAttribute(
				'onclick',
				`displayLightbox(${this.currentMediaIndex})`
			)
			playLogo.setAttribute('src', './assets/icons/play.png')
		} else {
			media = document.createElement('img')
			media.classList.add('single_media')
			media.setAttribute('aria-label', this.title)
			media.setAttribute('width', 350)
			media.setAttribute('height', 300)
			media.setAttribute('tabindex', '0')
			media.setAttribute(
				'src',
				`./assets/photographers/${this.photographerId}/${this.image}`
			)
			media.setAttribute(
				'onclick',
				`displayLightbox(${this.currentMediaIndex})`
			)
		}

		const article = document.createElement('article')
		article.classList.add('gallery_item')

		const figure = document.createElement('figure')
		figure.classList.add('media_figure')
		figure.appendChild(media)

		const figcaption = document.createElement('figcaption')
		figcaption.classList.add('photo_infos')

		const p1 = document.createElement('h3')
		p1.textContent = this.title

		const photo_likes = document.createElement('div')
		photo_likes.classList.add('photo_likes')

		const p2 = document.createElement('p')
		p2.classList.add('likes-counter')
		p2.textContent = this.likes

		const img = document.createElement('img')
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

class Image extends Media {
	constructor(data, photographerPrice, totalLikes) {
		super(data)
		this.image = data.image
		this.photographerPrice = photographerPrice
		this.totalLikes = totalLikes
	}

	getMedia() {
		const image = document.createElement('img')
		image.setAttribute('aria-label', this.title)
		image.classList.add('single_media')
		image.src = `./assets/photographers/${this.photographerId}/${this.image}`
		return image
	}
}

class Video extends Media {
	constructor(data, photographerPrice, totalLikes) {
		super(data)
		this.video = data.video
		this.photographerPrice = photographerPrice
		this.totalLikes = totalLikes
	}

	getMedia() {
		const video = document.createElement('video')
		video.classList.add('single_media')
		video.src = `./assets/photographers/${this.photographerId}/${this.video}`
		video.controls = true
		return video
	}
}

class MediaFactory {
	constructor(data, photographerPrice, totalLikes) {
		this.data = data
		this.photographerPrice = photographerPrice
		this.totalLikes = totalLikes
	}

	createMedia() {
		let media
		if (this.data.video) {
			media = new Video(this.data, this.photographerPrice, this.totalLikes)
		} else {
			media = new Image(this.data, this.photographerPrice, this.totalLikes)
		}
		return media
	}
}
