let url = new URL(location.href) // declare an variable to pick the actual URL
let photographerPageId = url.searchParams.get('id') // get the id of the photographer from the URL
let medias = []
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

async function displayData(photographerInfos, medias, likes) {
	medias.forEach((eachMedia) => {
		const gallerySection = mediaFactory(eachMedia)
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
