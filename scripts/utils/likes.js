function addLikeListeners() {
  const likesSpan = document.getElementById('totalLikes')
  const totalLikes = getTotalLikes(medias)
  likesSpan.textContent = totalLikes
  const heartsList = document.querySelectorAll('.red-like')
  heartsList.forEach((likeIcon) => {
    likeIcon.addEventListener('click', (e) => {
      e.preventDefault()
      const likeClick = e.currentTarget
      const amountOfLikes = likeClick.closest('.photo_likes').firstElementChild
      if (likeIcon.classList.contains('isLiked')) {
        amountOfLikes.innerHTML = Number(amountOfLikes.innerHTML) - 1
        const totalLikes = getTotalLikes(medias)
        likesSpan.textContent = totalLikes
        likeIcon.classList.remove('isLiked')
      } else {
        amountOfLikes.innerHTML = Number(amountOfLikes.innerHTML) + 1
        const totalLikes = getTotalLikes(medias)
        likesSpan.textContent = totalLikes + 1
        likeIcon.classList.add('isLiked')
      }
    })
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
