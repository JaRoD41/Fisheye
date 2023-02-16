class PriceLikesTabFactory {
	constructor(photographerPrice, totalLikes) {
		this.photographerPrice = photographerPrice
		this.totalLikes = totalLikes
	}
	createPriceRateTab() {
		const photographerTab = document.querySelector('.ratePriceLabel')
		const container = document.createElement('div')
		const likesSpan = document.createElement('span')
		const likesImg = document.createElement('img')
		const priceSpan = document.createElement('span')

		likesSpan.textContent = this.totalLikes
		likesSpan.classList.add('totalLikes')
		likesImg.setAttribute('aria-label', 'nombre total de likes du photographe')
		likesImg.setAttribute('src', '../../assets/icons/black-heart.svg')
		priceSpan.textContent = `${this.photographerPrice}€/jour`

		container.appendChild(likesSpan)
		container.appendChild(likesImg)
		photographerTab.appendChild(container)
		photographerTab.appendChild(priceSpan)
	}
}
