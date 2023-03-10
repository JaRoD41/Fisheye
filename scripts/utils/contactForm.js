const modal = document.getElementById('contact_modal')
const mainWrapper = document.getElementById('gallery-container')
const form = document.querySelector('#contact_modal form')
const closeBtn = document.querySelector('#contact_modal img')
const openBtn = document.querySelector('.contact_button')
const submitButton = document.querySelector('#contact-form')

// Event listener pour envoyer le formulaire
submitButton.addEventListener('submit', formSubmit)

// Event listener pour fermer la modale
modal.addEventListener('keyup', function (e) {
  if (e.code === 'Escape') {
    closeModal()
  }
})

// Fonction pour afficher la modale
function displayModal() {
  modal.style.display = 'flex'
  mainWrapper.setAttribute('aria-hidden', 'true')
  modal.setAttribute('aria-hidden', 'false')
  form.setAttribute('aria-hidden', 'false')
  document.body.classList.add('no-scroll')
  closeBtn.focus()
}

// Fonction pour fermer la modale
function closeModal() {
  modal.style.display = 'none'
  mainWrapper.setAttribute('aria-hidden', 'false')
  modal.setAttribute('aria-hidden', 'true')
  form.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('no-scroll')
  openBtn.focus()
  form.reset()
}

// Fonction pour envoyer le formulaire et fermer la modale
function formSubmit(event) {
  const firstNameInput = document.querySelector('#first-name')
  const lastNameInput = document.querySelector('#last-name')
  const emailInput = document.querySelector('#email')
  const messageInput = document.querySelector('#messageBox')

  event.preventDefault()

  const firstName = firstNameInput.value
  const lastName = lastNameInput.value
  const email = emailInput.value
  const message = messageInput.value

  console.log({ firstName, lastName, email, message })
  closeModal()
}
