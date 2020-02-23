import calTable from './balance.js'

let chemSymbol = [
  'fuckjs', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar',
  'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br',
  'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te',
  'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm',
  'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn',
  'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr',
  'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'
]

const minimumCM = (m , n) => {
    return m % n == 0?(n):(minimumCM(n,m%n));
}

//解析单个物质
const parseTant = (tant,idx) => {
	var tance = tant.trim();
	if(tant.indexOf('(') !== -1){
		//提公因数
        console.log(tance)		
		var cFReg = /\(\S+\)(\d{0,})/g;
		let cache = cFReg.exec(tance);
		var commonFactor = cache[1] || 1;		
        console.log(commonFactor)
        //匹配括号内内容
		var innerBracket = /\((\S+)\)(\d{0,})/g.exec(tance)[1];
        
        //补上省略的1
		var addOne = innerBracket.replace(/(([A-Z][a-z]?)([A-Z]?))+/g,'$2'+ 1 +'$3');
		
		//将数字乘以公因数
		var countedTant = addOne.replace(/(\d+)/g,(num=>{
			return num.substring(0,1) * commonFactor
		}))
     
		var tance = tance.replace(/\((\S+)\)\d{0,}/,countedTant)

		console.log('括号内内容处理后',tance)

	}
	var allEle = tance.match(/[A-Z][a-z]?\d?/g)
	return {
		tance: tant.trim(),
		idx:idx,
		elements: allEle.map((ele,i) => {
			let info = {
				name: /([A-Z][a-z]?)\d?/.exec(ele)[1],
				num: (/\d$/.test(ele)) ? parseInt(/(\d$)/.exec(ele)[1]) : 1
			}
			return info
		})
	}
}

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
const plusNum = exp => {
	var num = 0;
	exp.split('').map(a=>{if(a === '+')num+=1})
	console.log(`There are ${num} '+' in '${exp}'`)
	return num
}

//初始化矩阵（列数，行数）
const makeMartix = (x,y) => {
	return Array(y).fill(Array(x).fill(0))
}

//匹配表达式系数
const getNums = exp => {
	if(/(\d{1,})\s\*/g.test(exp)){
		return exp.match(/(\d{1,})\s\*/g).map(reg=>(parseInt(/\d{1,}/g.exec(reg)[0])))		
	}
	return [1]
}

const nums2array = (nums,max) => {
	console.log(nums)
	let newLine = Array(max).fill(0)
	for (let j in nums) {
		newLine.splice(j, 1, nums[j])
	}
	return newLine
}

const cem = equation => {
	const resultants = equation.split("=")[1].trim(); //生成物
	const reactants = equation.split("=")[0].trim(); //反应物
   
	var resultant = resultants.split('+').map((tant,i) => (parseTant(tant,i)))
	var reactant = reactants.split('+').map((tant,i) => (parseTant(tant,i)))
	
	console.log('详细反应物信息', reactant, resultant);//详细反应物信息
	 
    /********列出所有元素种类**********/
    var eleClass = [];
    reactant.map(tant=>{
    	tant.elements.map(ele=>{
    		if(eleClass.indexOf(ele.name) === -1){
    			eleClass.push({
    				ele:ele.name,
    				exp:[]
    			})
    		}
    	})
    })   
	
	reactant.map((tant,i)=>{
		tant.elements.map(ele=>{
			eleClass.map(allEle=>{
				if(allEle.ele === ele.name){
					allEle.exp.push(ele.num)
				}
			})
		})
		eleClass.map(allEle=>{
			if(allEle.exp.length === i){
				allEle.exp.push(0);
			}
		})
	})

	resultant.map((tant,i)=>{
		tant.elements.map(ele=>{
			eleClass.map(allEle=>{
				if(allEle.ele === ele.name){
					allEle.exp.push(-ele.num);
				}		
			})
		})
		eleClass.map(allEle=>{
			if(allEle.exp.length === i + reactant.length){
				allEle.exp.push(0);
			}
		})
	})

    var martix = eleClass.map(ele=>(ele.exp))
	console.log('元素种类',eleClass)
	console.log('矩阵',martix);
    
    var res = calTable(martix);
    console.log(res)

    var result = "";

    reactant.map((stance,i)=>{
    	result += `<span class="mdui-text-color-theme">${res[i]}</span>${stance.tance} ${(i === reactant.length - 1)?' == ':' + '}`
    })

    resultant.map((stance,i)=>{
    	result += `<span class="mdui-text-color-theme">${res[reactant.length + i]}</span>${stance.tance} ${i === resultant.length - 1?'': '+'}`
    })
	return { result, eleClass }
}

export default cem