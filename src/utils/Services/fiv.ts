if(!localStorage.fiv)localStorage.fiv = "[]"
var list = JSON.parse(localStorage.fiv)

export default {
	get: (link: string): any => {
		for (let a in list) {
			if (list[a].link === link) return list[a].name
		}
		return null
	},
	getAll: (): any[]=>{
		return list
	},
	delete: (i: number | {
		link: string;
		name: string;
	}) => {
		//如果传入工具信息（AppContainer）
		if (typeof i === 'object') {
			for (let a in list) {
				if (list[a].link === i.link) list.splice(a,1);
			}
		}else{
			//传入游标
			list.splice(i,1);
		}		
		localStorage.setItem('fiv',JSON.stringify(list))
	},
	add: (data: {
		link: string;
		name: string;
	}): void => {
		list.push(data);
		localStorage.setItem('fiv',JSON.stringify(list))
	}
}
