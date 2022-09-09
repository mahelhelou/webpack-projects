import kiwi from './kiwi.jpeg'
import kiwiAltText from './kiwi-alt-text.txt'

function AddImage() {
	const img = document.createElement('img')
	// img.alt = 'Kiwi'
	img.alt = kiwiAltText
	img.width = 300
	img.src = kiwi

	document.body.appendChild(img)
}

export default AddImage
