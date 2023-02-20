class Likes {
	constructor(id, amountOfLikes, totalAmountOfLikes) {
		this.id = id
		this.amountOfLikes = amountOfLikes
		this.totalAmountOfLikes = totalAmountOfLikes
		this.redLikeIcon = document.querySelector(`.red-like[id="${this.id}"]`)
	}

	getTotalLikes() {
		let likesSpan = document.getElementById('totalLikes')

		likesSpan.textContent = this.totalAmountOfLikes
	}

	add() {
		const heartsList = document.querySelectorAll('.red-like')
		heartsList.forEach((likeIcon) => {
			const likesContainer = likeIcon.parentElement
			const totalOfLikes = likesContainer.querySelector('.likes-counter')
			likeIcon.addEventListener('click', (e) => {
				e.preventDefault()
				// console.log('amountOfLikes', this.amountOfLikes);

				// Likes.add(amountOfLikes, redLikeIcon)
			})
			// if (redLikeIcon.classList.contains('isLiked')) {
			// 	amountOfLikes.textContent = Number(amountOfLikes.textContent) - 1
			// 	totalAmountOfLikes.textContent =
			// 		Number(totalAmountOfLikes.textContent) - 1
			// 	redLikeIcon.classList.remove('isLiked')
			// } else {
			// 	amountOfLikes.textContent = Number(amountOfLikes.textContent) + 1
			// 	totalAmountOfLikes.innerHTML =
			// 		Number(totalAmountOfLikes.innerHTML) + 1
			// 	redLikeIcon.classList.add('isLiked')
			// }
		})
	}
}
