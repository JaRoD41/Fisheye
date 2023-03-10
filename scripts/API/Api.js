let url = new URL(location.href) // création d'un nouvel objet URL à partir de l'URL de la page
let photographerPageId = url.searchParams.get('id') // récupération de l'id du photographe dans l'URL

// Fonction de récupération des données et médias de chaque photographe
async function getMedias() {
  let photographerInfos = []
  let arrayOfPhotographers = []
  let arrayOfMedias = []
  await fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      arrayOfPhotographers = data.photographers // filtre pour récupérer les infos du photographe contenu dans l'id de l'url
      photographerInfos = arrayOfPhotographers.filter((person) => {
        return person.id == photographerPageId
      })
      arrayOfMedias = data.media
      medias = arrayOfMedias.filter((media) => {
        return media.photographerId == photographerPageId
      })
    })
  // On retourne le tableau photographerInfos et medias une fois récupéré
  return {
    photographerInfos: photographerInfos[0],
    medias: medias,
  }
}

// Fonction de récupération des différents photographes
async function getPhotographers() {
  let photographers = []
  await fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      photographers = data.photographers
    })

  // On retourne le tableau photographers une fois récupéré
  return {
    photographers: [...photographers],
  }
}
