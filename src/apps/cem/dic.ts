import calTable from "./balance";

let chemSymbol = [
	"fuckjs",
	"H",
	"He",
	"Li",
	"Be",
	"B",
	"C",
	"N",
	"O",
	"F",
	"Ne",
	"Na",
	"Mg",
	"Al",
	"Si",
	"P",
	"S",
	"Cl",
	"Ar",
	"K",
	"Ca",
	"Sc",
	"Ti",
	"V",
	"Cr",
	"Mn",
	"Fe",
	"Co",
	"Ni",
	"Cu",
	"Zn",
	"Ga",
	"Ge",
	"As",
	"Se",
	"Br",
	"Kr",
	"Rb",
	"Sr",
	"Y",
	"Zr",
	"Nb",
	"Mo",
	"Tc",
	"Ru",
	"Rh",
	"Pd",
	"Ag",
	"Cd",
	"In",
	"Sn",
	"Sb",
	"Te",
	"I",
	"Xe",
	"Cs",
	"Ba",
	"La",
	"Ce",
	"Pr",
	"Nd",
	"Pm",
	"Sm",
	"Eu",
	"Gd",
	"Tb",
	"Dy",
	"Ho",
	"Er",
	"Tm",
	"Yb",
	"Lu",
	"Hf",
	"Ta",
	"W",
	"Re",
	"Os",
	"Ir",
	"Pt",
	"Au",
	"Hg",
	"Tl",
	"Pb",
	"Bi",
	"Po",
	"At",
	"Rn",
	"Fr",
	"Ra",
	"Ac",
	"Th",
	"Pa",
	"U",
	"Np",
	"Pu",
	"Am",
	"Cm",
	"Bk",
	"Cf",
	"Es",
	"Fm",
	"Md",
	"No",
	"Lr",
	"Rf",
	"Db",
	"Sg",
	"Bh",
	"Hs",
	"Mt",
	"Ds",
	"Rg",
	"Cn",
	"Nh",
	"Fl",
	"Mc",
	"Lv",
	"Ts",
	"Og",
];

