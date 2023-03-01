let url = new URL(location.href) // création d'un nouvel objet URL à partir de l'URL de la page
let photographerPageId = url.searchParams.get('id') // récupération de l'id du photographe dans l'URL
let medias = []
let sortedMedias = []
let eachMedia = []

//récupération des données du photographe pour affichage
async function displayData(photographerInfos, medias) {
	let totalLikes = []
	const photographerPrice = photographerInfos.price
	const gallery = document.querySelector('.photograph-gallery')
	const dropdown = document.querySelector('.dropdown-filter')
	const selectElement = document.getElementById('filter-button')
	const arrow = document.querySelector('#filter-button span')

	const filterMenu = document.getElementById('filter-menu')
	const selectorsList = document.querySelectorAll('.dropdown-filter li')
	const option1 = document.getElementById('filter-option1')
	let choiceIndex = 0

	// TEST D'UNE FONCTION DE GESTION DE L'OPTION DE TRI CHOISIE
	function handleSortSelection(event) {
		// Remove the 'sort-1', 'sort-2', and 'sort-3' classes from all options
		selectorsList.forEach((selector) => {
			selector.classList.remove('sort-1', 'sort-2', 'sort-3')
		})

		// Add the appropriate class to the selected option
		const selectedOption = event.target
		if (selectedOption.classList.contains('sort-selector')) {
			selectedOption.classList.add('sort-1')
		}

		// Add the 'sort-2' and 'sort-3' classes to the other options
		selectorsList.forEach((selector) => {
			if (selector !== selectedOption) {
				const classToAdd = selector === selectorsList[0] ? 'sort-2' : 'sort-3'
				selector.classList.add(classToAdd)
			}
		})
	}
	// FIN DU TEST

	//event listener pour clic sur le bouton de tri

	selectElement.addEventListener('click', () => {
		if (
			dropdown.classList.contains('active') &&
			dropdown.getAttribute('style') === 'height: 150px;' &&
			arrow.classList.contains('active')
		) {
			dropdown.classList.remove('active')
			arrow.classList.remove('active')
			dropdown.setAttribute('style', '')
			selectElement.setAttribute('aria-expanded', false)
		} else {
			selectElement.setAttribute('aria-expanded', true)
			dropdown.classList.toggle('active')
			arrow.classList.toggle('active')
			dropdown.setAttribute('style', 'height: 150px;')
		}

		//event listener pour clic sur un des choix de tri
		
		filterMenu.addEventListener('click', (event) => {
			event.preventDefault()
			event.stopPropagation()
			gallery.innerHTML = ''
			dropdown.setAttribute('style', '')
			arrow.classList.remove('active')

			//récupération de la valeur de l'option choisie
			const selectorsArray = Array.from(selectorsList)
			const selectedListItem = event.target.closest('li')
			const option = selectedListItem.getAttribute('data-filter-value')
			// const rank = selectedListItem.getAttribute('data-rank')

			//modification de l'option affichée dans le bouton de tri
			choiceIndex = selectorsArray.indexOf(selectedListItem)
			let rank = choiceIndex + 1
			// option1.classList.remove('sort-1')
			// option1.classList.add(`sort-${rank}`)
			// selectedListItem.classList.remove(`sort-${rank}`)
			// selectedListItem.classList.add('sort-1')
			//ajout de la classe selected sur l'option choisie

			const choice = selectorsArray.find(
				(selector) => selector.getAttribute('data-filter-value') === option
			)
			const isAriaSelected = selectorsArray.find(
				(selector) => selector.getAttribute('aria-selected') === 'true'
			)
			if (
				// isAriaSelected.getAttribute('aria-selected') === 'true' &&
				selectedListItem.classList.contains('selected') &&
				dropdown.classList.contains('active')
			) {
				selectedListItem.classList.remove('selected')
				selectedListItem.setAttribute('aria-selected', false)
			} else {
				selectorsArray.forEach((selector) =>
					selector.classList.remove('selected')
				)
				selectedListItem.classList.add('selected')
				// option1.setAttribute('aria-selected', false)
				// selectedListItem.setAttribute('aria-selected', true)
				dropdown.classList.remove('active')
			}
			console.log('option choisie :', option)
			console.log('choice Index :', choiceIndex)
			console.log('rank :', rank)

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
	//fin de l'event listener

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

// function eventHandler(event) {
// 	if (event.type === 'click') {
// 		sortToggle()
// 		sortChoice(event)
// 	} else if (event.type === 'keydown' && event.code === 'Space') {
// 		console.log('espace')
// 	} else if (event.type === 'keydown' && event.code === 'Enter') {
// 		console.log('entrée')
// 	}
// }

async function init() {
	// Récupère les datas du photographe
	const { photographerInfos, medias } = await getMedias()
	displayData(photographerInfos, medias)
}

init()
