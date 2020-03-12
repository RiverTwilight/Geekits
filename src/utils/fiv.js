var list = JSON.parse(localStorage.getItem('fiv')) || []
const fiv = {
	get: link => {
		for (let a in list) {
			if (list[a].link === link) return list[a].name
		}
		return null
	},
	getAll: ()=>{
		return list
	},
	delete: i => {
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
	add: data => {
		list.push(data);
		localStorage.setItem('fiv',JSON.stringify(list))
	}
}

export default fiv