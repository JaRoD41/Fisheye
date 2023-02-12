const lightbox = document.getElementById('lightbox_modal')
const galleryWrapper = document.getElementById('gallery-container')
const displayZone = document.getElementById('lightbox-media')
const mediaName = document.getElementById('media-name')
const lightboxCloseBtn = document.getElementById('lightbox-close')
const prevButton = document.getElementById('lightbox-prev')
const nextButton = document.getElementById('lightbox-next')
const galleryItems = document.querySelectorAll(
	'img.single_media',
	'video.single_media'
)

// Tableau pour stocker les URL des médias
let mediaUrls = []

let mediaId
let mediaToShow
let mediaSrc
let currentMediaIndex 

prevButton.addEventListener('click', () =>
	showPreviousMedia(mediaUrls, displayZone, currentMediaIndex)
)
nextButton.addEventListener('click', () =>
	showNextMedia(mediaUrls, displayZone, currentMediaIndex)
)

async function getMediasInfos() {
	await fetch('../../data/photographers.json')
		.then((res) => res.json())
		.then((data) => {
			mediasToFilter = data.media
			medias = mediasToFilter.filter((media) => {
				return media.photographerId == photographerPageId
			})
		})

	return {
		medias: medias,
	}
}

//fonction de filtrage des médias par id
function showMedia(id) {
	mediaId = medias.filter((m) => m.id == id)
	return mediaId
}

function getTheCurrentIndexOfTheMedia() {
	currentMediaIndex = mediaUrls.filter((elmt) => elmt.id == mediaId)
	return currentMediaIndex
}

function createMediasArray() {
	mediaUrls = []
	for (let i = 0; i < medias.length; i++) {
		mediaUrls.push(medias[i])
	}
	return mediaUrls
}

// ouverture de la lightbox

function displayLightbox(mediaId) {
	//choix du media grace à l'id passé en paramètre
	let pickedMedia = showMedia(mediaId)

	//création du média à afficher grace à la méthode createLightboxMediaElement()
	mediaToShow = new LightboxFactory(pickedMedia[0])
	mediaSrc = mediaToShow.createLightboxMediaElement()
	// mediaId = mediaToShow.id

	lightbox.style.display = 'flex'
	galleryWrapper.setAttribute('aria-hidden', 'true')
	lightbox.setAttribute('aria-hidden', 'false')
	document.body.classList.add('no-scroll')
	// affichage du média en cours
	createMediasArray()

	//ajout du titre du média affiché
	mediaName.textContent = mediaToShow.title
	displayZone.appendChild(mediaSrc)
	lightboxCloseBtn.focus()
	// Sauvegarde de l'index courant pour la navigation
	// currentMediaIndex = mediaUrls.findIndex(isTheIndexOfTheMedia)

	console.log('currentMediaIndex :', mediaUrls.findIndex(getTheCurrentIndexOfTheMedia))
	console.log('liste des médias disponibles :', mediaUrls)
	console.log('Media affiché :', mediaId)
}

// fermeture de la lightbox

function closeLightbox() {
	lightbox.style.display = 'none'
	galleryWrapper.setAttribute('aria-hidden', 'false')
	lightbox.setAttribute('aria-hidden', 'true')
	document.body.classList.remove('no-scroll')
	mediaName.textContent = ''
	mediaSrc.remove()
	// clearLightboxElement()
}

// navigation de la lightbox

function showPreviousMedia(mediaUrls, displayZone, currentMediaIndex) {
	// vérifie que l'index courant n'est pas déjà à 0 (premier média)
	if (currentMediaIndex > 0) {
		// décrémente l'index courant
		currentMediaIndex--
		// affiche la média correspondante à l'index courant
		displayZone.src = mediaUrls[currentMediaIndex]
	}
}

function showNextMedia(mediaUrls, displayZone, currentMediaIndex) {
	if (currentMediaIndex < mediaUrls.length - 1) {
		currentMediaIndex++
		displayZone.src = mediaUrls[currentMediaIndex]
	}
}
