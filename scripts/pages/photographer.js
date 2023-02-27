let url = new URL(location.href) // declare an variable to pick the actual URL
let photographerPageId = url.searchParams.get('id') // get the id of the photographer from the URL
let medias = []
let sortedMedias = []
let eachMedia = []
let eachLike
let likeCount

async function displayData(photographerInfos, medias) {
	let totalLikes = []
	const photographerPrice = photographerInfos.price
	const gallery = document.querySelector('.photograph-gallery')

	const selectElement = document.getElementById('filter-button')
	const filterMenu = document.getElementById('filter-menu')
	filterMenu.addEventListener('click', (event) => {
		gallery.innerHTML = ''
		const selectedListItem = event.target.closest('li')
		const option = selectedListItem.getAttribute('data-filter-value')
		console.log(option)
		sortedMedias = sort(medias, option)

		sortedMedias.forEach((eachMedia, currentMediaIndex) => {
			eachMedia = eachMedia
			const totalLikes = getTotalLikes(medias)
			const gallerySection = new Media(
				eachMedia,
				photographerPrice,
				totalLikes,
				currentMediaIndex
			)
			gallerySection.getMediaGallery()
		})
		addLikeListeners()
	})
	const defaultOption = 'popularite'
	sortedMedias = sort(medias, defaultOption)
	sortedMedias.forEach((eachMedia, currentMediaIndex) => {
		eachMedia = eachMedia
		totalLikes = getTotalLikes(medias)
		const gallerySection = new Media(
			eachMedia,
			photographerPrice,
			totalLikes,
			currentMediaIndex
		)
		gallerySection.getMediaGallery()
	})

	const priceTab = new PriceLikesTabFactory(photographerPrice)
	priceTab.createPriceRateTab()
	const photographerSection = photographerFactory(photographerInfos)
	photographerSection.getPhotographerHeader()
	addLikeListeners()
}

async function init() {
	// Récupère les datas du photographe
	const { photographerInfos, medias } = await getMedias()
	displayData(photographerInfos, medias)
}

init()
