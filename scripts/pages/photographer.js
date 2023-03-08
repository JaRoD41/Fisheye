let url = new URL(location.href) // création d'un nouvel objet URL à partir de l'URL de la page
let photographerPageId = url.searchParams.get('id') // récupération de l'id du photographe dans l'URL
window.medias = []
let sortedMedias = []
let eachMedia = []

const sortSelectors = document.querySelectorAll('.sort-selector')
const buttonTitle = document.getElementById('sort-name')

//tri par défaut -> popularité
const defaultOption = 'Popularité'
buttonTitle.textContent = defaultOption

//récupération des données du photographe pour affichage
async function displayData(photographerInfos, medias) {
  let totalLikes = []
  const photographerPrice = photographerInfos.price
  const gallery = document.querySelector('.photograph-gallery')
  const dropdown = document.querySelector('.dropdown-filter')
  const selectElement = document.getElementById('filter-button')
  const arrow = document.querySelector('.arrowSort')

  const filterMenu = document.getElementById('filter-menu')
  const sortSelectors = document.querySelectorAll('.sort-selector')

  //event listener pour clic sur le bouton de tri

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

    //test conditions supplementaires pour le focus

    if (selectElement.getAttribute('aria-expanded') === 'false') {
      selectElement.setAttribute('aria-expanded', 'true')
      filterMenu.setAttribute('aria-hidden', 'false')
      filterMenu.focus()
    } else {
      selectElement.setAttribute('aria-expanded', 'false')
      filterMenu.setAttribute('aria-hidden', 'true')
    }

    //event listener pour clic sur un des choix de tri
    sortSelectors.forEach((selector) => {
      selector.addEventListener('click', () => {
        gallery.innerHTML = ''
        dropdown.setAttribute('style', '')
        arrow.classList.remove('active')
        const option = selector.getAttribute('data-filter-value')

        // Set 'aria-selected' to 'true' for the clicked option and 'false' for the others
        sortSelectors.forEach((s) => s.setAttribute('aria-selected', 'false'))
        selector.setAttribute('aria-selected', 'true')
        if (
          selector.classList.contains('selected') &&
          dropdown.classList.contains('active')
        ) {
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

        // Set the button title to the selected option
        buttonTitle.textContent = option

        //tri des médias
        sortedMedias = sort(medias, option)

        //affichage des médias triés
        sortedMedias.forEach((eachMedia, currentMediaIndex) => {
          eachMedia = eachMedia
          const totalLikes = getTotalLikes(medias)
          const gallerySection = new Media(
            eachMedia,
            photographerPrice,
            totalLikes,
            currentMediaIndex
          )
          gallerySection.getMediaGallery()
        })
        addLikeListeners()
      })
      //fin du deuxième event listener
    })
    //fin du premier event listener
  })
  sortedMedias = sort(medias, defaultOption)
  sortedMedias.forEach((eachMedia, currentMediaIndex) => {
    eachMedia = eachMedia
    totalLikes = getTotalLikes(medias)
    const gallerySection = new Media(
      eachMedia,
      photographerPrice,
      totalLikes,
      currentMediaIndex
    )
    gallerySection.getMediaGallery()
  })

  //affichage de l'encart avec les likes et le tarif du photographe
  const priceTab = new PriceLikesTabFactory(photographerPrice)
  priceTab.createPriceRateTab()

  //affichage de l'encart avec les infos du photographe
  const photographerSection = photographerFactory(photographerInfos)
  photographerSection.getPhotographerHeader()
  addLikeListeners()
}

async function init() {
  // Récupère les datas du photographe
  const { photographerInfos, medias } = await getMedias()
  displayData(photographerInfos, medias)
}

init()
