function photographerFactory(data) {
  const { name, portrait, id, city, country, tagline, price } = data
  // Destructuring de la data récupérée par le fetch dans le fichier Api.js
  const picture = `./assets/photographers/Photographers ID Photos/${portrait}`
  const cityName = `${city}, ${country}`
  const tag = tagline
  const rate = `${price}€/jour`
  // Création de la section contenant les cards des photographes
  function getUserCardDOM() {
    const article = document.createElement('article')
    const anchor = document.createElement('a')
    anchor.href = `./photographer.html?id=${id}`
    anchor.ariaLabel = `portrait du photographe ${name}`
    const img = document.createElement('img')
    img.setAttribute('alt', '')
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

  // Création de la section contenant le header de la galerie avec les infos du photographe
  function getPhotographerHeader() {
    const fiche = document.querySelector('.photograph-header')
    fiche.innerHTML = `
			<aside class="infos" aria-labelledby='aside-title'>
				<div class="infos-name">
        <h1 id='aside-title'>${name}</h1>
				</div>	
        <span class="origin">${city}, ${country}</span>
        <span class="tagline">${tagline}</span>
			</aside>	
      <button class="contact_button" aria-label="cliquer pour ouvrir le formulaire de contact" onclick='displayModal()'>Contactez-moi</button>
      <img alt="portrait du photographe ${name}" src="${picture}">
		`
    // Insertion du nom du photographe dans le formulaire de contact
    const nameForm = document.querySelector('.namePhotographForm')
    nameForm.innerHTML = `${name}`

    return fiche
  }

  return {
    name,
    picture,
    getUserCardDOM,
    getPhotographerHeader,
  }
}
