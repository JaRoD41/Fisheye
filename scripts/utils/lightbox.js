const lightbox = document.getElementById('lightbox_modal')
const galleryWrapper = document.getElementById('gallery-container')
const displayZone = document.getElementById('lightbox-media')
const lightboxCloseBtn = document.getElementById('lightbox-close')
const prevButton = document.getElementById('lightbox-prev')
const nextButton = document.getElementById('lightbox-next')
const mediaToShow = document.getElementsByClassName('mediaItem')

// Tableau pour stocker les URL des médias
const mediaUrls = []
let currentMediaIndex = 0

const collection = document.getElementsByClassName('gallery_item')
for (let i = 0; i < collection.length; i++) {
	console.log(collection[i])
}

// const arrayToTest = Array.of(collection)
// for(let i = 0; i < arrayToTest.length; i++) {
// 	console.log(arrayToTest[i])
// }

for (let i = 0; i < mediaToShow.length; i++) {
	const media = mediaToShow[i]
	const fullMediaUrl = media.getAttribute('data-full-media')
	mediaUrls.push(fullMediaUrl)
	media.addEventListener('click', () => {
		displayLightbox(fullMediaUrl, mediaUrls, i)
	})
}

prevButton.addEventListener('click', () =>
	showPreviousMedia(mediaUrls, displayZone, currentMediaIndex)
)
nextButton.addEventListener('click', () =>
	showNextMedia(mediaUrls, displayZone, currentMediaIndex)
)

// ouverture de la lightbox

function displayLightbox(fullMediaUrl, mediaUrls, index) {
	lightbox.style.display = 'flex'
	galleryWrapper.setAttribute('aria-hidden', 'true')
	lightbox.setAttribute('aria-hidden', 'false')
	document.body.classList.add('no-scroll')
	// affichage du média en cours
	if (!displayZone) {
		console.error("La source d'affichage n'est pas définie.")
		return
	}
	displayZone.src = fullMediaUrl
	lightboxCloseBtn.focus()
	// Sauvegarde de l'index courant pour la navigation
	currentMediaIndex = index
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
