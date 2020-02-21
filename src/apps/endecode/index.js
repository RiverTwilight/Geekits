import React, { Component, createRef, forwardRef } from 'react'
import mdui from 'mdui'
import dic from './dictionary'
import ClipboardJS from 'clipboard'

/**
  *2020-2-7 江村暮
  */

//下拉选择
function Selector(props) {
	var options = props.opt.map(a=>{
		return(
      <option value={a.value}>{a.text}</option>
    )
	})
	return(
		<select 
		  onChange={e=>{
		  	props.onOptionChange(e.target.value)
		  }}
		  value={props.val} className="mdui-select" mdui-select='true'>
      {options}
    </select>
	)
}

//文本输入框
const TextInput = forwardRef((props,ref) => (
		<div className="mdui-col box mdui-textfield">
            <textarea
            ref={ref} value={props.text}
            onChange={e=>{
            	props.onTxetChange(e.target.value)
            }}
            autoFocus rows="5" className="mdui-textfield-input"
            type="text" placeholder="输入内容或拖入文件"></textarea>    
        </div>
	)
)

//密钥输入框
function KeyInput(props){
	return(
		<div className="mdui-col mdui-textfield">
      <input
        placeholder="输入密钥（可选)"
        onChange={e=>{
        	props.onTxetChange(e.target.value)
        }}
        className="mdui-textfield-input" type="text">
       </input>    
    </div>
	)

}
//结果展示框
function PrintRes(props){
	if (props.res !== '') {
		var res = props.res;
		switch (props.to) {
			case 'text':
				var showRes = res.text
				break;
			case 'url':
				var showRes = res.url
				break;
			case 'moss':
				var showRes = res.moss
				break;
			case 'md5':
				var showRes = res.md5
				break;
			case 'rc4':
				var showRes = res.rc4
				break;
      case 'URLcomponent':
        var showRes = res.URLcomponent
        break;
			default:
			  var showRes = 'sdff'
		}
	}else{
		var showRes = ''
	}
  return(
  	<div className="mdui-card mdui-col mdui-textfield">
      <div  data-clipboard-text={String(showRes)} style={{height:'130px'}} id="becopy"className="mdui-typo mdui-dialog-content mdui-p-a-2">
      {String(showRes)/**/}
      </div>
    </div>
  )
}

class Ui extends React.Component {
	constructor(props) {
    super(props);
    this.dropBox = createRef()
		this.state = {
			fromType:'text',
			toType:'md5',
			text:'',
			key:'',
			res:'',
			options: [{
				text: '正常文本',
				value: 'text'
			},{
				text: 'RC4',
				value: 'rc4'
			},{
				text: '摩斯电码',
				value: 'moss'
			},{
				text: 'MD5',
				value: 'md5'
			}, {
				text: 'URL',
				value: 'url'
			}, {
        text: 'URLcomponent',
        value: 'URLcomponent'
      }]
		}
    }
    componentDidMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#becopy');
        clipboard.on('success', e=> {
            mdui.snackbar({message:'已复制结果'})
            e.clearSelection();
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
  	const { text, fromType, options, toType, key } = this.state
  	return(
      <React.Fragment>
  		<center style={{margin:'0 auto'}}>
  		  <Selector
  		    onOptionChange={val=>{
  		    	this.setState({fromType:val})
  		    }}
  		    val={fromType}
  		    opt={options}
  		  />
  		  <button 
  		    style={{margin:'0px 30px 0px 30px'}}
  		    className="mdui-btn mdui-btn-icon"
  		    onClick={e=>{}}>
  		    <i className=" mdui-icon material-icons">arrow_forward</i>
  		  </button>
  		  <Selector
  		    onOptionChange={val=>{
  		    	this.setState({toType:val})
  		    }}
  		    val={toType}
  		    opt={options}
  		  />
  		</center>
  		<KeyInput onTxetChange={newText=>{this.setState({key:newText})}} />
  		<div className="mdui-row-md-2">
  		  <TextInput 
              text={text} ref={this.dropBox} 
              onTxetChange={newText=>{this.setState({text:newText})}} />
  		  <center>
  		    <button
  		      onClick={()=>{
  		      	//console.log(dic(this.state.from,this.state.text,this.state.key))
  		      	this.setState({res:dic(fromType,text,key)})
  		      }} className="mdui-color-theme mdui-btn mdui-ripple">
            <i className="mdui-icon-left mdui-icon material-icons">translate</i>
            转换
          </button>
        </center>
        <br></br>
        <PrintRes
          res={this.state.res}
          to={toType}
        />
  		</div>
  		</React.Fragment>
  	)

  }
}

export default ()=><Ui />
