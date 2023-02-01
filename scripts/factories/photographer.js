function photographerFactory(data) {
	const { name, portrait, id, city, country, tagline, price } = data

	const picture = `assets/photographers/Photographers ID Photos/${portrait}`
	const cityName = `${city}, ${country}`
	const tag = tagline
	const rate = `${price}€/jour`

	function getUserCardDOM() {
		const article = document.createElement('article')
		const anchor = document.createElement('a')
		anchor.href = `../../photographer.html?id=${id}`
		const img = document.createElement('img')
		img.ariaLabel = `portrait du photographe ${name}`
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
		const dayRate = document.createElement('span')
		dayRate.classList.add('rate')
		dayRate.textContent = rate
		anchor.appendChild(img)
		anchor.appendChild(h2)
		article.appendChild(anchor)
		article.appendChild(aside)
		aside.appendChild(home)
		aside.appendChild(sentence)
		aside.appendChild(dayRate)

		return article
	}

	function getPhotographerHeader() {
		const fiche = document.querySelector('.photograph-header')
		fiche.innerHTML = `
			<aside class="infos">
				<div class="infos-name">
        <h1>${name}</h1>
				</div>	
        <span class="origin">${city}, ${country}</span>
        <span class="tagline">${tagline}</span>
			</aside>	
      <button class="contact_button" onclick='displayModal()'>Contactez-moi</button>
      <img aria-label="portrait du photographe ${name}" src="${picture}">
		`
		
		const nameForm = document.querySelector('.namePhotographForm')
		nameForm.innerHTML =`${name}`

		return fiche
	}

	

	return {
		name,
		picture,
		getUserCardDOM,
		getPhotographerHeader,
	}
}
