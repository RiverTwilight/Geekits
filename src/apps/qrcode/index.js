import React from 'react'
import QRCode from 'qrcode'

import { ListControlMenu, Input, ColorInput, RangeInput } from 'mdui-in-react'

const create = (opts, text, callback) => {
	QRCode.toDataURL(text, opts, (err, url) => {
		if (err) throw err
		callback && callback(url)
	})
}

const Result = ({qrcode})=>{
	if(!qrcode)return null
	return(
		<div className="mdui-card mdui-p-a-1">
			<center><img src={qrcode}></img></center>
		</div>
	)
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

class Ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text:null,
			wifi:{
				account:null,
				pwd:null
			},
			mode:0,
			colorLight:'#ffffff',
			colorDark:'#000000',
			width:'100',
			qrcode:null
		}		
	}
	render(){
		const {text, colorDark, colorLight, qrcode, mode, wifi, width} = this.state
		var form;
		if(mode === 0){
			form = (
				<Input
					onValueChange={newText=>{
						this.setState({text:newText})
					}}
					header="输入文本"
					value={text}
				/>)
		}else{
			form =(
				<>
				<Input
					onValueChange={newText=>{
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
				<Input
					onValueChange={newText=>{
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
				</>
			)
		}			
		return(
			<>
				<div className="mdui-card mdui-p-a-1">
					<ListControlMenu
                        icon="language"
                        text="识别类型"
                        checked={mode}
                        onCheckedChange={checked=>{
                            this.setState({mode:checked})
                        }}
                        items={[{
							name:'文本',
							value:'text'
						},{
							name:'wifi',
							value:'wifi'
						}]}
                    />
					{form}
					<RangeInput 
						value={width}
						min="50" max="200"
						onValueChange={newValue=>{
							this.setState({width:newValue})
						}}
						title={"大小" + width + "px"}
					/>				
					<div className="mdui-row-xs-2">
						<div className="mdui-col">
						<ColorInput
							text="亮色"
							color={colorLight}
							onColorChange={newColor=>{
								this.setState({colorLight:newColor})
							}}
						/>
						</div>					
						<div className="mdui-col">
						<ColorInput
							text="暗色"
							color={colorDark}
							onColorChange={newColor=>{
								this.setState({colorDark:newColor})
							}}
						/>
						</div>
					</div>
				</div>
				<br></br>
				<Result qrcode={qrcode} />
				<button
					onClick={_=>{
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
						const string = (mode === 1)?`WIFI:S:${wifi.account};P:${wifi.pwd};T:;H:;`:((text === '')?'ygktool.cn':text)
						const callback = qrcode =>{
							this.setState({qrcode:qrcode})
						}
						create(opts,string,callback)
					}}
					className="mdui-color-theme mdui-fab mdui-fab-fixed"
				>
					<i class="mdui-icon material-icons">&#xe5ca;</i>
				</button>
			</>
		)
	}
}

export default Ui
