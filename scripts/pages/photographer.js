let medias = []
let sortedMedias = []
let eachMedia = []

const sortSelectors = document.querySelectorAll('.sort-selector')
const buttonTitle = document.getElementById('sort-name')

// Tri par défaut -> popularité
const defaultOption = 'Popularité'
buttonTitle.textContent = defaultOption

// Récupération des données du photographe pour affichage
async function displayData(photographerInfos, medias) {
  const photographerPrice = photographerInfos.price
  const photographerName = photographerInfos.name
  const gallery = document.querySelector('.photograph-gallery')
  const dropdown = document.querySelector('.dropdown-filter')
  const selectElement = document.getElementById('filter-button')
  const arrow = document.querySelector('.arrowSort')

  const filterMenu = document.getElementById('filter-menu')
  const sortSelectors = document.querySelectorAll('.sort-selector')

  // Event listener pour clic sur le bouton de tri

  selectElement.addEventListener('click', () => {
    if (
      selectElement.classList.contains('active') &&
      filterMenu.classList.contains('active') &&
      filterMenu.getAttribute('style') === 'height: 159px;' &&
      arrow.classList.contains('active')
    ) {
      selectElement.classList.remove('active')
      filterMenu.classList.remove('active')
      arrow.classList.remove('active')
      filterMenu.setAttribute('style', '')
    } else {
      selectElement.classList.toggle('active')
      filterMenu.classList.toggle('active')
      arrow.classList.toggle('active')
      filterMenu.setAttribute('style', 'height: 159px;')
    }

    // Test conditions supplementaires pour le focus

    if (selectElement.getAttribute('aria-expanded') === 'false') {
      selectElement.setAttribute('aria-expanded', 'true')
      filterMenu.setAttribute('aria-hidden', 'false')
      filterMenu.focus()
    } else {
      selectElement.setAttribute('aria-expanded', 'false')
      filterMenu.setAttribute('aria-hidden', 'true')
    }

    // Event listener pour clic sur un des choix de tri
    sortSelectors.forEach((selector) => {
      ;['click', 'keyup'].forEach((ev) => {
        selector.addEventListener(ev, function (e) {
          if (ev === 'click' || (ev === 'keyup' && e.key === 'Enter')) {
            gallery.innerHTML = ''
            dropdown.setAttribute('style', '')
            arrow.classList.remove('active')
            // Récupère la valeur du tri sélectionné
            const option = selector.getAttribute('data-filter-value')

            // Change les attributs aria-selected des boutons de tri pour indiquer le choix sélectionné
            sortSelectors.forEach((s) => s.setAttribute('aria-selected', 'false'))
            selector.setAttribute('aria-selected', 'true')
            // Change l'attribut aria-activedescendant du bouton de tri pour indiquer le choix sélectionné
            selectedOptionId = selector.getAttribute('id')
            filterMenu.setAttribute('aria-activedescendant', selectedOptionId)
            // Affiche ou masque le menu de tri en fonction de son état
            if (selector.classList.contains('selected') && dropdown.classList.contains('active')) {
              selector.classList.remove('selected')
              selector.setAttribute('aria-selected', false)
            } else {
              sortSelectors.forEach((sel) => sel.classList.remove('selected'))
              selector.classList.add('selected')
              dropdown.classList.remove('active')
            }
            filterMenu.classList.remove('active')
            arrow.classList.remove('active')
            filterMenu.setAttribute('style', '')
            selectElement.classList.remove('active')

            // Donne la valeur du tri sélectionné au bouton de tri
            buttonTitle.textContent = option

            // Tri des médias
            sortedMedias = sort(medias, option)
          }
          // Affichage des médias triés
          sortedMedias.forEach((eachMedia, currentMediaIndex) => {
            eachMedia = eachMedia
            const totalLikes = getTotalLikes(medias)
            const gallerySection = new Media(eachMedia, photographerPrice, totalLikes, currentMediaIndex)
            gallerySection.getMediaGallery()
          })
          addLikeListeners()
        })
      })
      // Fin du deuxième event listener
    })
    // Fin du premier event listener
  })
  sortedMedias = sort(medias, defaultOption)
  sortedMedias.forEach((eachMedia, currentMediaIndex) => {
    eachMedia = eachMedia
    totalLikes = getTotalLikes(medias)
    const gallerySection = new Media(eachMedia, photographerPrice, totalLikes, currentMediaIndex)
    gallerySection.getMediaGallery()
  })

  // Affichage de l'encart avec les likes et le tarif du photographe
  const priceTab = new PriceLikesTabFactory(photographerPrice, photographerName)
  priceTab.createPriceRateTab()

  // Affichage de l'encart avec les infos du photographe
  const photographerSection = photographerFactory(photographerInfos)
  photographerSection.getPhotographerHeader()
  addLikeListeners()
}

async function init() {
  // Récupère les datas du photographe en appelant la fonction getMedias de Api.js
  const { photographerInfos, medias } = await getMedias()
  displayData(photographerInfos, medias)
}

init()
