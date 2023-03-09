function sort(medias, option) {
  switch (option) {
    case 'Popularité':
      return medias.sort((a, b) => b.likes - a.likes)
    case 'Date':
      return medias.sort((a, b) => new Date(a.date) - new Date(b.date))
    case 'Titre':
      return medias.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return medias
  }
}
