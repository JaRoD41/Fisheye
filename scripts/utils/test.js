const sortSelector = document.querySelector('.sort-selector')

sortSelector.addEventListener('change', function () {
	const options = sortSelector.querySelectorAll('option')
	const selectedOption = sortSelector.options[sortSelector.selectedIndex]

	options.forEach((option) => {
		if (option === selectedOption) {
			option.classList.add('sort-1')
			option.setAttribute('aria-selected', true)
		} else {
			option.classList.remove('sort-1')
			option.setAttribute('aria-selected', false)
		}
		if (
			(option !== selectedOption &&
				option.index === sortSelector.selectedIndex - 1) ||
			option.index === sortSelector.selectedIndex + 1
		) {
			option.classList.add('sort-2')
		} else {
			option.classList.remove('sort-2')
		}
		if (
			option !== selectedOption &&
			option.index !== sortSelector.selectedIndex - 1 &&
			option.index !== sortSelector.selectedIndex + 1
		) {
			option.classList.add('sort-3')
		} else {
			option.classList.remove('sort-3')
		}
	})
})
