import list from './applist'

const get = link => {
		for(let i in list){
			if (list[i].link == link) return list[i]
		}
	}

export default get