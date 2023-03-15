class PriceLikesTabFactory {
  constructor(photographerPrice, photographerName) {
    this.photographerPrice = photographerPrice
    this.photographerName = photographerName
  }
  // Création de l'encart fixe contenant le nombre total de likes et le prix du photographe
  createPriceRateTab() {
    const photographerTab = document.querySelector('.ratePriceLabel')
    const container = document.createElement('div')
    const likesSpan = document.createElement('span')
    const likesImg = document.createElement('img')
    const priceSpan = document.createElement('span')

    container.setAttribute('id', 'likeTab')

    photographerTab.setAttribute('tabindex', '1')
    photographerTab.setAttribute(
      'aria-label',
      `nombre total de likes et tarif journalier du photographe ${this.photographerName}`
    )

    likesSpan.textContent = this.totalLikes
    likesSpan.classList.add('totalLikes')
    likesSpan.setAttribute('id', 'totalLikes')
    this.allLikes = totalLikes
    likesImg.setAttribute('aria-label', `${this.photographerName} totalise ${this.allLikes} likes`)
    likesImg.setAttribute('src', './assets/icons/black-heart.svg')
    priceSpan.setAttribute('id', 'priceSpan')
    priceSpan.textContent = `${this.photographerPrice}€/jour`
    priceSpan.setAttribute(
      'aria-label',
      `tarif du photographe ${this.photographerName}: ${this.photographerPrice}€/jour`
    )

    container.appendChild(likesSpan)
    container.appendChild(likesImg)
    photographerTab.appendChild(container)
    photographerTab.appendChild(priceSpan)
  }
}
