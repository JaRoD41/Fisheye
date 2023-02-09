const lightbox = document.getElementById('lightbox_modal')
const galleryWrapper = document.getElementById('gallery-container')
const displayZone = document.getElementById('lightbox-media')
const lightboxCloseBtn = document.getElementById('lightbox-close')
const prevButton = document.getElementById('lightbox-prev')
const nextButton = document.getElementById('lightbox-next')
const mediaToShow = document.getElementsByClassName('single_media')

// Tableau pour stocker les URL des médias
const mediaUrls = [];

for (let i = 0; i < mediaToShow.length; i++) {
	mediaUrls.push(mediaToShow[i].getAttribute('data-full-media'))
	mediaToShow[i].addEventListener('click', (e) => {
		const fullMediaUrl = e.currentTarget.getAttribute('data-full-media')
		console.log(fullMediaUrl)
		displayLightbox(fullMediaUrl, mediaUrls, i)
	})
}

prevButton.addEventListener('click', () =>
	showPreviousMedia(mediaUrls, displayZone)
)
nextButton.addEventListener('click', () =>
	showNextMedia(mediaUrls, displayZone)
)

// ouverture de la lightbox

function displayLightbox(fullMediaUrl) {
	lightbox.style.display = 'flex'
	galleryWrapper.setAttribute('aria-hidden', 'true')
	lightbox.setAttribute('aria-hidden', 'false')
	document.body.classList.add('no-scroll')
	// affichage du média en cours
	displayZone.src = fullMediaUrl
	lightboxCloseBtn.focus()
	// Sauvegarde de l'index courant pour la navigation
	lightbox.dataset.currentIndex = currentIndex
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
