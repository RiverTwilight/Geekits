import React from 'react'
import mdui from 'mdui'

import FileRead from '../../utils/fileread'
import RangeInput from '../../utils/mdui-in-react/RangeInput'

async function loadImg(src){
	var img = await new Image();
	img.src = src;
	return img
}

const compress = async (base64, quality, cb, type) => {
	var image = await loadImg(base64);
	var canvas = document.createElement('canvas'),
		context = canvas.getContext('2d'),
		imageWidth = image.width * quality, //压缩后图片的大小
		imageHeight = image.height * quality;

	canvas.width = imageWidth
	canvas.height = imageHeight

	context.drawImage(image, 0, 0, imageWidth, imageHeight)
	var data = canvas.toDataURL(type);
	cb && cb(data)
}

class Ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file:null,
			type:'.jpg',
			res:null,
			quality:0.5
		}
	}
	render(){
		const { file, quality, res, type } = this.state;
		return(
			<React.Fragment> 
				<center>
					<FileRead 
						fileType="image/*"
						multiple={false}
						onFileChange={(data, file)=>{
							this.setState({
								file:data,
								type:file.type
							})
						}}
						maxWidth="200px"
					/>
				</center>
				<RangeInput 
				    value={quality}
					min={0.1} max={1} step={0.1}
					onValueChange={newValue=>{
						this.setState({quality:Number(newValue)})
					}}
					title={`压缩比率${quality * 100}%`}
				/>	
                <button 
	                onClick={()=>{
	                	compress(file,quality,(res)=>{
	                		this.setState({res:res})
	                	}, type)
	                }}
	                disabled={file === null}
	                className="mdui-fab mdui-color-theme-accent mdui-fab-fixed">
	                <i class="mdui-icon material-icons">check</i>
                </button>
                <img src={res} className="mdui-img-fluid" />
			</React.Fragment>
		)  	
	}
}

export default ()=><Ui />;