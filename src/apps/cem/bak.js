import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

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
	const tance = tant.trim();
	return {
		tance: tance,
		idx:idx,
		elements: tant.trim().match(/[A-Z][a-z]?\d?/g).map(ele => {
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
}

//计算+号个数
const plusNum = exp => {
	var num = 0;
	exp.split('').map(a=>{if(a === '+')num+=1})
	console.log(`There are ${num} '+' in '${exp}'`)
	return num
}

//化简表达式
const simplifyExp = exp => {
	return math.simplify(exp).toString();
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
    				exp:{
    					left:"0",
    					right:"0"
    				}
    			})
    		}
    	})
    })
    
    /********列出所有元素的计算表达式**********/
    var leftExpressions =  makeExpression(reactant)
	var rightExpressions =  makeExpression(resultant)

    /********将左右两端的元素计算表达式相加**********/
	leftExpressions.map(exp=>{
		eleClass.map(eleClass=>{
			if(eleClass.ele === exp.ele)eleClass.exp.left += ` + ${exp.exp}`
		})
	})
	rightExpressions.map(exp=>{
		eleClass.map(eleClass=>{
			if(eleClass.ele === exp.ele)eleClass.exp.right += ` + ${exp.exp}`
		})
	})
   
    /********合并左右两端各元素计算表达式，列出方程组**********/
    var totalExpressions = [];
    var maxLineNum = 2;
	eleClass.map(ele=>{
			
		ele.exp.left = simplifyExp(ele.exp.left)
		ele.exp.right= simplifyExp(ele.exp.right)

		let leftExp = ele.exp.left;
		let rightExp = ele.exp.right;

		if(plusNum(leftExp)+maxLineNum > maxLineNum)maxLineNum += plusNum(leftExp);
		if(plusNum(rightExp)+maxLineNum > maxLineNum)maxLineNum += plusNum(rightExp);

		totalExpressions.push(`${leftExp} = ${rightExp}`)
	})

	console.log('元素种类',eleClass)
	console.log('总反应方程式',totalExpressions)

	var martixLeft = Array(reactant.length).fill(0)
	var martixRight = Array(resultant.length).fill(-0)

	var martix = Array(eleClass.length).fill(martixLeft.concat(martixRight))

    console.log(martix);
	//console.log('初始化矩阵(左/右)',martixLeft, martixRight)

	for(let i = 0; i<= eleClass.length; i++){

		let leftNums = getNums(eleClass[i].exp.left)
		let rightNums = getNums(eleClass[i].exp.right)

		console.log('左右两边系数',leftNums,rightNums)

		//console.log(`No.${i} equation's left's num(s) include ${leftNums}`)
		
		//martixLeft.splice(i, 1, nums2array([...leftNums,...rightNums],reactant.length + resultant.length))
		
	}
	console.log(martixLeft,martixRight)
}

export default cem