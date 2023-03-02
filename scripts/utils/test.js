// const dropdown = document.querySelector('.dropdown-filter')
// const filterButton = document.querySelector('#filter-button')
const filterMenu = document.querySelector('#filter-menu')
const sortSelectors = document.querySelectorAll('.sort-selector')

// Add event listener to the filter button
selectElement.addEventListener('click', () => {
	if (selectElement.getAttribute('aria-expanded') === 'false') {
		selectElement.setAttribute('aria-expanded', 'true')
		filterMenu.setAttribute('aria-hidden', 'false')
		filterMenu.focus()
	} else {
		selectElement.setAttribute('aria-expanded', 'false')
		filterMenu.setAttribute('aria-hidden', 'true')
	}
})

// Add event listener to each sort selector
sortSelectors.forEach((selector) => {
	selector.addEventListener('click', () => {
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
	})
})
