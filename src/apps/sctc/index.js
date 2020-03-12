import React, { Component, createRef, forwardRef } from 'react'
import mdui from 'mdui'
import dic from './dictionary'
import ClipboardJS from 'clipboard'

//文本输入框
const TextInput = forwardRef((props,ref) => (
		<div className="mdui-col mdui-textfield">
            <textarea
                ref={ref} 
                onChange={e=>{
                	props.onTxetChange(e.target.value)
                }}
                value={ props.text }
                autoFocus rows="5" className="mdui-textfield-input"
                type="text" placeholder="输入内容或拖入文件">
            </textarea>    
        </div>
	)
)

//结果展示框
function PrintRes(props){
    return(
      	<div className="mdui-col mdui-textfield">
            <textarea 
                value={props.res}
                data-clipboard-text={String(props.res)} 
                rows="5" id="becopy"
                className="mdui-textfield-input">
            </textarea>
        </div>
    )
}

class Ui extends React.Component {
	constructor(props) {
        super(props);
    		this.state = {
            text:'',
            res:''
        }
        this.dropBox = createRef()
    }
    componentDidMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#becopy');
        clipboard.on('success', e=> {
            mdui.snackbar({message:'已复制结果'})
            e.clearSelection()
        })

        const { current } = this.dropBox;
        const update = text=>{
            this.setState({text:text})
        }

        document.ondrop = e=> {
            e.preventDefault()
        }
        document.ondragover = e=> {
            e.preventDefault()
        }
        current.ondragenter = ()=> {
            update('松开爪~')
        }
        current.ondragleave = ()=> {
            update('')
        }
        current.ondrop = function(e) {
            var dataFile = e.dataTransfer.files[0];
            var fr = new FileReader();
            fr.readAsText(dataFile, "gb2312");
            fr.onload = () => {
                update(fr.result)                
            }
        }
    }
    render(){
      	const { text } = this.state
      	return(
          <React.Fragment>
      	        <TextInput 
                    text={text}
                    ref={this.dropBox} 
                    onTxetChange={newText=>{
                        if(newText.indexOf('<') !== -1){
                            mdui.snackbar({message:'不能输入非法字符'})
                        }else{
                            this.setState({text:newText})
                        }                       
                    }} 
                />
      		    <center>
          		    <button
          		        onClick={()=>{
              		      	this.setState({res:dic.toSimpleChinese(text)})
          		        }} 
                        className="mdui-color-theme mdui-btn-raised mdui-btn mdui-ripple">
                    转为简体
                    </button>
                    <span style={{margin:'0px 5px 0px 5px'}}></span>
                    <button
                        onClick={()=>{
                            this.setState({res:dic.toTraditionChinese(text)})
                        }}
                        className="mdui-color-theme mdui-btn-raised mdui-btn mdui-ripple">
                    转为繁体
                    </button>
                </center>
                <br></br>
                <PrintRes
                    res={this.state.res}
                />
      		</React.Fragment>
      	)
    }
}

export default ()=><Ui />
