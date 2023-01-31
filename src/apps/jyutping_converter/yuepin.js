import dic_trad from "./dic_trad.json";
import dic_simp from "./dic_simp.json";

const toYuepin = (simplified) => {
	let yuepin = "";
	for (let i = 0; i < simplified.length; i++) {
		let char = simplified[i];
		if (dic_simp[char]) {
			yuepin += dic_simp[char].pinyin + " ";
		} else if (dic_trad[char]) {
			yuepin += dic_trad[char].pinyin + " ";
		} else {
			yuepin += char;
		}
	}
	return yuepin.trim();
};

export default toYuepin;
