import React from 'react'
import { snackbar } from 'mdui'

import FileRead from '../../components/fileread'
import './caption.css'

class captionMosaic {
	constructor() {
		this.img = [];
		this.cutedImg = []
	}
	async loadImg(base64) {
		var img = await new Image();
		img.src = base64;
		return img
	}
	addImg(base64, top, bottom) {
		this.img.push({
			base64,
			top,
			bottom
		})
	}
	async cutImg(base64, top, bottom) {
		var cutWork = document.createElement('canvas')
		, workCtx = cutWork.getContext('2d')
		, ele = await this.loadImg(base64);

		top *= ele.height;
		bottom *= ele.height;
        
		cutWork.height = ele.height - top - bottom;
		cutWork.width = ele.width

		console.log(`
			the image is ${ele.width} x ${ele.height},
			cut starts at (0,${top}),
			cut height is ${ele.height - top - bottom}
		`)

		workCtx.drawImage(ele, 0, top, ele.width, ele.height - top - bottom, 0, 0, ele.width,  ele.height - top - bottom)

        var res = cutWork.toDataURL();
        console.log(res)
		return res
	}
	async imgMosaic_Y() {
		for (var i = 0; i <= this.img.length - 1; i++) {
			let {
				top,
				bottom,
				base64
			} = this.img[i];
			this.cutedImg.push(await this.cutImg(base64, top, bottom))
		}
		console.log(this.cutedImg)

		var c = document.createElement('canvas')
		var ctx = c.getContext("2d");

		var imgs = [];
		c.width = 0;
		c.height = 0;

		for (var i = 0; i <= this.cutedImg.length; i++) {
			var ele = await this.loadImg(this.cutedImg[i]);
			c.height += ele.height;
			if (ele.width > c.width) c.width = ele.width;
			imgs.push(ele);
		}

		var startY = 0;

		for (let j = 0; j <= imgs.length - 1; j++) {
			ctx.drawImage(imgs[j], 0, startY, imgs[j].width, imgs[j].height);
			startY += imgs[j].height;
		}

		var res = c.toDataURL()
		return res
	}
}

const Preview = ({res}) => {
	if(!res)return null
	return(
		<img className="mdui-img-fluid" src={ res }/>
	)
}

class Alubm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startPosition:0
		}
	}
	render(){
		const { assests, onTopDrag, onBottomDrag, deleteImg  } = this.props;
		const { startPosition } = this.state;
		return(
			<div className="mdui-row-xs-1">
			{
				assests.map((assest,i)=>(	
					<div style={{marginTop:'5px'}} className="mdui-card mdui-col">
						<div key={i} className="mdui-card-media mdui-center">
			                <img onLoad={e=>{
			                	this.props.getConHeight(e.target.offsetHeight,i)
			                }} src={assest.img}/>
				            {/****************/}
			                <span 
				                draggable={true}
				                onDragStart={e=>{
				                    e.pageY >= 0 && this.setState({startPosition:e.pageY})				                    
				                }}
				                onDrag={e=>{
				                    var distance = e.pageY - startPosition;   
				                    console.log(distance);
				                    e.pageY > 0 && onTopDrag(distance,i);
				                    e.pageY > 0 && this.setState({startPosition:e.pageY})			                     
			                    }}
				                onTouchStart={e=>{
				                    var ev = e || window.event;
				                    var touch = ev.targetTouches[0];
				                    this.setState({startPosition:touch.clientY})
				                }}
								onTouchMove={e=>{									
				                    var ev = e || window.event;
				                    var touch = ev.targetTouches[0];
				                    var distance = touch.clientY - startPosition;   
				                    console.log(distance);
				                    onTopDrag(distance,i);
				                    this.setState({startPosition:touch.clientY})			                     
			                    }}
				                style={{height:`${assest.top}px`}}
				                className="mask mask-top">
				            </span>
			                <span 			
				                draggable={true}			                	                
				                onDragStart={e=>{
				                    e.pageY >= 0 && this.setState({startPosition:e.pageY})				                    
				                }}
				                onDrag={e=>{
				                    var distance = e.pageY - startPosition;   
				                    console.log(distance);
				                    e.pageY > 0 && onBottomDrag(distance,i);
				                    e.pageY > 0 && this.setState({startPosition:e.pageY})			                     
			                    }}
				                onTouchStart={e=>{
				                	e.preventDefault();
				                    var ev = e || window.event;
				                    var touch = ev.targetTouches[0];
				                    this.setState({startPosition:touch.clientY})
				                }}
								onTouchMove={e=>{
									e.preventDefault();
				                    var ev = e || window.event;
				                    var touch = ev.targetTouches[0];
				                    var distance = touch.clientY - startPosition;   
				                    console.log(distance);
				                    onBottomDrag(distance,i);
				                    this.setState({startPosition:touch.clientY})			                     
			                    }}
				                style={{height:`${assest.bottom}px`}}
				                className="mask mask-bottom">
				            </span>
			                <div className="mdui-card-menu">
			                    <button 
				                    style={{background: 'rgba(0, 0, 0, 0.27)'}}
				                    onClick={()=>{
				                    	deleteImg(i)
				                    }}
				                    className="mdui-btn mdui-btn-icon mdui-text-color-white">
			                       <i className="mdui-icon material-icons">close</i>
			                    </button>
			                    <button 
				                    style={{display:(i>=1)?'block':'none'}}				                    
				                    onClick={()=>{
				                    	this.props.putForward(i)
				                    }}
				                    className="mdui-btn mdui-btn-icon mdui-text-color-white">
			                       <i className="mdui-icon material-icons">arrow_upward</i>
			                    </button>
			                    <button 
				                    style={{display:(i>=1 && i < assests.length - 1)?'block':'none'}}
				                    onClick={()=>{
				                    	this.props.putBack(i)
				                    }}
				                    className="mdui-btn mdui-btn-icon mdui-text-color-white">
			                       <i className="mdui-icon material-icons">arrow_downward</i>
			                    </button>
			                </div>
			            </div>
			        </div>
				))
			}		
			</div>					
		)
	}
}

