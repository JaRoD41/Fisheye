class PriceLikesTabFactory {
  constructor(photographerPrice) {
    this.photographerPrice = photographerPrice
  }
  createPriceRateTab() {
    const photographerTab = document.querySelector('.ratePriceLabel')
    const container = document.createElement('div')
    const likesSpan = document.createElement('span')
    const likesImg = document.createElement('img')
    const priceSpan = document.createElement('span')

    container.classList.add('likeTab')

    likesSpan.textContent = this.totalLikes
    likesSpan.classList.add('totalLikes')
    likesSpan.setAttribute('id', 'totalLikes')
    likesImg.setAttribute('aria-label', 'nombre total de likes du photographe')
    likesImg.setAttribute('src', './assets/icons/black-heart.svg')
    priceSpan.textContent = `${this.photographerPrice}€/jour`

    container.appendChild(likesSpan)
    container.appendChild(likesImg)
    photographerTab.appendChild(container)
    photographerTab.appendChild(priceSpan)
  }
}
