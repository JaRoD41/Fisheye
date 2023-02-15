const lightbox = document.getElementById('lightbox_modal')
const galleryWrapper = document.getElementById('gallery-container')
const displayZone = document.getElementById('lightbox-media')
const mediaName = document.getElementById('media-name')
const lightboxCloseBtn = document.getElementById('lightbox-close')
const prevButton = document.getElementById('lightbox-prev')
const nextButton = document.getElementById('lightbox-next')

// Tableau pour stocker les URL des médias
let mediaUrls = []

let mediaId
let mediaToShow
let mediaSrc
let mediaToCreate
let currentMediaIndex
let pickedMedia
let length

prevButton.addEventListener('click', () => showPreviousMedia(medias))

nextButton.addEventListener('click', () => showNextMedia(medias))

// --- écoute des flèches gauche et droite à tester ---

// document.addEventListener('keyup', function (e) {
// 		if (e.code === 'ArrowLeft') {
// 			showPreviousMedia()
// 		}
// 		if (e.code === 'ArrowRight') {
// 			showNextMedia()
// 		}
// 	})

async function getMediasInfos() {
	await fetch('../../data/photographers.json')
		.then((res) => res.json())
		.then((data) => {
			mediasToFilter = data.media
			medias = mediasToFilter.filter((media) => {
				media.photographerId == photographerPageId
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
	currentMediaIndex = mediaId
	pickedMedia = medias[mediaId]

	//création du média à afficher grace à la méthode createLightboxMediaElement()

	mediaToShow = new LightboxFactory(medias, currentMediaIndex)
	mediaSrc = mediaToShow.createLightboxMediaElement()


	lightbox.style.display = 'flex'
	galleryWrapper.setAttribute('aria-hidden', 'true')
	lightbox.setAttribute('aria-hidden', 'false')
	document.body.classList.add('no-scroll')
	// affichage du média en cours
	createMediasArray()

	//ajout du titre du média affiché

	displayZone.innerHTML = ''
	displayZone.appendChild(mediaSrc)
	mediaName.textContent = mediaToShow.title
	lightboxCloseBtn.focus()
}

// fermeture de la lightbox

function closeLightbox() {
	lightbox.style.display = 'none'
	galleryWrapper.setAttribute('aria-hidden', 'false')
	lightbox.setAttribute('aria-hidden', 'true')
	document.body.classList.remove('no-scroll')
	mediaName.textContent = ''
	mediaSrc.remove()
}

// navigation de la lightbox

function showPreviousMedia(medias) {
	length = medias.length

	if (currentMediaIndex == 0) {
		currentMediaIndex = length - 1
	} else {
		currentMediaIndex -= 1
	}

	mediaId = currentMediaIndex

	displayLightbox(mediaId)
}

function showNextMedia(medias) {
	length = medias.length

	if (currentMediaIndex == length - 1) {
		currentMediaIndex = 0
	} else {
		currentMediaIndex += 1
	}

	mediaId = currentMediaIndex

	displayLightbox(mediaId)
}
