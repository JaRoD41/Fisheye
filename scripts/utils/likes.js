let displayedLikes = []
let heartsList
let nouveauTotalDeLikes

// Ajout des likes de chaque média et incrémentation / décrémentation au clic
function addLikeListeners() {
  const likesSpan = document.getElementById('totalLikes')
  const totalLikes = getTotalLikes(medias)
  likesSpan.textContent = totalLikes
  heartsList = document.querySelectorAll('.red-like')
  heartsList.forEach((likeIcon) => {
    likeIcon.addEventListener('click', (e) => {
      e.preventDefault()
      // voir pour écouter la touche entrée et la barre d'espace pour ajouter un like
      const likeClick = e.currentTarget
      const amountOfLikes = likeClick.closest('.photo_likes').firstElementChild
      if (likeIcon.classList.contains('isLiked')) {
        amountOfLikes.innerHTML = Number(amountOfLikes.innerHTML) - 1
        likeIcon.classList.remove('isLiked')
      } else {
        amountOfLikes.innerHTML = Number(amountOfLikes.innerHTML) + 1
        likeIcon.classList.add('isLiked')
      }
      scanActualLikes()
      likesSpan.textContent = nouveauTotalDeLikes
    })
  })
}

// Fonction de scan des likes affichés et calcul du nouveau total de l'encart en temps réel
function scanActualLikes() {
  let totalDisplayedLikes = []
  heartsList = document.querySelectorAll('.red-like')
  heartsList.forEach((likeIcon) => {
    const amountOfLikes = likeIcon.closest('.photo_likes').firstElementChild
    let newRealTimeLikes = Number(amountOfLikes.innerHTML)
    totalDisplayedLikes.push(newRealTimeLikes)
    nouveauTotalDeLikes = totalDisplayedLikes.reduce(addAllLikes)
    return nouveauTotalDeLikes
  })
}

// Fonction de calcul du total de likes
function addAllLikes(total, num) {
  return total + num
}

// Fonction de récupération des likes de chaque média des datas d'origine
function getTotalLikes(medias) {
  let likesArray = []
  medias.forEach((eachMedia) => {
    likesArray.push(eachMedia.likes)
  })
  return likesArray.reduce(addAllLikes)
}
