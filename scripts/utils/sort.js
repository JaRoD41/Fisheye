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
