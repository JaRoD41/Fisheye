const lightbox = document.getElementById('lightbox_modal')
const galleryWrapper = document.getElementById('gallery-container')
const lightboxCloseBtn = document.getElementById('lightbox-close')
const prevButton = document.getElementById('lightbox-prev')
const nextButton = document.getElementById('lightbox-next')
const mediaToShow = document.getElementById('lightbox-media')

prevButton.addEventListener('click', showPreviousMedia)
nextButton.addEventListener('click', showNextMedia)

// ouverture de la lightbox

function displayLightbox(media) {
	lightbox.style.display = 'flex'
	galleryWrapper.setAttribute('aria-hidden', 'true')
	lightbox.setAttribute('aria-hidden', 'false')
	document.body.classList.add('no-scroll')
	// affichage du média en cours
	console.log('media :', media)
	lightboxCloseBtn.focus()
}

// fermeture de la lightbox

function closeLightbox() {
	lightbox.style.display = 'none'
	galleryWrapper.setAttribute('aria-hidden', 'false')
	lightbox.setAttribute('aria-hidden', 'true')
	document.body.classList.remove('no-scroll')
}

// navigation de la lightbox

function showPreviousMedia() {
	console.log('image précédente')
}

function showNextMedia() {
	console.log('image suivante')
}
