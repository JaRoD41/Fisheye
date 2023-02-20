let url = new URL(location.href) // declare an variable to pick the actual URL
let photographerPageId = url.searchParams.get('id') // get the id of the photographer from the URL
let medias = []
let sortedMedias = []
let likesArray = []
let eachMedia = []
let eachLike

async function getPhotographerInfos() {
	let photographerInfos = []
	let arrayOfPhotographers = []
	let arrayOfMedias = []
	await fetch('../../data/photographers.json')
		.then((res) => res.json())
		.then((data) => {
			arrayOfPhotographers = data.photographers // filter apply to select the only object that matches the id found in the URL
			photographerInfos = arrayOfPhotographers.filter((person) => {
				return person.id == photographerPageId
			})
			arrayOfMedias = data.media
			medias = arrayOfMedias.filter((media) => {
				return media.photographerId == photographerPageId
			})
		})

	return {
		photographerInfos: photographerInfos[0],
		medias: medias,
	}
}

function addAllLikes(total, num) {
	return total + num
}

async function displayData(photographerInfos, medias) {
	let totalLikes = []
	const photographerPrice = photographerInfos.price
	
	const selectElement = document.getElementById('filter')
	selectElement.addEventListener('change', () => {
		const option = selectElement.value
		// console.log('unsorted medias', medias)
		sortedMedias = sort(medias, option)
		// console.log('sortedMedias', sortedMedias);
		sortedMedias.forEach((eachMedia, currentMediaIndex) => {
			eachMedia = eachMedia
			eachLike = eachMedia.likes
			likesArray.push(eachLike)
			totalLikes = likesArray.reduce(addAllLikes)
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
		eachLike = eachMedia.likes
		likesArray.push(eachLike)
		totalLikes = likesArray.reduce(addAllLikes)
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

	const likeCount = new Likes(eachMedia.id, eachLike, totalLikes)
	likeCount.add()
}

async function init() {
	// Récupère les datas du photographe
	const { photographerInfos, medias } = await getPhotographerInfos()
	displayData(photographerInfos, medias)
}

init()
