import React from 'react'
import mdui from 'mdui'

import FileRead from '../../utils/fileread'
import { ListControlMenu } from 'mdui-in-react'

async function loadImg(src){
	var img = await new Image();
	img.src = src;
	return img
}

async function imgMosaic_X(assests, callback) {
	var c = document.createElement('canvas')
	var ctx = c.getContext("2d");

	var imgs = [];
	c.width = 0;
	c.height = 0;

	for (var i = 0; i <= assests.length - 1; i++) {

		var ele = await loadImg(assests[i]);

		c.width += ele.width;

		if (ele.height > c.height) c.height = ele.height

		imgs.push(ele);

	}

	var startX = 0;
	var startY = 0;
	console.log(imgs)

	for (var j = 0; j <= imgs.length - 1; j++) {	
		//console.log(imgs[j])	
		ctx.drawImage(imgs[j], startX, 0, imgs[j].width, imgs[j].height);
		startX += imgs[j].width;
	}
	
	var res = c.toDataURL()
	console.log(res);
	callback(res)
}

async function imgMosaic_Y(assests, callback) {
	var c = document.createElement('canvas')
	var ctx = c.getContext("2d");

	var imgs = [];
	c.width = 0;
	c.height = 0;

	for (var i = 0; i <= assests.length; i++) {

		var ele = await loadImg(assests[i]);

		c.height += ele.height;

		if (ele.width > c.width) c.width = ele.width

		imgs.push(ele);

	}
	
	console.log('the canvas size is ' + c.width + ' x ' + c.height);

	var startX = 0;
	var startY = 0;
	console.log(imgs)

	for (var j = 0; j <= imgs.length - 1; j++) {	
		//console.log(imgs[j])	
		ctx.drawImage(imgs[j], 0, startY, imgs[j].width, imgs[j].height);
		startY += imgs[j].height;
	}
	
	var res = c.toDataURL()
	console.log(res);
	callback(res)
}


//预览相册组件
const Alubm = (props) => {	
	return(
		<div className="mdui-row-xs-3">{
			props.assests.map((a,i)=>(
				<div className="mdui-card mdui-col">
					<div key={i} className="mdui-card-media mdui-center">
		                <img width="100" height="120" src={a}/>
		                <div className="mdui-card-menu">
		                    <button 
			                    style={{background: 'rgba(0, 0, 0, 0.27)'}}
			                    onClick={()=>{
			                    	props.delete(i)
			                    }}
			                    className="mdui-btn mdui-btn-icon mdui-text-color-white">
		                       <i className="mdui-icon material-icons">close</i>
		                    </button>
		                </div>
		            </div>
		        </div>
			))
		}</div>
	)
}

function Preview(props){
	if(!props.res)return null
	return(
		<img className="mdui-img-fluid" src={ props.res }/>
	)
}


class Ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assests: [],
			direction:0,
			res:null
		}
	}
	render(){
		const { assests, res, direction } = this.state;
		return(
			<React.Fragment>
			    <Alubm 
				    assests={assests}
				    delete={i=>{
				    	assests.splice(i,1);
	                    this.setState({assests:assests})					    	
				    }} 
				    />
			    <br></br>
			    <FileRead 
	                fileType="image/*"
	                multiple={true}
	                onFileChange={ file =>{
	                	assests.push(file)
	                    this.setState({assests:assests})
	                }}
	            />		            
	            <br></br><br></br>
	            <Preview src={res} />
				<ListControlMenu
					icon="screen_rotation"
					text="拼接方向"
					checked={this.state.direction}
					onCheckedChange={checked=>{
						this.setState({direction:checked})
					}}
					items={[
						{
							name:'横向',
							value:'x'
						},{
							name:'纵向',
							value:'y'
						}
					]}
				/>
	            <button
		            className="mdui-fab mdui-fab-fixed mdui-color-theme"
		            onClick={()=>{
		            	switch(direction){
		            		case 0:
			            		imgMosaic_X(assests, res => {
									this.setState({
										res: res
									})
								})
								break;
							case 1:
			            		imgMosaic_Y(assests, res => {
									this.setState({
										res: res
									})
								})
								break;
		            	}
		            }}>
		            <i class="mdui-icon material-icons">&#xe5ca;</i>
	            </button>	
	            <Preview res = {res}/>            
		    </React.Fragment>
		)
	}
}

export default Ui