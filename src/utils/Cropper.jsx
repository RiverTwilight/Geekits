import React from 'react';
import mdui from 'mdui'
import PropTypes from 'prop-types'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

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
        return(
            <Cropper
                ref='cropper'
                src={this.props.file}
                style={{height: 500, width: '100%'}}
                //aspectRatio={1 / 1}
                //guides={true}
                crop={this._crop.bind(this)}
             />
        )
    }
}

class CropWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            xScaled:false,
            yScaled:false
        }
    } 
    render(){
        const { xScaled, yScaled } = this.state
    	const { ifShow, title, cropper, onClose, onConfirm, img } = this.props
    	//用return null会每次重载图片
        return (
            <span style={{display:(!ifShow)?'none':'block'}}>
                <header className="mdui-shadow-0 header mdui-appbar mdui-appbar-fixed">
                    <div className="mdui-shadow-0 mdui-appbar">
                        <div className="mdui-shadow-0 mdui-toolbar mdui-color-theme">
                            <button 
	                            onClick={()=>{
	                            	onClose()
	                            }}
                                className="mdui-btn mdui-btn-icon mdui-text-color-white">
                                <i className="mdui-icon material-icons">arrow_back</i>
                            </button>
                            <div className="mdui-typo-title mdui-text-color-white">
                                {title}                               
                            </div>
                            <div className="mdui-toolbar-spacer"></div>
                            <button 
                                mdui-menu="{target: '#scale-menu',covered:false}"
                                className="mdui-text-color-white mdui-btn mdui-btn-icon"
                                >
                                <i className="mdui-icon material-icons">flip</i>
                            </button>               
                            <ul className="mdui-menu" id="scale-menu">
                                <li className="mdui-menu-item">
                                    <a 
                                    onClick={()=>{
                                        const { cropper } = this.refs.cropper.refs.cropper
                                        if (xScaled) {
                                            cropper.scaleX(1,-1)
                                        } else {
                                            cropper.scaleX(-1,1)
                                        }
                                        this.setState({xScaled:!xScaled})
                                    }}
                                    >水平翻转</a>
                                </li>
                                <li className="mdui-menu-item">
                                    <a 
                                    onClick={()=>{
                                        const { cropper } = this.refs.cropper.refs.cropper
                                        if (yScaled) {
                                            cropper.scaleY(1,-1)
                                        } else {
                                            cropper.scaleY(-1,1)
                                        }
                                        this.setState({yScaled:!yScaled})
                                    }}
                                    >竖直翻转</a>
                                </li>
                            </ul>
                            <button 
                                onClick={()=>{
                                    this.refs.cropper.refs.cropper.cropper.rotate(90)                                   
                                }}
                                className="mdui-btn mdui-btn-icon mdui-text-color-white">
                                <i className="mdui-icon material-icons">rotate_left</i>
                            </button>
                            <button 
                                onClick={()=>{
                                    onConfirm(this.state.cropperCache)
                                }}
                                className="mdui-btn mdui-btn-icon mdui-text-color-white">
                                <i className="mdui-icon material-icons">check</i>
                            </button>
                        </div>
                    </div>        
                </header>
                <ImgCropper
                    ref="cropper"
                    getCropper={ref=>{
                        this.setState({cropper:ref})
                    }}
                    onCropperChange={newImg=>{
                        this.setState({cropperCache:newImg})
                    }}
                    file={img}
                />
            </span>
        )
    }  
}

export default CropWindow