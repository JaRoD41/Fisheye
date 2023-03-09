let displayedLikes = []
let heartsList
let nouveauTotalDeLikes

function addLikeListeners() {
  const likesSpan = document.getElementById('totalLikes')
  const totalLikes = getTotalLikes(medias)
  likesSpan.textContent = totalLikes
  heartsList = document.querySelectorAll('.red-like')
  heartsList.forEach((likeIcon) => {
    likeIcon.addEventListener('click', (e) => {
      e.preventDefault()
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

function addAllLikes(total, num) {
  return total + num
}

function getTotalLikes(medias) {
  let likesArray = []
  medias.forEach((eachMedia) => {
    likesArray.push(eachMedia.likes)
  })
  return likesArray.reduce(addAllLikes)
}
