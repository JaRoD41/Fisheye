function sort(medias, option) {
	switch (option) {
		case 'popularite':
			return medias.sort((a, b) => b.likes - a.likes)
		case 'date':
			return medias.sort((a, b) => new Date(a.date) - new Date(b.date))
		case 'titre':
			return medias.sort((a, b) => a.title.localeCompare(b.title))
		default:
			return medias
	}
}

// TEST avec fonctions sort délocalisées

// function sortToggle() {
// 	if (
// 		dropdown.classList.contains('active') &&
// 		dropdown.getAttribute('style') === 'height: 150px;' &&
// 		arrow.classList.contains('active')
// 	) {
// 		dropdown.classList.remove('active')
// 		arrow.classList.remove('active')
// 		dropdown.setAttribute('style', '')
// 		selectElement.setAttribute('aria-expanded', false)
// 	} else {
// 		selectElement.setAttribute('aria-expanded', true)
// 		dropdown.classList.toggle('active')
// 		arrow.classList.toggle('active')
// 		dropdown.setAttribute('style', 'height: 150px;')
// 	}
// }

// function sortChoice(event) {
// 	event.preventDefault()
// 	event.stopPropagation()
// 	gallery.innerHTML = ''
// 	dropdown.setAttribute('style', '')
// 	arrow.classList.remove('active')
// 	//récupération de la valeur de l'option choisie
// 	const selectedListItem = event.target.closest('li')
// 	const option = selectedListItem.getAttribute('data-filter-value')
// 	const rank = selectedListItem.getAttribute('data-rank')
// 	// selectElement.textContent = ""
// 	// selectElement.textContent = option
// 	//ajout de la classe selected sur l'option choisie
// 	const selectorsArray = Array.from(selectorsList)
// 	const choice = selectorsArray.find(
// 		(selector) => selector.getAttribute('data-filter-value') === option
// 	)
// 	const isAriaSelected = selectorsArray.find(
// 		(selector) => selector.getAttribute('aria-selected') === 'true'
// 	)
// 	if (
// 		// isAriaSelected.getAttribute('aria-selected') === 'true' &&
// 		selectedListItem.classList.contains('selected') &&
// 		dropdown.classList.contains('active')
// 	) {
// 		selectedListItem.classList.remove('selected')
// 		selectedListItem.setAttribute('aria-selected', false)
// 	} else {
// 		selectorsArray.forEach((selector) => selector.classList.remove('selected'))
// 		selectedListItem.classList.add('selected')
// 		// option1.setAttribute('aria-selected', false)
// 		// selectedListItem.setAttribute('aria-selected', true)
// 		dropdown.classList.remove('active')
// 	}
// 	console.log('option choisie :', option)
// 	console.log('selectors :', selectorsList)
// 	console.log('rank :', rank)
// }