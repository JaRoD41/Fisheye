function photographerFactory(data) {
	const { name, portrait, city, country, tagline, price } = data

	const picture = `assets/photographers/Photographers ID Photos/${portrait}`
	const cityName = `${city}, ${country}`
	const tag = tagline
	const rate = `${price}€/jour`

	function getUserCardDOM() {
		const article = document.createElement('article')
		const anchor = document.createElement('a')
		const img = document.createElement('img')
		img.ariaLabel = 'photo du photographe'
		img.setAttribute('src', picture)
		const h2 = document.createElement('h2')
		h2.textContent = name
		const aside = document.createElement('div')
		aside.classList.add('details')
		const home = document.createElement('span')
		home.classList.add('home')
		home.textContent = cityName
		const sentence = document.createElement('span')
		sentence.classList.add('tag')
		sentence.textContent = tag
		const hourRate = document.createElement('span')
		hourRate.classList.add('rate')
		hourRate.textContent = rate
		article.appendChild(img)
		article.appendChild(h2)
		article.appendChild(aside)
		aside.appendChild(home)
		aside.appendChild(sentence)
		aside.appendChild(hourRate)
		return article
	}
	return { name, picture, getUserCardDOM }
}
