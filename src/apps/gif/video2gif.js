import React from 'react'
import mdui from 'mdui'
import saveFile from '../../utils/fileSaver'
import GIF from 'gif.js'

import FileRead from '../../utils/fileread'

function engine(file, config, videoRef, callback) {

	var v = videoRef,
		delay = config.delay * 100 || 200,
		gif = new GIF({
			workers: 4,
			quality: 10,
			width: v.offsetWidth,
			height: v.offsetHeight,
			workerScript:'/gif.worker.js'			
		}),
        i

	v.addEventListener('play', () => {		
		mdui.snackbar({
			message: '视频渲染中，请等待视频播放完毕'
		})
		i = window.setInterval(() => {
			gif.addFrame(v, {
				copy: true,
				delay: i
			});
		}, delay);
	}, false)

	v.addEventListener('ended', () => {
		clearInterval(i)
		gif.render()
	}, false)

	gif.on('start', (blob) => {
	})

	gif.on('finished', (blob) => {
		//loadRef.style.display = 'none'
		console.log(URL.createObjectURL(blob));
		callback()
		mdui.snackbar({
			timeout: 0,
			message: '制作完成',
			buttonText: '下载',
			onButtonClick: () => {
				saveFile({
                    file: blob,
                    filename: "ygktool-gif.gif"
                })
			}
		})
	})

	gif.on('progress', function(p) {		
	})

	v.play()
}


class Video2Gif extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			config: {
				delay: 3
			},
			onConv:false
		}
	}
	componentDidUpdate(){
		mdui.mutation() 
	}
	render(){
		var { file, config, onConv } = this.state;
		var button = (onConv)?
			<div style={{marginTop:'7px'}} class="mdui-spinner"></div>
			:
		    <i class="mdui-icon material-icons">&#xe5ca;</i>;
		return(
			<React.Fragment>
			    <video
				    ref="video"
				    class="mdui-video-fluid" src={file}>
				</video>
				<div className="mdui-textfield">
					<label className="mdui-textfield-label">速度(数值越低速度越快，建议使用默认值)</label>
					<input 
						value={config.delay}
						onChange={e=>{
							this.setState({config:{delay:e.target.value}})
						}}
						className="mdui-textfield-input" type="number"/>
				</div>
				<FileRead 
				    fileType="video/*"
				    multiple={false}
				    onFileChange={ video =>{
				        this.setState({file:video})
				    }}
				/>	  
				<button
		            className="mdui-fab mdui-fab-fixed mdui-color-theme"
		            disabled={onConv}
		            onClick={()=>{
		            	this.setState({onConv:true})
		            	engine(file,config,this.refs.video,()=>{
		            		this.setState({onConv:false})
		            	})
		            }}>
		            {button}			        
	            </button>    
		    </React.Fragment>
		)
	}
}

export default Video2Gif