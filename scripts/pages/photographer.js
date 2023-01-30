let url = new URL(location.href) // declare an variable to pick the actual URL
let photographerPageId = url.searchParams.get('id') // get the id of the photographer from the URL

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

function displayData(photographerInfos, medias) {
	const section = document.querySelector('.photograph-header')

	const photographerSection = photographerFactory(photographerInfos)
	const PhotographerInfosDOM = photographerSection.getPhotographerHeader()
	const gallery = document.querySelector('.photograph-gallery')
	const gallerySection = mediaFactory(medias)
	const PhotographerGalleryDOM = gallerySection.getMediaGallery()
	console.log('medias du photographe :', medias)
	console.log('gallerySection :', gallerySection)
}

async function init() {
	// Récupère les datas du photographe
	const { photographerInfos, medias } = await getPhotographerInfos()
	displayData(photographerInfos, medias)
}

init()
