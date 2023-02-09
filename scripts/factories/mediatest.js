class Media {
	constructor(data) {
		this.mediaContainer = document.createElement('div')
		this.data = data
	}
	// doit etre implementee et retourner le mediaContainer dans lequel j'aurai injecté mes variations du factory
	create() {}
}

class Video extends Media {
	create() {
		const videoElement = document.createElement('video')
		// ....
		return this.mediaContainer.appendChild(videoElement)
	}
}

class Image extends Media {
	create() {
		const element = document.createElement('img')
		// ....
		return this.mediaContainer.appendChild(element)
	}
}

class MediaFactory {
	sort(media) {
		if (media.video) {
			return new Video(media)
		} else {
			return new Image(media)
		}
	}
}

MediaFactory.sort(media)
