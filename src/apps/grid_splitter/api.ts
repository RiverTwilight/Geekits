// For browser only

function splitToNineGrids(
	src: string,
	onCompleted: (imagePieces: string[]) => void
) {
	const originalImage = new Image();
	originalImage.src = src;
	originalImage.onload = () => {
		let numColsToCut = 3;
		let numRowsToCut = 3;
		let widthOfOnePiece = originalImage.width / 3;
		let heightOfOnePiece = originalImage.height / 3;
		let imagePieces = [];
        
		for (let y = 0; y < numColsToCut; ++y) {
			for (let x = 0; x < numRowsToCut; ++x) {
				let canvas = document.createElement("canvas");
				canvas.width = widthOfOnePiece;
				canvas.height = heightOfOnePiece;
				let context = canvas.getContext("2d");

				context.drawImage(
					originalImage,
					x * widthOfOnePiece,
					y * heightOfOnePiece,
					widthOfOnePiece,
					heightOfOnePiece,
					0,
					0,
					canvas.width,
					canvas.height
				);

				imagePieces.push(canvas.toDataURL());
			}
		}
		onCompleted && onCompleted(imagePieces);
	};
}

export default splitToNineGrids;
