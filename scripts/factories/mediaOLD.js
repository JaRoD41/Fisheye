function mediaFactory(data, photographerPrice, totalLikes) {
	const { id, photographerId, title, image, video, likes, date } = data

	function getMediaGallery() {
		const gallery = document.querySelector('.photograph-gallery')

		let media = ''
		if (video) {
			media = `<video class="single_media" src="../../assets/photographers/${photographerId}/${video}" controls></video>`
		} else {
			media = `<img aria-label="${title}" class="single_media" src="../../assets/photographers/${photographerId}/${image}">`
		}

		gallery.innerHTML += `
			<article class="gallery_item" id="${id}">
				<figure>
        	<a href="">
						${media}
					</a>
					<figcaption class="photo_infos">
						<p>${title}</p>
						<div class="photo_likes"
							<p class="likes" aria-label="likes">${likes}</p>
							<a href="">
							<img aria-label="ajouter ou retirer un like" class="red-like" src="../../assets/icons/red-heart.svg">
							</a>
						</div>
				</figure>
			</article>	
		`

		return gallery
	}

	function getPriceRateTab() {
		const photographerTab = document.querySelector('.ratePriceLabel')

		photographerTab.innerHTML = `
			<div>
			<span>${totalLikes}</span>
			<img aria-label="nombre total de likes du photographe" src="../../assets/icons/black-heart.svg">
			</div>
      <span>${photographerPrice}€/jour</span>
		`

		return photographerTab
	}

	return { likes, getMediaGallery, getPriceRateTab }
}
