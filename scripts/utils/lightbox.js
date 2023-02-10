const lightbox = document.getElementById('lightbox_modal')
const galleryWrapper = document.getElementById('gallery-container')
const displayZone = document.getElementById('lightbox-media')
const lightboxCloseBtn = document.getElementById('lightbox-close')
const prevButton = document.getElementById('lightbox-prev')
const nextButton = document.getElementById('lightbox-next')
const galleryItems = document.querySelectorAll(
	'img.single_media',
	'video.single_media'
)

// Tableau pour stocker les URL des médias
const mediaUrls = []
let mediaId
let mediaToShow
let currentMediaIndex = 0

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
			mediaUrls = data.media
			medias = mediaUrls.filter((media) => {
				return media.photographerId == photographerPageId
			})
		})
		
	return {
		medias: medias,
	}
}

function showMedia(id) {
	let lightboxMedia = medias.filter((m) => m.id == id)
	return lightboxMedia
}
// ouverture de la lightbox

function displayLightbox(mediaId) {
	let pickedMedia = showMedia(mediaId)
	mediaToShow = pickedMedia[0].image
	lightbox.style.display = 'flex'
	galleryWrapper.setAttribute('aria-hidden', 'true')
	lightbox.setAttribute('aria-hidden', 'false')
	document.body.classList.add('no-scroll')
	// affichage du média en cours
	if (!displayZone) {
		console.error("La source d'affichage n'est pas définie.")
		return
	}
	console.log('test fonction lightbox OK / id du média cliqué :', mediaId)
	console.log('media to show :', mediaToShow)
	displayZone.innerHTML = `${mediaToShow}`
	lightboxCloseBtn.focus()
	// Sauvegarde de l'index courant pour la navigation
	// currentMediaIndex = index
}

// fermeture de la lightbox

function closeLightbox() {
	lightbox.style.display = 'none'
	galleryWrapper.setAttribute('aria-hidden', 'false')
	lightbox.setAttribute('aria-hidden', 'true')
	document.body.classList.remove('no-scroll')
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
