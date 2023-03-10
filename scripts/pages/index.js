async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')
  // Itère sur chaque photographe dans les données récupérées pour créer une card
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
