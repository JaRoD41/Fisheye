const lightbox = document.getElementById('lightbox_modal')
const galleryWrapper = document.getElementById('gallery-container')
const displayZone = document.getElementById('lightbox-media')
let mediaName = document.getElementById('media-name')
const lightboxCloseBtn = document.getElementById('lightbox-close')
const prevButton = document.getElementById('lightbox-prev')
const nextButton = document.getElementById('lightbox-next')

let mediaId
let mediaToShow
let mediaSrc
let mediaToCreate
let currentMediaIndex
let pickedMedia
let length

prevButton.addEventListener('click', () => showPreviousMedia(medias))

nextButton.addEventListener('click', () => showNextMedia(medias))

// --- écoute des flèches gauche et droite ---

document.addEventListener('keyup', function (e) {
		if (e.code === 'ArrowLeft') {
			showPreviousMedia(medias)
		}
		if (e.code === 'ArrowRight') {
			showNextMedia(medias)
		}
		if (e.code === 'Escape') {
			closeLightbox()
		}
	})

//fonction de filtrage des médias par id
function showMedia(id) {
	mediaId = medias.filter((m) => m.id == id)
	return mediaId
}

// ouverture de la lightbox

function displayLightbox(mediaId) {
	//choix du media grace à l'id passé en paramètre
	currentMediaIndex = mediaId

	//création du média à afficher grace à la méthode createLightboxMediaElement()

	mediaToShow = new LightboxFactory(medias, currentMediaIndex)
	mediaSrc = mediaToShow.createLightboxMediaElement()

	lightbox.style.display = 'flex'
	galleryWrapper.setAttribute('aria-hidden', 'true')
	lightbox.setAttribute('aria-hidden', 'false')
	document.body.classList.add('no-scroll')

	//ajout du titre du média affiché
	displayZone.innerHTML = ''

	mediaName = mediaToShow.createLightboxMediaName()
	mediaName.textContent = mediaToShow.title

	displayZone.appendChild(mediaSrc)
	displayZone.appendChild(mediaName)

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
