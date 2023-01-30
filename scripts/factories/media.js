function mediaFactory(data) {
	const {id, photographerId, title, type, likes, date, price } = data
	
	// const photo = `assets/photographers/Photographers ID Photos/${portrait}`
	function getMediaGallery() {
		const gallery = document.querySelector('.photograph-header')
		gallery.innerHTML = `
			<article class="gallery_item">
        <a >
				<img aria-label="portrait du photographe ${name}" src="assets/photographers/Photographers ID Photos/${portrait}">
				<span>${city}, ${country}</span>
        <span>${tagline}</span>
				</a>
			</article>	
		`

		return gallery
	}
  return { getMediaGallery }
}
