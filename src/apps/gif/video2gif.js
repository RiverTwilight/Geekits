import React from 'react'
import mdui from 'mdui'
import GIF from 'gif.js'

import Input from '../../components/Input.tsx'
import FileRead from '../../components/FileReader'

function engine(file, config, videoRef, callback) {

	var v = videoRef,
		delay = config.delay * 100 || 200,
		gif = new GIF({
			workers: 4,
			quality: 10,
			width: v.videoWidth,
			height: v.videoHeight,
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
		var reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = e => {
			callback(e.target.result)
		}

		/*
				saveFile({
                    file: blob,
                    filename: "ygktool-gif.gif"
                })*/
	})

	gif.on('progress', function(p) {		
	})

	v.play()
}

//预览图片
const Preview = ({src}) => {
	if(!src)return null
    const element = <img alt="预览" height="100%"width='100%' src={src} />;
    return element
}

class Video2Gif extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			config: {
				delay: 1
			},
			onConv:false,
			res:null
		}
	}
	componentDidUpdate(){
		mdui.mutation() 
	}
	render(){
		var { file, config, onConv, res } = this.state;
		var button = (onConv)?
			<div style={{marginTop:'7px'}} className="mdui-spinner"></div>
			:
		    <i className="mdui-icon material-icons">&#xe5ca;</i>;
		return(
			<>
			    <video
					style={{display:file?'block':'none'}}
				    ref={r => this.videoDom = r}
				    className="mdui-video-fluid" src={file}>
				</video>
				<Input
					header="速度(数值越低速度越快，建议使用默认值)"
					value={config.delay}
					onValueChange={newText=>{
						this.setState({config:{delay:newText}})
					}}
					type="number"
				/>
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
		            	engine(file,config,this.videoDom,blob=>{
		            		this.setState({
								onConv:false,
								res:blob
							})
		            	})
		            }}>
		            {button}			        
	            </button>   
				<br></br> 
				<Preview src={res}/>
		    </>
		)
	}
}

export default Video2Gif