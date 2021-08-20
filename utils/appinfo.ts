import list from '../data/appData'

export default (link: any) => {
		for(let i in list){
			if (list[i].link == link) return list[i]
		}
	};
