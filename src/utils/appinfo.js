import list from './applist'

export default link => {
		for(let i in list){
			if (list[i].link == link) return list[i]
		}
	}
