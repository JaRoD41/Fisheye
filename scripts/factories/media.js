class Media {
	constructor(data, photographerPrice, totalLikes) {
		this.id = data.id
		this.photographerId = data.photographerId
		this.title = data.title
		this.image = data.image
		this.video = data.video
		this.likes = data.likes
		this.date = data.date
		this.photographerPrice = photographerPrice
		this.totalLikes = totalLikes
	}

	getMediaGallery() {
		const gallery = document.querySelector('.photograph-gallery')
		let media = ''

		if (this.video) {
			media = `<video class="single_media" src="../../assets/photographers/${this.photographerId}/${this.video}" controls></video>`
		} else {
			media = `<img aria-label="${this.title}" class="single_media" src="../../assets/photographers/${this.photographerId}/${this.image}">`
		}

		return (gallery.innerHTML += `
      <article class="gallery_item" id="${this.id}">
        <figure>
          <a href="">
            ${media}
          </a>
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
    `)
	}

	getPriceRateTab() {
		const photographerTab = document.querySelector('.ratePriceLabel')

		return (photographerTab.innerHTML = `
			<div>
			<span>${this.totalLikes}</span>
			<img aria-label="nombre total de likes du photographe" src="../../assets/icons/black-heart.svg">
			</div>
      <span>${this.photographerPrice}€/jour</span>
		`)
	}
}

function mediaFactory(data, photographerPrice, totalLikes) {
	return new Media(data, photographerPrice, totalLikes)
}
