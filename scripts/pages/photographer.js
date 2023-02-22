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
			arrayOfPhotographers = data.photographers // filtre pour récupérer les infos du photographe contenu dans l'id de l'url
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
	const gallery = document.querySelector('.photograph-gallery')

	const selectElement = document.getElementById('filter')
	selectElement.addEventListener('change', () => {
		gallery.innerHTML = ''
		const option = selectElement.value

		sortedMedias = sort(medias, option)

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
		
		// const likeCount = new Likes(eachLike, totalLikes)
		// likeCount.add()
	})

	const priceTab = new PriceLikesTabFactory(photographerPrice)
	priceTab.createPriceRateTab()
	const photographerSection = photographerFactory(photographerInfos)
	photographerSection.getPhotographerHeader()

	const likeCount = new Likes(eachLike, totalLikes)
	likeCount.add()
}

async function init() {
	// Récupère les datas du photographe
	const { photographerInfos, medias } = await getPhotographerInfos()
	displayData(photographerInfos, medias)
}

init()
