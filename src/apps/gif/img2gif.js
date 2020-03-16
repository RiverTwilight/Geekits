import React from 'react'
import mdui from 'mdui'
import GIF from 'gif.js'

import FileRead from '../../utils/fileread'

//图片转gif配置对话框
class ImgSetting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			form:[{
				name: '高度（留空则自适应）',
				value:""
			}, {
				name: '宽度（留空则自适应）',
				value:""
			}, {
				name: '质量（数值越低质量越好）',
				value:"10"
			}, {
				name: '每一帧间隔（秒）',
				value:"1"
			}],
		}		
	}
	onValueChange(i,value){
		var { form } = this.state;
		form[i].value = value;
		this.setState({form:form})
	}
	render(){
		const { form } = this.state;

	    return(
		<div className="mdui-dialog" id="setting"> 
		    <div className="mdui-dialog-title">设置</div> 
		    <div className="mdui-dialog-content">{
		    form.map((a,i)=>(
				<div key={i} className="mdui-textfield">
					<label className="mdui-textfield-label">{a.name}</label>
					<input 
						value={a.value}
						onChange={e=>{
							this.onValueChange(i,e.target.value)
						}}
						className="mdui-textfield-input" type="number"/>
				</div>
		    ))
		    }</div> 
		    <div className="mdui-dialog-actions"> 
		        <button className="mdui-btn mdui-ripple" mdui-dialog-close="">关闭</button> 
		        <button
			        onClick={()=>{
						var data = {
							height: (form[0].value === "")?null:form[0].value,
							width: (form[1].value ==="")?null:form[1].value,
							quality: form[2].value,
							delay: form[3].value * 1000
						}
			        	this.props.saveConfig(data)
			        }} 
			       className="mdui-btn mdui-ripple" mdui-dialog-confirm="">保存</button> 
		    </div>
		</div> 
		)
	}
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

function img2gif(assests, config, loadRef, callback) {
	var image = new Image(); //载入图片获取真实尺寸
	image.src = assests[0];
	image.onload = function() {
		const { height, width, quality, delay} = config;

		console.table({
			delay: delay,
			height: height,
			width: width,
			quality: quality,
		})

		var gif = new GIF({
			workers: 2,
			quality: quality,
			height: height,
			width: width,
			workerScript:'/gif.worker.js'
		})

		assests.map((src,i)=>{
			let img = document.createElement('img');
			img.src = src;
			console.log(img)
			gif.addFrame(img, {
				delay: delay
			})
		})

		gif.on('finished', function(blob) {
			loadRef.style.display = 'none';
			console.log(blob)
			callback(URL.createObjectURL(blob))
		})

		gif.on('start', function(blob) {
			loadRef.style.display = 'block'
		})

		gif.render();
	}
}

const Preview = ({src}) => {
	if(!src)return null
	return(
		<img className="mdui-img-fluid" src={src}/>
	)
}

class Img2Gif extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assests: [],
			config: {
				height: null,
				width: null,
				quality: 10,
				delay: 1000
			},
			res:null
		}
	}
	render(){
		var { assests, config, res } = this.state;
		return(
			<>
				<span ref="load" style={{display:'none',position:'absolute',top:'0'}} className="mdui-progress">
		            <div className="mdui-progress-indeterminate"></div>
		        </span>
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
	            <button
		            mdui-dialog="{target: '#setting',history:false}"
		            style={{marginLeft:'5px'}}
		            className="mdui-btn mdui-btn-raised mdui-color-theme"
		        >
		            修改配置
	            </button>
	            <br></br><br></br>
	            <Preview src={res} />
	            <button
		            className="mdui-fab mdui-fab-fixed mdui-color-theme"
		            onClick={()=>{
		            	img2gif(assests, config, this.refs.load, res=>{
		            		this.setState({res:res})
		            	})
		            }}>
		            <i class="mdui-icon material-icons">&#xe5ca;</i>
	            </button>
	            <ImgSetting 
			    	saveConfig={config=>{
			            this.setState({config:config})
			        }}
			    />		            
		    </>
		)
	}
}

export default Img2Gif