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
		const a = document.createElement('a')
		let media
		let playLogo

		if (this.video) {
			media = document.createElement('video')
			playLogo = document.createElement('img')
			media.classList.add('single_media')
			playLogo.classList.add('video_logo')
			media.setAttribute(
				'src',
				`../../assets/photographers/${this.photographerId}/${this.video}`
			)
			playLogo.setAttribute('src', '../../assets/icons/play.png')
			a.setAttribute('href', '#')
			a.classList.add('video_link')
			a.setAttribute('onclick', `displayLightbox(${this.currentMediaIndex})`)
			a.append(playLogo, media)
		} else {
			media = document.createElement('img')
			media.classList.add('single_media')
			media.setAttribute('aria-label', this.title)
			media.setAttribute(
				'src',
				`../../assets/photographers/${this.photographerId}/${this.image}`
			)
			a.setAttribute('href', '#')
			a.classList.add('image_link')
			a.setAttribute('onclick', `displayLightbox(${this.currentMediaIndex})`)
			a.appendChild(media)
		}

		const article = document.createElement('article')
		article.classList.add('gallery_item')
		article.setAttribute('id', this.id)

		const figure = document.createElement('figure')
		figure.classList.add('media_figure')

		const figcaption = document.createElement('figcaption')
		figcaption.classList.add('photo_infos')

		const p1 = document.createElement('p')
		p1.textContent = this.title

		const photo_likes = document.createElement('div')
		photo_likes.classList.add('photo_likes')

		const p2 = document.createElement('p')
		p2.classList.add('likes')
		p2.textContent = this.likes
		p2.addEventListener('click', () => {
			p2.textContent = Number(p2.textContent) + 1
		})

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

class LightboxFactory {
	constructor(data, currentMediaIndex) {
		this.data = data[currentMediaIndex]
		this.currentMediaIndex = currentMediaIndex
		console.log('data dans LightboxFactory:', data)
		console.log('suivant dans LightboxFactory:', data[currentMediaIndex + 1])
		this.photographerId = data[currentMediaIndex].photographerId
		this.title = data[currentMediaIndex].title
		this.id = data[currentMediaIndex].id
		this.image = data[currentMediaIndex].image
		this.video = data[currentMediaIndex].video

		if (this.data.video) {
			mediaSrc = `../../assets/photographers/${this.photographerId}/${this.video}`
			mediaToCreate = document.createElement('iframe')
			mediaToCreate.setAttribute('controls', true)
		} else {
			mediaSrc = `../../assets/photographers/${this.photographerId}/${this.image}`
			mediaToCreate = document.createElement('img')
		}
	}

	createLightboxMediaElement() {
		console.log('this data dans LightboxFactory:', this.data)
		// console.log('media suivant :', this.data[this.currentMediaIndex+1])
		mediaToCreate.classList.add('lightboxMediaToShow')
		mediaToCreate.setAttribute('src', mediaSrc)
		return mediaToCreate
	}

	// prevMedia(length, currentMediaIndex) {
	// 	if ((this.currentMediaIndex = 0)) {
	// 		this.currentMediaIndex = length - 1
	// 	} else {
	// 		this.currentMediaIndex -= 1
	// 	}
	// 	mediaToCreate.classList.add('lightboxMediaToShow')
	// 	mediaToCreate.setAttribute('src', mediaSrc)
	// }

	// nextMedia(length) {
	// 	if ((this.currentMediaIndex = length - 1)) {
	// 		this.currentMediaIndex = 0
	// 	} else {
	// 		this.currentMediaIndex += 1
	// 	}
	// 	mediaToCreate.classList.add('lightboxMediaToShow')
	// 	mediaToCreate.setAttribute('src', mediaSrc)
	// }
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
