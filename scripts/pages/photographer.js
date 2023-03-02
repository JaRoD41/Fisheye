let url = new URL(location.href) // création d'un nouvel objet URL à partir de l'URL de la page
let photographerPageId = url.searchParams.get('id') // récupération de l'id du photographe dans l'URL
let medias = []
let sortedMedias = []
let eachMedia = []

const sortSelectors = document.querySelectorAll('.sort-selector')
const buttonTitle = document.getElementById('sort-name')

//tri par défaut -> popularité
const defaultOption = 'Popularité'
buttonTitle.textContent = defaultOption

//récupération des données du photographe pour affichage
async function displayData(photographerInfos, medias) {
	let totalLikes = []
	const photographerPrice = photographerInfos.price
	const gallery = document.querySelector('.photograph-gallery')
	const dropdown = document.querySelector('.dropdown-filter')
	const selectElement = document.getElementById('filter-button')
	const arrow = document.querySelector('.arrowSort')

	const filterMenu = document.getElementById('filter-menu')
	const selectorsList = document.querySelectorAll('.dropdown-filter li')
	const option1 = document.getElementById('filter-option1')
	let choiceIndex = 0

	//event listener pour clic sur le bouton de tri

	selectElement.addEventListener('click', () => {
		console.log('clic sur le bouton de tri');
		if (
			selectElement.classList.contains('active') &&
			filterMenu.classList.contains('active') &&
			filterMenu.getAttribute('style') === 'height: 159px;' &&
			arrow.classList.contains('active')
		) {
			selectElement.classList.remove('active')
			filterMenu.classList.remove('active')
			arrow.classList.remove('active')
			filterMenu.setAttribute('style', '')
		} else {
			selectElement.classList.toggle('active')
			filterMenu.classList.toggle('active')
			arrow.classList.toggle('active')
			filterMenu.setAttribute('style', 'height: 159px;')
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

		// -------------- TEST ---------------
		// sortSelectors.forEach((selector) => {
		// 	selector.addEventListener('click', () => {
		// 		console.log('selector :', selector);
		// 	})
		// })
		// ----------------- FIN TEST -----------------
		//event listener pour clic sur un des choix de tri
		//--------------------------------------------
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
			const rank = selectedListItem.getAttribute('data-rank')
			choiceIndex = selectorsArray.indexOf(selectedListItem)
			//modification de l'option affichée dans le bouton de tri

			// option1.classList.remove('sort-1')
			// option1.classList.add(`sort-${rank}`)
			// selectedListItem.classList.remove(`sort-${rank}`)
			// selectedListItem.classList.add('sort-1')
			//ajout de la classe selected sur l'option choisie

			// const choice = selectorsArray.find(
			// 	(selector) => selector.getAttribute('data-filter-value') === option
			// )
			// const isAriaSelected = selectorsArray.find(
			// 	(selector) => selector.getAttribute('aria-selected') === 'true'
			// )
			if (
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
		//fin du deuxième event listener
	})
	//fin du premier event listener

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
