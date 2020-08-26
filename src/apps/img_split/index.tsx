import React, {Component} from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-cropper` if it exist... Remove this comment to see the full error message
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import JSZip from 'jszip'
import { dataURLtoFile, saveFile } from '../../utils/fileSaver'

//读取文件组件
import { FileInput } from 'mdui-in-react'

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
const cropper = React.createRef(null);

type ImgCropperState = any;

class ImgCropper extends React.Component<{}, ImgCropperState> {
	constructor(props: {}) {
		super(props);
		this.state = {
		}
	}
    _crop(){
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getCroppedCanvas' does not exist on type... Remove this comment to see the full error message
    	var img = this.refs.cropper.getCroppedCanvas().toDataURL()
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onCropperChange' does not exist on type ... Remove this comment to see the full error message
	    this.props.onCropperChange(img)
	}
	render(){
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifHide' does not exist on type 'Readonly... Remove this comment to see the full error message
		console.log(this.props.ifHide)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifHide' does not exist on type 'Readonly... Remove this comment to see the full error message
		if(this.props.ifHide)return null
		return(
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<Cropper
		        ref='cropper'
// @ts-expect-error ts-migrate(2339) FIXME: Property 'file' does not exist on type 'Readonly<{... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'src' implicitly has an 'any' type.
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
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
				context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
				imagePieces.push(canvas.toDataURL());
			}
		}
		onCompleted &&　onCompleted(imagePieces)
	}
}

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'res' implicitly has an 'any' type... Remove this comment to see the full error message
const Gallary = ({res}) => {
	if (res === [])return null
	return(
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="mdui-row-xs-3 mdui-row-sm-4 mdui-row-md-5 mdui-row-lg-6 mdui-row-xl-7 mdui-grid-list">
        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type. */}
        {res.map((a,i)=>(
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div key={i} className="mdui-col">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div className="mdui-grid-tile">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<img src={a}/>
				</div>
			</div>
	    ))}
        </div>
	)
}

type UiState = any;

class Ui extends React.Component<{}, UiState> {
	constructor(props: {}) {
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
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<> 
{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
				<center>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<FileInput 
						fileType="image/*"
						multiple={false}
						onFileChange={file=>{
							this.setState({
								file:file,
								ifHideCropper:false
							})
						}}
					/>
{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
				</center>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<ImgCropper
// @ts-expect-error ts-migrate(2322) FIXME: Property 'ifHide' does not exist on type 'Intrinsi... Remove this comment to see the full error message
					ifHide={ifHideCropper}
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newImg' implicitly has an 'any' type.
					onCropperChange={newImg=>{
						this.setState({cropperCache:newImg})
					}}
				    file={file}
				/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<button
				    disabled={file === null}
				    onClick={()=>{
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'res' implicitly has an 'any' type.
						Split(this.state.cropperCache, res => {
							this.setState({
								res: res,
								ifHideCropper: true
							})
							var zip = new JSZip();
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'img' implicitly has an 'any' type.
							res.map((img, i) => {
								zip.file(i + 1 + ".png", dataURLtoFile(img, i + 1 + '.png'))
							})
							zip.generateAsync({
								type: "blob"
							}).then(content => {
// @ts-expect-error ts-migrate(2345) FIXME: Property 'type' is missing in type '{ file: Blob; ... Remove this comment to see the full error message
								saveFile({
	                                file: content,
	                                filename: "ygktool.img_split.zip"
	                            })
							})
						})
				    }}
				    className="mdui-color-theme mdui-fab mdui-fab-fixed">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				    <i className="mdui-icon material-icons">check</i>					
				</button>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<Gallary res={this.state.res} />
			</>
		)  	
	}
}

export default Ui
