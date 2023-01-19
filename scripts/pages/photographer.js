let url = new URL(location.href) // declare an variable to pick the actual URL
let photographerPageId = url.searchParams.get('id') // get the id of the photographer from the URL

async function getPhotographerInfos() {
	let photographerInfos = []
	let arrayOfPhotographers = []
	await fetch('../../data/photographers.json')
		.then((res) => res.json())
		.then((data) => {
			arrayOfPhotographers = data.photographers // filter apply to select the only object that matches the id found in the URL
			photographerInfos = arrayOfPhotographers.filter((person) => {
				return person.id == photographerPageId
			})
		})

	return {
		photographerInfos: [...photographerInfos],
	}
}

getPhotographerInfos()
