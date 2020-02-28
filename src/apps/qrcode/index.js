import React from 'react'
import QRCode from 'qrcode'

import TextInput from '../../utils/mdui-in-react/TextInput'
import Color from '../../utils/mdui-in-react/ColorInput'
import RangeInput from '../../utils/mdui-in-react/RangeInput'

const create = (opts, text, callback) => {
	QRCode.toDataURL(text, opts, (err, url) => {
		if (err) throw err
		callback && callback(url)
	})
}

const ModeSelect = props =>{
  return(
    <select 
	    onChange={e=>props.onChange(e.target.value)} 
	    className="mdui-m-l-6 mdui-select" mdui-select="true">
      <option value="text">文本</option>
      <option value="wifi">WIFI</option> 
    </select>
  ) 
}


const TextMode = props =>{
	const icon = (props.icon)?
	<i className="mdui-icon material-icons">font_download</i>
	:
	null;
	return(
		<div className="mdui-textfield mdui-textfield-floating-label">
            {icon}
            <label className="mdui-textfield-label">输入文本</label>
            <input 
                onChange={e=>{
                    props.onTextChange(e.target.value)
                }} 
                value={props.text}
                autoFocus={true} type="text" className="mdui-textfield-input">
            </input>
        </div>
	)
}

class Ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text:'',
			wifi:{
				account:'',
				pwd:''
			},
			mode:'text',
			colorLight:'#ffffff',
			colorDark:'#000000',
			width:'100',
			qrcode:null
		}		
	}
	render(){
		const {text, colorDark, colorLight, qrcode, mode, wifi, width} = this.state
		var form;
		if(mode === 'text'){
			var form = (
				<TextInput
					onTextChange={newText=>{
						this.setState({text:newText})
					}}
					header="输入文本"
					icon="font_download"
					value={text}
				/>)
		}else{
			var form =(
				<React.Fragment>
				<TextInput
					onTextChange={newText=>{
						this.setState({
							wifi:{
								account:newText,
								pwd:wifi.pwd
							}
						})
					}}
					header="账号(SSID)"
					icon="account_circle"
					value={wifi.account}
				/>
				<TextInput
					onTextChange={newText=>{
						this.setState({
							wifi:{
								account:wifi.account,
								pwd:newText
							}
						})
					}}
					header="密码"
					icon="vpn_key"
					value={wifi.pwd}
				/>
				</React.Fragment>
			)
		}			
		return(
			<React.Fragment>
				<ModeSelect onChange={mode => this.setState({mode:mode})} />
				{form}
				<RangeInput 
				    default={width}
					min="50" max="200"
					onValueChange={newValue=>{
						this.setState({width:newValue})
					}}
					title={"大小" + width + "px"}
				/>				
				<div className="mdui-row-xs-2">
					<div className="mdui-col">
					<Color
						text="亮色"
						color={colorLight}
						onColorChange={newColor=>{
							this.setState({colorLight:newColor})
						}}
					/>
					</div>					
					<div className="mdui-col">
					<Color
						text="暗色"
						color={colorDark}
						onColorChange={newColor=>{
							this.setState({colorDark:newColor})
						}}
					/>
					</div>
				</div>
				<button
					onClick={()=>{
						var opts = {
							errorCorrectionLevel: 'H',
							type: 'image/jpeg',
							quality: 0.3,
							margin: 1,
							width:width,
							color: {
								dark: colorDark,
								light: colorLight
							}
						}
						const string = (mode === 'wifi')?`WIFI:S:${wifi.account};P:${wifi.pwd};T:;H:;`:((text === '')?'ygktool.cn':text)
						const callback = qrcode =>{
							this.setState({qrcode:qrcode})
						}
						create(opts,string,callback)
					}}
					className="mdui-color-theme mdui-fab mdui-fab-fixed"
				><i class="mdui-icon material-icons">&#xe5ca;</i></button>
				<img src={qrcode}></img>
			</React.Fragment>
		)
	}
}

export default ()=><Ui />;
