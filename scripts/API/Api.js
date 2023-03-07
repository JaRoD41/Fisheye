//fonction de récupération des données et médias de chaque photographe
async function getMedias() {
	let photographerInfos = [];
	let arrayOfPhotographers = [];
	let arrayOfMedias = [];
	await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => {
			arrayOfPhotographers = data.photographers; // filtre pour récupérer les infos du photographe contenu dans l'id de l'url
			photographerInfos = arrayOfPhotographers.filter((person) => {
				return person.id == photographerPageId;
			});
			arrayOfMedias = data.media;
			window.medias = arrayOfMedias.filter((media) => {
				return media.photographerId == photographerPageId;
			});
		});

	return {
		photographerInfos: photographerInfos[0],
		medias: window.medias,
	};
}

// fonction de récupération des différents photographes
async function getPhotographers() {
	let photographers = [];
	await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => {
			photographers = data.photographers;
		});

	// on retourne le tableau photographers une fois récupéré
	return {
		photographers: [...photographers],
	};
}
