class Likes {
	constructor(eachLike, totalLikes) {
		this.eachLike = eachLike
		this.totalLikes = totalLikes
		this.likesSpan = document.getElementById('totalLikes')
	}

	add() {
		const heartsList = document.querySelectorAll('.red-like')

		this.likesSpan.textContent = this.totalLikes
		heartsList.forEach((likeIcon) => {
			likeIcon.addEventListener('click', (e) => {
				e.preventDefault()
				const likeClick = e.currentTarget

				const amountOfLikes =
					likeClick.closest('.photo_likes').firstElementChild
				console.log('likesSpan', this.likesSpan)
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


// function addLikeListeners() {
// 	const likesSpan = document.getElementById('totalLikes')
	
// 	const heartsList = document.querySelectorAll('.red-like')
// 	heartsList.forEach((likeIcon) => {
// 		likeIcon.addEventListener('click', (e) => {
// 			e.preventDefault()
// 			const likeClick = e.currentTarget
// 			// const totalLikes = getTotalLikes(medias)
// 			const amountOfLikes = likeClick.closest('.photo_likes').firstElementChild
// 			// console.log('redLikeIcon', likeIcon)
// 			if (likeIcon.classList.contains('isLiked')) {
// 				amountOfLikes.innerHTML = Number(amountOfLikes.innerHTML) - 1
// 				likeIcon.classList.remove('isLiked')
// 			} else {
// 				amountOfLikes.innerHTML = Number(amountOfLikes.innerHTML) + 1
// 				likeIcon.classList.add('isLiked')
// 			}

// 			// Recalcule le total des likes et update le DOM
// 			const totalLikes = getTotalLikes(medias)
// 			// console.log('likesSpan', likesSpan)
// 			likesSpan.textContent = totalLikes
// 		})
// 	})
// }

function addAllLikes(total, num) {
	return total + num
}

function getTotalLikes(medias) {
	let likesArray = []
	medias.forEach((eachMedia) => {
		likesArray.push(eachMedia.likes)
	})
	return likesArray.reduce(addAllLikes)
}
