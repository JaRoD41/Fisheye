let url = new URL(location.href) // declare an variable to pick the actual URL
let photographerPageId = url.searchParams.get('id') // get the id of the photographer from the URL
let medias = []
let sortedMedias = []
let eachMedia = []

async function displayData(photographerInfos, medias) {
	let totalLikes = []
	const photographerPrice = photographerInfos.price
	const gallery = document.querySelector('.photograph-gallery')
	const dropdown = document.querySelector('.dropdown-filter')
	const selectElement = document.getElementById('filter-button')
	const filterMenu = document.getElementById('filter-menu')
	const selectorsList = document.querySelectorAll('.dropdown-filter li')

	//event listener pour le filtre
	selectElement.addEventListener('click', () => {
		if (dropdown.classList.contains('active') && dropdown.getAttribute('style') === 'height: 150px;') {
			// selectElement.classList.remove('selected')
			dropdown.classList.remove('active')
			dropdown.setAttribute('style', '')
			selectElement.setAttribute('aria-expanded', false)
		} else {
			// selectElement.classList.add('selected')
			selectElement.setAttribute('aria-expanded', true)
			dropdown.classList.toggle('active')
			dropdown.setAttribute('style', 'height: 150px;')
		}

		filterMenu.addEventListener('click', (event) => {
			gallery.innerHTML = ''
			const selectedListItem = event.target.closest('li')
			dropdown.setAttribute('style', '')
			const option = selectedListItem.getAttribute('data-filter-value')
			const selectorsArray = Array.from(selectorsList)
			const choice = selectorsArray.find(selector => selector.getAttribute('data-filter-value') === option)
			if (selectedListItem.classList.contains('selected') && dropdown.classList.contains('active')) {
				selectedListItem.classList.remove('selected')
			} else {
				selectorsArray.forEach(selector => selector.classList.remove('selected'))
				selectedListItem.classList.add('selected')
				dropdown.classList.remove('active')
			}
			console.log("option choisie :", option)
			console.log("selectors :", selectorsList);
			console.log("choice :", choice);

			sortedMedias = sort(medias, option)

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
	//fin de l'event listener
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

	const priceTab = new PriceLikesTabFactory(photographerPrice)
	priceTab.createPriceRateTab()
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
