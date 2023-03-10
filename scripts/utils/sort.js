// Fonction pour trier les médias
function sort(medias, option) {
  switch (option) {
    // On trie les médias en fonction de l'option choisie
    case 'Popularité':
      // On trie les médias par ordre décroissant de likes
      return medias.sort((a, b) => b.likes - a.likes)
    case 'Date':
      // On trie les médias par ordre croissant de date
      return medias.sort((a, b) => new Date(a.date) - new Date(b.date))
    case 'Titre':
      // On trie les médias par ordre alphabétique
      return medias.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return medias
  }
}
