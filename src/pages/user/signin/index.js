const createCode = () => {
	var code = "";
	Array(5).fill(null).map(() => {
		code += parseInt(Math.random() * (10 - 0 + 1) + 0, 10)
	});
}