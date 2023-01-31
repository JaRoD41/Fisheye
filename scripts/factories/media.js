function mediaFactory(data) {
	const { id, photographerId, title, image, likes, date, price } = data
	let likesArray = []
	

	function getMediaGallery() {
		const gallery = document.querySelector('.photograph-gallery')
		gallery.innerHTML += `
			<article class="gallery_item" id="${id}">
				<figure>
        	<a href="">
						<img aria-label="${title}" class="single_photo" src="../../assets/photographers/${photographerId}/${image}">
					</a>
					<figcaption class="photo_infos">
						<p>${title}</p>
						<div class="photo_likes"
							<p class="likes">${likes}</p>
							<a href="">
							<img aria-label="ajouter ou retirer un like" class="red-like" src="../../assets/icons/red-heart.svg">
							</a>
						</div>
				</figure>
			</article>	
		`

		return gallery
	}

	// function addAllLikes(total, likes) {
	// 	return total + likes
	// }

	function getPriceRateTab() {
		const photographerTab = document.querySelector('.ratePriceLabel')
		photographerTab.innerHTML = `
			<div>
			<span>${likes}</span>
			<img aria-label="nombre total de likes du photographe" src="../../assets/icons/black-heart.svg">
			</div>
      <span>${price}€/jour</span>
		`

		return photographerTab
	}

	
	return { likes, getMediaGallery, getPriceRateTab }
}
