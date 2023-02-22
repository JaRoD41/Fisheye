class Likes {
	constructor(eachLike, totalLikes) {
		// 	constructor(url, amountOfLikes, totalAmountOfLikes)
		this.url = 'http://127.0.0.1:5500/assets/icons/red-heart.svg'
		this.eachLike = eachLike
		this.totalLikes = totalLikes
		this.likesSpan = document.getElementById('totalLikes')
	}

	add(totalLikes) {
		const heartsList = document.querySelectorAll('.red-like')

		this.likesSpan.textContent = this.totalLikes
		heartsList.forEach((likeIcon) => {
			if (likeIcon.src == this.url) {
				likeIcon.addEventListener('click', (e) => {
					e.preventDefault()
					const likeClick = e.currentTarget

					const amountOfLikes =
						likeClick.closest('.photo_likes').firstElementChild
					// console.log('redLikeIcon', likeIcon)
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
			}
		})
	}
}