const downsymbol = ["₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];

const minimumCM = (m: any, n: any) => {
	return m % n == 0 ? n : minimumCM(n, m % n);
};

//解析单个物质
const parseTant = (tant: any, idx: any) => {
	try {
		var tance = tant.trim();
		if (tant.indexOf("(") !== -1) {
			//提公因数
			console.log(tance);
			var cFReg = /\(\S+\)(\d{0,})/g;
			let cache = cFReg.exec(tance);
			// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			var commonFactor = cache[1] || 1;
			console.log(commonFactor);
			//匹配括号内内容
			// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			var innerBracket = /\((\S+)\)(\d{0,})/g.exec(tance)[1];

			//补上省略的1
			var addOne = innerBracket.replace(
				/(([A-Z][a-z]?)([A-Z]?))+/g,
				"$2" + 1 + "$3"
			);

			//将数字乘以公因数
			// @ts-expect-error ts-migrate(2769) FIXME: Type 'number' is not assignable to type 'string'.
			var countedTant = addOne.replace(/(\d+)/g, (num) => {
				// @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
				return num.substring(0, 1) * commonFactor;
			});

			var tance = tance.replace(/\((\S+)\)\d{0,}/, countedTant);

			console.log("括号内内容处理后", tance);
		}
		var allEle = tance.match(/[A-Z][a-z]?\d?/g);
		return {
			tance: tant.trim(),
			idx: idx,
			// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ele' implicitly has an 'any' type.
			elements: allEle.map((ele, i) => {
				let info = {
					// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
					name: /([A-Z][a-z]?)\d?/.exec(ele)[1],
					// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
					num: /\d$/.test(ele) ? parseInt(/(\d$)/.exec(ele)[1]) : 1,
				};
				return info;
			}),
		};
	} catch (e) {
		throw Error("方程式输入格式错误");
	}
};

/*
单个物质结构
{
	tance:'Fe3O4',
	num:X1,
	elements:[{
		name:'Fe',
		num:3
	},{
		name:'O',
		num:4
	}]
}
*/
/*
const makeExpression = tants => {
	var expressions = [];
	for(let i in tants){
		let thisS = tants[i]
		for(let j in thisS.elements){
			expressions.push({
				ele: thisS.elements[j].name,				
				exp:simplifyExp(`${thisS.elements[j].num} * ${thisS.elements[j].name}`)
			})
		}
	}
	return expressions
}*/

//计算+号个数
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'exp' implicitly has an 'any' type.
const plusNum = (exp) => {
	var num = 0;
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
	exp.split("").map((a) => {
		if (a === "+") num += 1;
	});
	console.log(`There are ${num} '+' in '${exp}'`);
	return num;
};

//初始化矩阵（列数，行数）
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'x' implicitly has an 'any' type.
const makeMartix = (x, y) => {
	return Array(y).fill(Array(x).fill(0));
};

//匹配表达式系数
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'exp' implicitly has an 'any' type.
const getNums = (exp) => {
	if (/(\d{1,})\s\*/g.test(exp)) {
		// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'reg' implicitly has an 'any' type.
		return exp
			.match(/(\d{1,})\s\*/g)
			.map((reg) => parseInt(/\d{1,}/g.exec(reg)[0]));
	}
	return [1];
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nums' implicitly has an 'any' type.
const nums2array = (nums, max) => {
	console.log(nums);
	let newLine = Array(max).fill(0);
	for (let j in nums) {
		// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
		newLine.splice(j, 1, nums[j]);
	}
	return newLine;
};

const cem = (equation, enableHtmlMark = true) => {
	const resultants: string = equation.split("=")[1].trim(); //生成物
	const reactants: string = equation.split("=")[0].trim(); //反应物

	var resultant = resultants.split("+").map((tant, i) => parseTant(tant, i));
	var reactant = reactants.split("+").map((tant, i) => parseTant(tant, i));

	console.log("详细反应物信息", reactant, resultant);

	/********列出所有元素种类**********/
	// @ts-expect-error ts-migrate(7034) FIXME: Variable 'eleClass' implicitly has type 'any[]' in... Remove this comment to see the full error message
	var eleClass = [];
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tant' implicitly has an 'any' type.
	reactant.map((tant) => {
		// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ele' implicitly has an 'any' type.
		tant.elements.map((ele) => {
			// @ts-expect-error ts-migrate(7005) FIXME: Variable 'eleClass' implicitly has an 'any[]' type... Remove this comment to see the full error message
			if (eleClass.indexOf(ele.name) === -1) {
				eleClass.push({
					ele: ele.name,
					exp: [],
				});
			}
		});
	});

	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tant' implicitly has an 'any' type.
	reactant.map((tant, i) => {
		// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ele' implicitly has an 'any' type.
		tant.elements.map((ele) => {
			// @ts-expect-error ts-migrate(7005) FIXME: Variable 'eleClass' implicitly has an 'any[]' type... Remove this comment to see the full error message
			eleClass.map((allEle) => {
				if (allEle.ele === ele.name) {
					allEle.exp.push(ele.num);
				}
			});
		});
		// @ts-expect-error ts-migrate(7005) FIXME: Variable 'eleClass' implicitly has an 'any[]' type... Remove this comment to see the full error message
		eleClass.map((allEle) => {
			if (allEle.exp.length === i) {
				allEle.exp.push(0);
			}
		});
	});

	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tant' implicitly has an 'any' type.
	resultant.map((tant, i) => {
		// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ele' implicitly has an 'any' type.
		tant.elements.map((ele) => {
			// @ts-expect-error ts-migrate(7005) FIXME: Variable 'eleClass' implicitly has an 'any[]' type... Remove this comment to see the full error message
			eleClass.map((allEle) => {
				if (allEle.ele === ele.name) {
					allEle.exp.push(-ele.num);
				}
			});
		});
		// @ts-expect-error ts-migrate(7005) FIXME: Variable 'eleClass' implicitly has an 'any[]' type... Remove this comment to see the full error message
		eleClass.map((allEle) => {
			if (allEle.exp.length === i + reactant.length) {
				allEle.exp.push(0);
			}
		});
	});

	// @ts-expect-error ts-migrate(7005) FIXME: Variable 'eleClass' implicitly has an 'any[]' type... Remove this comment to see the full error message
	var martix = eleClass.map((ele) => ele.exp);
	// @ts-expect-error ts-migrate(7005) FIXME: Variable 'eleClass' implicitly has an 'any[]' type... Remove this comment to see the full error message
	console.log("元素种类", eleClass);
	console.log("矩阵", martix);

	var res = calTable(martix);
	console.log(res);

	var result = "";

	let reactSubstance = [];
	let resultSubstance = [];

	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stance' implicitly has an 'any' type.
	reactant.map((stance, i) => {
		if (enableHtmlMark) {
			result += `<span class="Textc(green)">${res[i]}</span>${
				stance.tance
			} ${i === reactant.length - 1 ? " == " : " + "}`;
		} else {
			result += `${res[i]}${stance.tance} ${
				i === reactant.length - 1 ? " == " : " + "
			}`;
		}
		reactSubstance.push({
			element: stance.tance,
			number: res[i],
		});
	});

	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stance' implicitly has an 'any' type.
	resultant.map((stance, i) => {
		if (enableHtmlMark) {
			result += `<span class="Textc(green)">${
				res[reactant.length + i]
			}</span>${stance.tance} ${i === resultant.length - 1 ? "" : "+"}`;
		} else {
			result += `${res[reactant.length + i]}${stance.tance} ${
				i === resultant.length - 1 ? "" : "+"
			}`;
		}
		resultSubstance.push({
			element: stance.tance,
			number: reactant.length + i,
		});
	});

	var result = result.replace(/([A-z\)])(\d)/g, (num) => {
		let idx = downsymbol[parseInt(num.substring(1)) - 1];
		return num.substring(0, 1) + idx;
	});

	const resultRaw = {
		resultSubstance,
		reactSubstance,
	};

	// @ts-expect-error ts-migrate(7005) FIXME: Variable 'eleClass' implicitly has an 'any[]' type... Remove this comment to see the full error message
	return { result, eleClass, resultRaw };
};

export default cem;
