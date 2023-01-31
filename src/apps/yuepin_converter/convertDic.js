const fs = require("fs");
const path = require("path");

const originalDic = fs.readFileSync(
	"src/apps/yuepin_converter/dic.txt",
	"utf8"
);

const startIndex = originalDic.lastIndexOf("丫	丫");

const dic = [];

originalDic
	.slice(startIndex)
	.split("\n")
	.forEach((line) => {
		let arr = line.split("	");
		dic.push({
			simplified: arr[0],
			traditional: arr[1],
			pinyin: arr[2],
		});
	});

const targetPath = path.join(__dirname, "./dic_trad.json")

// fs.writeFileSync(targetPath, JSON.stringify(dic), "utf8");

const dic_simp = {}

dic.forEach(char => {
	dic_simp[char.traditional] = {
		simplified: char.simplified,
		pinyin: char.pinyin
	}
})

fs.writeFileSync(targetPath, JSON.stringify(dic_simp), "utf8");

