import React from 'react'
import mdui from 'mdui'

function core(props) {

	/*获取输入数*/
	var bj = props.data,
		zj = props.data,
		g = props.data,
		mj = props.data,
		pi = props.data;
	if (zj && bj) {
		if (zj / bj !== 2) {
			mdui.snackbar({
				message: '直径应是半径的两倍'
			});
		}
	}

	/*****计算******/
	/*****共6种输入情况******/
	//用户可选输入半径、直径、高、表面积，至少两个
	//需要计算直径、半径、高、表面积、底面积之和、侧面积、体积
	if (!g && !mj) {
		//当半径和直径
		console.log("当半径和直径已知");
		var dmj = pi * Math.pow(zj / 2, 2) * 2;
		if (!bj) {
			var bj = 0.5 * zj;
		} else {
			var zj = 2 * bj;
		}
	} else if (!zj && !mj) {
		//当半径和高已知
		console.log("当半径和高已知");
		var dmj = pi * Math.pow(bj, 2) * 2,
			zj = bj * 2,
			cmj = pi * zj * g,
			tj = dmj * g
	} else if (!zj && !bj) {
		mdui.snackbar({
			message: '半径和直径至少输入一个'
		});
	} else if (!bj && !mj) {
		//当高和直径已知
		console.log("当高和直径已");
		var dmj = pi * Math.pow(zj / 2, 2) * 2,
			bj = zj / 2,
			cmj = pi * zj * g,
			mj = dmj + cmj,
			tj = dmj / 2 * g;
	} else if (!g && !bj) {
		//当面积和直径已知
		console.log("当面积和直径已知");
		var dmj = pi * Math.pow(zj / 2, 2) * 2,
			bj = zj / 2,
			cmj = mj - dmj,
			g = cmj / (zj * pi),
			tj = dmj / 2 * g;
	} else if (!bj && !mj) {
		//当高和直径已知
		var dmj = pi * Math.pow(zj / 2, 2) * 2,
			bj = zj / 2,
			cmj = pi * zj * g,
			mj = cmj + dmj,
			tj = dmj / 2 * g;
	} else if (!zj && !g) {
		//当面积和半径已知
		var dmj = pi * Math.pow(bj, 2) * 2,
			zj = bj * 2,
			cmj = mj - dmj,
			g = cmj / (zj * pi),
			tj = dmj / 2 * g;
	} else if (!mj) {
		//当直径、半径、高已知
		var dmj = pi * Math.pow(bj, 2) * 2,
			cmj = zj * pi * g,
			mj = cmj + dmj,
			tj = dmj / 2 * g;
	} else if (!g) {
		//当直径、半径、面积已知
		var dmj = pi * Math.pow(bj, 2) * 2,
			cmj = mj - dmj,
			g = cmj / (pi * zj),
			tj = dmj / 2 * g;
	}
	var result = {
		zj: zj,
		bj: bj,
		g: g,
		tj: tj,
		dmj: dmj,
		cmj: cmj
	}
	console.log(result)
}

//数据输入表单
function Input(props){
	var form = props.data.map((a,i)=>{
		return(
			<div key={i} class="mdui-textfield">
				<label class="mdui-textfield-label">{a.name}</label>
				<input 
					value={a.value}
					onChange={e=>{
						props.onValueChange(a.name,e.target.value)
					}}
					class="mdui-textfield-input" type="number"/>
			</div>
		)
	})
	return form
}

//结果展示表格
function Result(props) {
	var tbody = props.data.map((data,i)=>{
		return(
			<tr key={i}>
			    <td>{data.name}</td>
			    <td>{data.value}</td>
			</tr>
		)
	})
	return(
		<div class="mdui-table-fluid">
			<table class="mdui-table">
			    <tbody>{tbody}</tbody>
		    </table>
	    </div>
	)
}
/*
class Create extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text:'',
		}		
	}
	render(){
		return(
			<React.Fragment>
			</React.Fragment>
		)
	}
}
*/
class Ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [{
				name: '半径',
				value:""
			}, {
				name: '直径',
				value:""
			}, {
				name: '高',
				value:""
			}, {
				name: '表面积',
				value:""
			}, {
				name: '侧面积',
				value:""
			}, {
				name: '体积',
				value:""
			}, {
				name: '上下底面积之和',
				value:""
			}]
		}
	}
	onValueChange(name,value){
		console.log(typeof this.state.data)

		/*this.state.data.map(a=>{
			if(name === a.name)a.value = value
		})*/
	}
	render(){
		const { data } = this.state.data
		return(
			<React.Fragment>
				<Input
					onValueChange={this.onValueChange}
					data={data}
				/>
				<button 
					className="mdui-btn mdui-btn-raised"
					onClick={()=>{}}></button>
				<button 
					className="mdui-btn mdui-btn-raised"
					onClick={()=>{}}></button>
				<Result data={data} />
			</React.Fragment>
		)

	}
}

export default Ui
