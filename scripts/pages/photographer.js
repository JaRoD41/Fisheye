let url = new URL(location.href) // declare an variable to pick the actual URL
let photographerPageId = url.searchParams.get('id') // get the id of the photographer from the URL
let medias = []
let sortedMedias = []
let likesArray = []
let eachMedia = []
let eachLike
let likeCount
let totalLikes = []

function addAllLikes(total, num) {
	return total + num
}

function getTotalLikes(medias) {
	let likesArray = []
	medias.forEach((eachMedia) => {
		likesArray.push(eachMedia.likes)
	})
	return likesArray.reduce(addAllLikes)
}

async function displayData(photographerInfos, medias) {
	let totalLikes = []
	const photographerPrice = photographerInfos.price
	const gallery = document.querySelector('.photograph-gallery')

	const selectElement = document.getElementById('filter')
	selectElement.addEventListener('change', () => {
		gallery.innerHTML = ''
		const option = selectElement.value

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

		// likeCount = new Likes(eachLike, totalLikes)
		// likeCount.add(totalLikes)
	})

	const priceTab = new PriceLikesTabFactory(photographerPrice)
	priceTab.createPriceRateTab()
	const photographerSection = photographerFactory(photographerInfos)
	photographerSection.getPhotographerHeader()

	likeCount = new Likes(eachLike, totalLikes)

	likeCount.add(totalLikes)
}

async function init() {
	// Récupère les datas du photographe
	const { photographerInfos, medias } = await getMedias()
	displayData(photographerInfos, medias)
}

init()