class VideoShotter extends React.Component {
	render(){
		const { video, addImg } = this.props
	    if(!video)return null
	   	return(
	   		<>
		   		<video ref={r => this.video = r} className="mdui-video-fluid" controls>
				    <source src={video} type="video/mp4"/>
				</video>
				<br></br>
				<button
					className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme"
					onClick={()=>{
						var canvas = document.createElement('canvas');
						var video = this.video;
						var ctx = canvas.getContext('2d');
						canvas.width = video.videoWidth;
						canvas.height = video.videoHeight;
						ctx.drawImage(video,0,0,video.videoWidth,video.videoHeight)
						var res = canvas.toDataURL()
						addImg(res)
					}}
				>截图</button>
			</>
	   	)
	}
}

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assests: [],
			res:null,
			video:null
		}
	}
	render(){
		const { assests, res, video } = this.state;
		return(
			<>
			    <Alubm 
				    onTopDrag={(distance,i)=>{
				    	if(assests[i].top + distance >= 0)assests[i].top += distance;		    	
				    	this.setState({assests:assests})
				    }}
				    onBottomDrag={(distance,i)=>{
				    	if(assests[i].bottom - distance >= 0)assests[i].bottom -= distance;
				    	this.setState({assests:assests})
				    }}
				    getConHeight={(cHeight,i)=>{
				    	assests[i].cHeight = cHeight
				    }}
				    putForward={i=>{
				    	var cache = assests[i];
				    	assests.splice(i,1);
				    	assests.splice(i - 1,0,cache);
				    	this.setState({assests:assests})
				    }}
				    putBack={i=>{
				    	var cache = assests[i];
				    	assests.splice(i,1);
				    	assests.splice(i + 1,0,cache);
				    	this.setState({assests:assests})
				    }}
				    assests={assests}
				    deleteImg={i=>{
				    	assests.splice(i,1);
	                    this.setState({assests:assests})					    	
				    }} 
				/>
                <div
					className="bottom-dashboard mdui-card mdui-p-a-1">
				    <FileRead 
		                fileType="image/*"
		                multiple={true}
		                onFileChange={ file =>{
		                	assests.push({
		                		img:file,
		                		top:(assests.length >= 1)?(assests[0].cHeight - assests[0].bottom):50,
		                		bottom:(assests.length >= 1)?0:50,
		                		cHeight:200
		                	})
		                    this.setState({assests:assests})
		                }}
		            />
		            <span style={{margin:'0px 5px 0px 5px'}}></span>	
		            <FileRead 
		                fileType="video/*"
		                onFileChange={ file =>{
		                    this.setState({video:file})
		                }}
		                text="截取视频"
		            />		            
	            </div>
	            <VideoShotter 
		            video={video}
		            addImg={img=>{
		            	assests.push({
	                		img:img,
	                		top:(assests.length >= 1)?(assests[0].cHeight - assests[0].bottom):50,
	                		bottom:(assests.length >= 1)?0:50,
	                		cHeight:200
	                	})
	                    this.setState({assests:assests},()=>{
	                    	snackbar({
	                    		message:'已添加截图'
	                    	})
	                    })
		            }}
		        />
	            <button
					style={{zIndex: '1003'}}
		            className="mdui-fab mdui-fab-fixed mdui-color-theme"
		            onClick={()=>{
		            	var mos = new captionMosaic;
		            	assests.map(assest=>{
		            		mos.addImg(assest.img, assest.top/assest.cHeight, assest.bottom/assest.cHeight)
		            	})
		            	mos.imgMosaic_Y().then(res=>{
		            		this.setState({res:res},()=>{
		            			snackbar({message:'图片制作成功，请在页面底部查看'})
		            		})
		            	})
		            }}>
		            <i className="mdui-icon material-icons">&#xe5ca;</i>
	            </button>
                <br></br>	            
	            <Preview res = {res}/>            
		    </>
		)
	}
}

