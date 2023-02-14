const lightbox = document.getElementById('lightbox_modal')
const galleryWrapper = document.getElementById('gallery-container')
const displayZone = document.getElementById('lightbox-media')
const mediaName = document.getElementById('media-name')
const lightboxCloseBtn = document.getElementById('lightbox-close')
const prevButton = document.getElementById('lightbox-prev')
const nextButton = document.getElementById('lightbox-next')
// const galleryItems = document.querySelectorAll('.single_media')
// console.log('test array medias affichés :', galleryItems)

// Tableau pour stocker les URL des médias
let mediaUrls = []

let mediaId
let mediaToShow
let mediaSrc
let currentMediaIndex
let pickedMedia
let length

prevButton.addEventListener('click', () =>
	showPreviousMedia(medias, currentMediaIndex)
)

nextButton.addEventListener('click', () =>
	showNextMedia(medias, currentMediaIndex)
)

// --- ecoute des fleches gauche et droite à tester ---

// document.addEventListener('keydown', function (e) {
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
			// currentMediaIndex = medias.indexOf(mediaId)
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

// currentMediaIndex = medias.indexOf(mediaId)
// function getTheCurrentIndexOfTheMedia() {
// 	currentMediaIndex = mediaUrls.filter((elmt) => elmt.id === mediaId)
// 	return currentMediaIndex
// }

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
	// mediaToShow = new LightboxFactory(pickedMedia)
	mediaToShow = new LightboxFactory(medias, currentMediaIndex)
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

	console.log('currentMediaIndex :', currentMediaIndex)
	console.log('liste des médias disponibles :', medias)
	console.log('media affiché (pickedMedia) :', pickedMedia)
	console.log('media précédent :', medias[currentMediaIndex - 1])
	console.log('media suivant :', medias[currentMediaIndex + 1])
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

function showPreviousMedia(medias, currentMediaIndex) {
	length = medias.length
	// // vérifie que l'index courant n'est pas déjà à 0 (premier média)
	// if (currentMediaIndex > 0) {
	// 	// décrémente l'index courant
	// 	currentMediaIndex--
	// 	// affiche la média correspondante à l'index courant
	// 	displayZone.src = mediaUrls[currentMediaIndex]
	// }
	console.log('currentMediaIndex :', currentMediaIndex)

	// console.log('nouveau currentMediaIndex', currentMediaIndex)

	if (currentMediaIndex === 0) {
		currentMediaIndex === length - 1
	} else {
		currentMediaIndex--
	}
	return currentMediaIndex
}

function showNextMedia(medias, currentMediaIndex) {
	length = medias.length
	// if (currentMediaIndex < mediaUrls.length - 1) {
	// 	currentMediaIndex++
	// 	displayZone.src = mediaUrls[currentMediaIndex]
	// }
	console.log('currentMediaIndex :', currentMediaIndex)

	currentMediaIndex == length - 1
		? (currentMediaIndex = 0)
		: currentMediaIndex++
	return currentMediaIndex
	// displayLightbox()
}
