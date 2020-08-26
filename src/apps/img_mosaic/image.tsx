import React from 'react'
import { FileInput, ListControlMenu } from 'mdui-in-react'

async function loadImg(src: any){
	var img = await new Image();
	img.src = src;
	return img
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'assests' implicitly has an 'any' type.
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
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
		ctx.drawImage(imgs[j], startX, 0, imgs[j].width, imgs[j].height);
		startX += imgs[j].width;
	}
	
	var res = c.toDataURL()
	console.log(res);
	callback(res)
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'assests' implicitly has an 'any' type.
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
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
		ctx.drawImage(imgs[j], 0, startY, imgs[j].width, imgs[j].height);
		startY += imgs[j].height;
	}
	
	var res = c.toDataURL()
	console.log(res);
	callback(res)
}

//预览相册组件
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const Alubm = (props) => {	
	return(

		<div className="mdui-row-xs-3">{
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
function Preview(props){
	if(!props.res)return null
	return(

		<img className="mdui-img-fluid" alt="结果" src={ props.res }/>
	)
}

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
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

			<>

			    <Alubm 
				    assests={assests}
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
				    delete={i=>{
				    	assests.splice(i,1);
	                    this.setState({assests:assests})					    	
				    }} 
				    />

			    <br></br>

			    <FileInput 
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
					title="拼接方向"
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'res' implicitly has an 'any' type.
			            		imgMosaic_X(assests, res => {
									this.setState({
										res: res
									})
								})
								break;
							case 1:
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'res' implicitly has an 'any' type.
			            		imgMosaic_Y(assests, res => {
									this.setState({
										res: res
									})
								})
								break;
		            	}
		            }}>

		            <i className="mdui-icon material-icons">&#xe5ca;</i>
	            </button>	

	            <Preview res = {res}/>            
		    </>
		)
	}
}
