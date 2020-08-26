
async function loadImg(src: string) {
	const img = new Image();
	img.src = src;
	return img
}

export default async (base64: string, quality: number, cb: (dataUrl: string) => any, type: string | undefined) => {
	var image = await loadImg(base64);
	var canvas = document.createElement('canvas'),
		context = canvas.getContext('2d'),
		imageWidth = image.width * quality, //压缩后图片的大小
		imageHeight = image.height * quality;

	canvas.width = imageWidth
	canvas.height = imageHeight

	context && context.drawImage(image, 0, 0, imageWidth, imageHeight)
	var data = canvas.toDataURL(type);
	cb && cb(data)
}
