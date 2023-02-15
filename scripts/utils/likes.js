const addMediaLikes = (event) => {
	event.preventDefault()
	const redHeart = event.currentTarget

	// Sélectionne le nombre de likes correspondant au coeur
	const likes = redHeart.parentElement.querySelector('.likes')

	likes.textContent = Number(likes.textContent) + 1
}
