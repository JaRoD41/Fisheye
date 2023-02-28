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
	const filterMenu = document.getElementById('filter-menu')
	const selectorsList = document.querySelectorAll('.dropdown-filter li')

	//event listener pour clic sur le bouton de tri
	selectElement.addEventListener('click', () => {
		if (dropdown.classList.contains('active') && dropdown.getAttribute('style') === 'height: 150px;') {
			dropdown.classList.remove('active')
			dropdown.setAttribute('style', '')
			selectElement.setAttribute('aria-expanded', false)
		} else {
			selectElement.setAttribute('aria-expanded', true)
			dropdown.classList.toggle('active')
			dropdown.setAttribute('style', 'height: 150px;')
		}

		//event listener pour clic sur un des choix de tri
		filterMenu.addEventListener('click', (event) => {
			gallery.innerHTML = ''
			dropdown.setAttribute('style', '')

			//récupération de la valeur de l'option choisie
			const selectedListItem = event.target.closest('li')
			const option = selectedListItem.getAttribute('data-filter-value')

			//ajout de la classe selected sur l'option choisie
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

async function init() {
	// Récupère les datas du photographe
	const { photographerInfos, medias } = await getMedias()
	displayData(photographerInfos, medias)
}

init()
