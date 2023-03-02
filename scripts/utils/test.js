let url = new URL(location.href) // création d'un nouvel objet URL à partir de l'URL de la page
let photographerPageId = url.searchParams.get('id') // récupération de l'id du photographe dans l'URL
let medias = []
let sortedMedias = []
let eachMedia = []

//récupération des données du photographe pour affichage
async function displayData(photographerInfos, medias) {
	let totalLikes = []
	const photographerPrice = photographerInfos.price
	const dropdown = document.querySelector('.dropdown-filter')
	const selectElement = document.getElementById('filter-button')
	const arrow = document.querySelector('#filter-button span')
	const filterMenu = document.getElementById('filter-menu')
	const sortSelectors = document.querySelectorAll('.sort-selector')

	//event listener pour clic sur le bouton de tri

	dropdown.addEventListener('click', () => {
		if (
			dropdown.classList.contains('active') &&
			dropdown.getAttribute('style') === 'height: 150px;' &&
			arrow.classList.contains('active')
		) {
			dropdown.classList.remove('active')
			arrow.classList.remove('active')
			dropdown.setAttribute('style', '')
		} else {
			dropdown.classList.toggle('active')
			arrow.classList.toggle('active')
			dropdown.setAttribute('style', 'height: 150px;')
		}
		//test conditions supplementaires pour le focus

		if (selectElement.getAttribute('aria-expanded') === 'false') {
			selectElement.setAttribute('aria-expanded', 'true')
			filterMenu.setAttribute('aria-hidden', 'false')
			filterMenu.focus()
		} else {
			selectElement.setAttribute('aria-expanded', 'false')
			filterMenu.setAttribute('aria-hidden', 'true')
		}

		//--------------------------------------------
		// TEST D'UNE FONCTION DE GESTION DE L'OPTION DE TRI CHOISIE

		// Add event listener to each sort selector
		sortSelectors.forEach((selector) => {
			selector.addEventListener('click', () => {
				const option = selector.getAttribute('data-filter-value')
				// Add 'sort-1' class to the clicked option and remove it from the others
				sortSelectors.forEach((s) => s.classList.remove('sort-1'))
				selector.classList.add('sort-1')

				// Add 'sort-2' class to the other options
				const otherSelectors = Array.from(sortSelectors).filter(
					(s) => s !== selector
				)
				otherSelectors.forEach((s) => s.classList.add('sort-2'))

				// Remove 'sort-2' class from the clicked option
				selector.classList.remove('sort-2')

				// Set 'aria-selected' to 'true' for the clicked option and 'false' for the others
				sortSelectors.forEach((s) => s.setAttribute('aria-selected', 'false'))
				selector.setAttribute('aria-selected', 'true')
				if (
					selector.classList.contains('selected') &&
					dropdown.classList.contains('active')
				) {
					selector.classList.remove('selected')
					selector.setAttribute('aria-selected', false)
				} else {
					sortSelectors.forEach((sel) => sel.classList.remove('selected'))
					selector.classList.add('selected')
					dropdown.classList.remove('active')
				}

				//tri des médias
				sortedMedias = sort(medias, option)

				//affichage des médias triés
				sortedMedias.forEach((eachMedia, currentMediaIndex) => {
					eachMedia = eachMedia
					const totalLikes = getTotalLikes(medias)
					const gallerySection = new Media(
						eachMedia,
						photographerPrice,
						totalLikes,
						currentMediaIndex
					)
					gallerySection.getMediaGallery()
				})
				addLikeListeners()
			})
		})
		// FIN DU TEST
	})
	//fin du premier event listener

	//tri par défaut -> popularité
	const defaultOption = 'popularite'
	sortedMedias = sort(medias, defaultOption)
	sortedMedias.forEach((eachMedia, currentMediaIndex) => {
		eachMedia = eachMedia
		totalLikes = getTotalLikes(medias)
		const gallerySection = new Media(
			eachMedia,
			photographerPrice,
			totalLikes,
			currentMediaIndex
		)
		gallerySection.getMediaGallery()
	})

	//affichage de l'encart avec les likes et le tarif du photographe
	const priceTab = new PriceLikesTabFactory(photographerPrice)
	priceTab.createPriceRateTab()

	//affichage de l'encart avec les infos du photographe
	const photographerSection = photographerFactory(photographerInfos)
	photographerSection.getPhotographerHeader()
	addLikeListeners()
}

async function init() {
	// Récupère les datas du photographe
	const { photographerInfos, medias } = await getMedias()
	displayData(photographerInfos, medias)
}

init()
