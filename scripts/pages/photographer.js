let url = new URL(location.href) // declare an variable to pick the actual URL
let photographerPageId = url.searchParams.get('id') // get the id of the photographer from the URL
let medias = []
let likesArray = []


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
	const photographerPrice = photographerInfos.price
	medias.forEach((eachMedia) => {
		let eachLike = eachMedia.likes
		likesArray.push(eachLike)
		let totalLikes = likesArray.reduce(addAllLikes)
		const gallerySection = mediaFactory(eachMedia, photographerPrice, totalLikes)
		gallerySection.getMediaGallery()
		gallerySection.getPriceRateTab()
	})

	const photographerSection = photographerFactory(photographerInfos)
	photographerSection.getPhotographerHeader()
}

async function init() {
	// Récupère les datas du photographe
	const { photographerInfos } = await getPhotographerInfos()
	displayData(photographerInfos, medias)
}

init()
