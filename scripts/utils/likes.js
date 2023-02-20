class Likes {
	constructor(id, amountOfLikes, totalAmountOfLikes) {
		this.id = id
		this.amountOfLikes = amountOfLikes
		this.totalAmountOfLikes = totalAmountOfLikes
		this.redLikeIcon = document.querySelector(`.red-like[id="${this.id}"]`)
		this.likesSpan = document.getElementById('totalLikes')
	}

	add() {
		const heartsList = document.querySelectorAll('.red-like')

		this.likesSpan.textContent = this.totalAmountOfLikes
		heartsList.forEach((likeIcon) => {
			likeIcon.addEventListener('click', (e) => {
				e.preventDefault()
				const likeClick = e.currentTarget

				const amountOfLikes =
					likeClick.closest('.photo_likes').firstElementChild
				console.log('redLikeIcon', likeIcon)
				if (likeIcon.classList.contains('isLiked')) {
					amountOfLikes.innerHTML = Number(amountOfLikes.innerHTML) - 1
					this.likesSpan.textContent = Number(this.likesSpan.textContent) - 1
					likeIcon.classList.remove('isLiked')
				} else {
					amountOfLikes.innerHTML = Number(amountOfLikes.innerHTML) + 1
					this.likesSpan.textContent = Number(this.likesSpan.textContent) + 1
					likeIcon.classList.add('isLiked')
				}
			})
		})
	}
}
