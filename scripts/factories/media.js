class Media {
	constructor(data, photographerPrice, totalLikes) {
		this.id = data.id
		this.photographerId = data.photographerId
		this.title = data.title
		this.likes = data.likes
		this.date = data.date
		this.video = data.video
		this.image = data.image
		this.photographerPrice = photographerPrice
		this.totalLikes = totalLikes
	}
	getMediaGallery() {
		const gallery = document.querySelector('.photograph-gallery')
		let media

		if (this.video) {
			media = document.createElement('video')
			media.classList.add('single_media')
			media.setAttribute('data-full-media', this.video)
			media.setAttribute(
				'src',
				`../../assets/photographers/${this.photographerId}/${this.video}`
			)
			media.setAttribute('controls', true)
		} else {
			media = document.createElement('img')
			media.classList.add('single_media')
			media.setAttribute('aria-label', this.title)
			media.setAttribute('data-full-media', this.image)
			media.setAttribute(
				'src',
				`../../assets/photographers/${this.photographerId}/${this.image}`
			)
		}

		const article = document.createElement('article')
		article.classList.add('gallery_item')
		article.setAttribute('id', this.id)

		const figure = document.createElement('figure')
		figure.setAttribute('onclick', 'displayLightbox()')

		const a = document.createElement('a')
		a.setAttribute('href', '#')
		a.appendChild(media)

		const figcaption = document.createElement('figcaption')
		figcaption.classList.add('photo_infos')

		const p1 = document.createElement('p')
		p1.textContent = this.title

		const photo_likes = document.createElement('div')
		photo_likes.classList.add('photo_likes')

		const p2 = document.createElement('p')
		p2.classList.add('likes')
		p2.textContent = this.likes

		const a2 = document.createElement('a')
		a2.setAttribute('href', '#')

		const img = document.createElement('img')
		img.setAttribute('aria-label', 'ajouter ou retirer un like')
		img.classList.add('red-like')
		img.setAttribute('src', '../../assets/icons/red-heart.svg')

		a2.appendChild(img)
		photo_likes.appendChild(p2)
		photo_likes.appendChild(a2)

		figcaption.appendChild(p1)
		figcaption.appendChild(photo_likes)

		figure.appendChild(a)
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
		image.setAttribute('data-full-media', this.image)
		image.src = `../../assets/photographers/${this.photographerId}/${this.image}`
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
		video.setAttribute('data-full-media', this.video)
		video.src = `../../assets/photographers/${this.photographerId}/${this.video}`
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

class PriceTabFactory {
	constructor(photographerPrice, totalLikes) {
		this.photographerPrice = photographerPrice
		this.totalLikes = totalLikes
	}
	createPriceRateTab() {
		const photographerTab = document.querySelector('.ratePriceLabel')
		const container = document.createElement('div')
		const likesSpan = document.createElement('span')
		const likesImg = document.createElement('img')
		const priceSpan = document.createElement('span')

		likesSpan.textContent = this.totalLikes
		likesSpan.classList.add('totalLikes')
		likesImg.setAttribute('aria-label', 'nombre total de likes du photographe')
		likesImg.setAttribute('src', '../../assets/icons/black-heart.svg')
		priceSpan.textContent = `${this.photographerPrice}€/jour`

		container.appendChild(likesSpan)
		container.appendChild(likesImg)
		photographerTab.appendChild(container)
		photographerTab.appendChild(priceSpan)
	}
}
