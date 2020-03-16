import React, {Component} from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import JSZip from 'jszip'
import { dataURLtoFile, saveFile } from '../../utils/fileSaver'

//读取文件组件
import FileRead from '../../utils/fileread'

const cropper = React.createRef(null);

class ImgCropper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
    _crop(){
    	var img = this.refs.cropper.getCroppedCanvas().toDataURL()
	    this.props.onCropperChange(img)
	}
	render(){
		console.log(this.props.ifHide)
		if(this.props.ifHide)return null
		return(
			<Cropper
		        ref='cropper'
		        src={this.props.file}
		        style={{height: 400, width: '100%'}}
		        aspectRatio={1 / 1}
		        guides={true}
		        crop={this._crop.bind(this)}
		     />
		)
	}
}


//切图
function Split(src,onCompleted) {
	var image = new Image();
	image.src = src;
	image.onload = () => {
		var numColsToCut = 3;
		var numRowsToCut = 3;
		var widthOfOnePiece = image.width / 3;
		var heightOfOnePiece = image.height / 3;
		var imagePieces = [];
		for (var y = 0; y < numColsToCut; ++y) {
			for (var x = 0; x < numRowsToCut; ++x) {
				var canvas = document.createElement('canvas');
				canvas.width = widthOfOnePiece;
				canvas.height = heightOfOnePiece;
				var context = canvas.getContext('2d');
				context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
				imagePieces.push(canvas.toDataURL());
			}
		}
		onCompleted &&　onCompleted(imagePieces)
	}
}

const Gallary = ({res}) => {
	if (res === [])return null
	return(
		<div className="mdui-row-xs-3 mdui-row-sm-4 mdui-row-md-5 mdui-row-lg-6 mdui-row-xl-7 mdui-grid-list">
        {res.map((a,i)=>(
			<div key={i} className="mdui-col">
				<div className="mdui-grid-tile">
					<img src={a}/>
				</div>
			</div>
	    ))}
        </div>
	)
}

class Ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file:null,
			res:[],
			cropperCache:null,
			ifHideCropper:true
		}
	}
	render(){
		const { file, ifHideCropper } = this.state;
		return(
			<> 
				<center>
					<FileRead 
						fileType="image/*"
						multiple={false}
						onFileChange={file=>{
							this.setState({
								file:file,
								ifHideCropper:false
							})
						}}
					/>
				</center>
				<ImgCropper
					ifHide={ifHideCropper}
					onCropperChange={newImg=>{
						this.setState({cropperCache:newImg})
					}}
				    file={file}
				/>
				<button
				    disabled={file === null}
				    onClick={()=>{
						Split(this.state.cropperCache, res => {
							this.setState({
								res: res,
								ifHideCropper: true
							})
							var zip = new JSZip();
							res.map((img, i) => {
								zip.file(i + 1 + ".png", dataURLtoFile(img, i + 1 + '.png'))
							})
							zip.generateAsync({
								type: "blob"
							}).then(content => {
								saveFile({
	                                file: content,
	                                filename: "ygktool.img_split.zip"
	                            })
							})
						})
				    }}
				    className="mdui-color-theme mdui-fab mdui-fab-fixed">
				    <i className="mdui-icon material-icons">check</i>					
				</button>
				<Gallary res={this.state.res} />
			</>
		)  	
	}
}

export default Ui
