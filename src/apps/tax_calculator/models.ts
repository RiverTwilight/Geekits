interface Brand {
	name: string;
	models: Model[];
}

interface Model {
	name: string;
	consumption: number;
}

const fuelConsumptionByModel: Record<string, Brand> = {
	VW: {
		name: "大众",
		models: [
			{ name: "朗逸", consumption: 6.78 },
			{ name: "高尔夫", consumption: 7.1 },
			{ name: "帕萨特", consumption: 7.2 },
			{ name: "宝来", consumption: 6.65 },
			{ name: "途观", consumption: 8.1 },
			{ name: "速腾", consumption: 6.82 },
			{ name: "探岳", consumption: 8.5 },
			{ name: "途昂", consumption: 10.5 },
		],
	},
	Volvo: {
		name: "沃尔沃",
		models: [
			{ name: "XC40", consumption: 7.4 },
			{ name: "XC60", consumption: 8.3 },
			{ name: "XC90", consumption: 9.2 },
		],
	},
	Toyota: {
		name: "丰田",
		models: [
			{ name: "卡罗拉", consumption: 5.6 },
			{ name: "凯美瑞", consumption: 6.8 },
			{ name: "雷凌", consumption: 6.46 },
			{ name: "RAV4", consumption: 7.2 },
		],
	},
	Honda: {
		name: "本田",
		models: [
			{ name: "思域", consumption: 5.8 },
			{ name: "雅阁", consumption: 6.5 },
			{ name: "缤智", consumption: 7.19 },
			{ name: "CR-V", consumption: 7.4 },
		],
	},
	BMW: {
		name: "宝马",
		models: [
			{ name: "3系", consumption: 6.2 },
			{ name: "5系（进口 245 马力）", consumption: 8.87 },
			{ name: "5系（进口 184 马力）", consumption: 8.98 },
			{ name: "5系（245 马力）", consumption: 9.1 },
			{ name: "X3", consumption: 8.2 },
		],
	},
	Audi: {
		name: "奥迪",
		models: [
			{ name: "A4L", consumption: 7.2 },
			{ name: "A6L", consumption: 9.12 },
			{ name: "Q5L", consumption: 8.5 },
		],
	},
	MercedesBenz: {
		name: "奔驰",
		models: [
			{ name: "C级", consumption: 6.7 },
			{ name: "E级", consumption: 8.1 },
			{ name: "GLC", consumption: 8.9 },
		],
	},
	Ford: {
		name: "福特",
		models: [
			{ name: "福克斯", consumption: 6.2 },
			{ name: "蒙迪欧", consumption: 7.3 },
			{ name: "翼虎", consumption: 8.4 },
		],
	},
	Hyundai: {
		name: "现代",
		models: [
			{ name: "伊兰特", consumption: 5.3 },
			{ name: "伊兰特 N", consumption: 6.1 },
			{ name: "索纳塔", consumption: 6.9 },
			{ name: "途胜", consumption: 7.5 },
		],
	},
	Kia: {
		name: "起亚",
		models: [
			{ name: "K3", consumption: 5.4 },
			{ name: "K5", consumption: 6.8 },
			{ name: "狮跑", consumption: 7.2 },
		],
	},
	Nissan: {
		name: "尼桑",
		models: [
			{ name: "轩逸", consumption: 5.2 },
			{ name: "天籁", consumption: 6.6 },
			{ name: "奇骏", consumption: 7.3 },
		],
	},
	Mazda: {
		name: "马自达",
		models: [
			{ name: "昂克赛拉", consumption: 6.13 },
			{ name: "阿特兹", consumption: 6.5 },
			{ name: "CX-5", consumption: 7.2 },
		],
	},
	Haval: {
		name: "哈弗",
		models: [{ name: "H9", consumption: 12.6 }],
	},
	Peugeot: {
		name: "标致",
		models: [
			{ name: "308", consumption: 5.9 },
			{ name: "408", consumption: 6.7 },
			{ name: "3008", consumption: 7.5 },
		],
	},
	Chevrolet: {
		name: "雪弗兰",
		models: [
			{ name: "科鲁泽", consumption: 6.2 },
			{ name: "迈锐宝XL", consumption: 6.8 },
			{ name: "探界者", consumption: 7.9 },
		],
	},
	Lexus: {
		name: "雷克萨斯",
		models: [
			{ name: "ES", consumption: 6.3 },
			{ name: "RX", consumption: 8.2 },
			{ name: "NX", consumption: 7.5 },
		],
	},
	LandRover: {
		name: "路虎",
		models: [
			{ name: "揽胜极光", consumption: 8.1 },
			{ name: "发现运动版", consumption: 8.6 },
			{ name: "揽胜星脉", consumption: 9.3 },
		],
	},
	// BYD: {
	// 	name: "比亚迪",
	// 	models: [
	// 		{ name: "宋PLUS", consumption: 6.97 },
	// 	],
	// },
};

export default fuelConsumptionByModel;
