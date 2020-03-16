import React, { createRef, forwardRef } from 'react'
import mdui from 'mdui'
import dic from './dictionary'
import ClipboardJS from 'clipboard'
import { Select } from 'mdui-in-react'

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
const PrintRes = ({res, to}) => {
    var showRes
    if (res !== '') {       
        switch (to) {
            case 'text':
                showRes = res.text
                break;
            case 'url':
                showRes = res.url
                break;
            case 'moss':
                showRes = res.moss
                break;
            case 'md5':
                showRes = res.md5
                break;
            case 'rc4':
                showRes = res.rc4
                break;
            case 'URLcomponent':
                showRes = res.URLcomponent
                break;
            default:
                showRes = 'sdff'
        }
    } else {
        showRes = ''
    }
    return(
        <div className="mdui-card mdui-col mdui-textfield">
            <div data-clipboard-text={String(showRes)} style={{height:'130px'}} id="becopy"className="mdui-typo mdui-dialog-content mdui-p-a-2">
            {String(showRes)/**/}
            </div>
        </div>
    )
}

const options = [{
    name: '正常文本',
    value: 'text'
}, {
    name: 'RC4',
    value: 'rc4'
}, {
    name: '摩斯电码',
    value: 'moss'
}, {
    name: 'MD5',
    value: 'md5'
}, {
    name: 'URL',
    value: 'url'
}, {
    name: 'URLcomponent',
    value: 'URLcomponent'
}]

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.dropBox = createRef()
        this.state = {
            fromType: 'text',
            toType: 'md5',
            text: '',
            key: '',
            res: ''
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
        const { text, fromType, toType, key, res } = this.state
        return(
            <>
            <center style={{margin:'0 auto'}}>
                <Select
                    onOptionChange={val=>{
                        this.setState({fromType:val})
                    }}
                    value={fromType}
                    options={options}
                />
                <button 
                    style={{margin:'0px 30px 0px 30px'}}
                    className="mdui-btn mdui-btn-icon"
                    onClick={()=>{
                        this.setState({
                            fromType:toType,
                            toType:fromType
                        })
                    }}>
                    <i className="mdui-icon material-icons">arrow_forward</i>
                </button>
                <Select
                    onOptionChange={val=>{
                        this.setState({toType:val})
                    }}
                    value={toType}
                    options={options}
                />
            </center>
            <KeyInput onTxetChange={newText=>{this.setState({key:newText})}} />
            <div className="mdui-row-md-2">
                <TextInput 
                    text={text} ref={this.dropBox} 
                    onTxetChange={newText=>{this.setState({text:newText})}}
                />
                <center>
                    <button
                        onClick={()=>{
                          //console.log(dic(this.state.from,this.state.text,this.state.key))
                          this.setState({res:dic(fromType,text,key)})
                        }} className="mdui-btn-raised mdui-color-theme mdui-btn mdui-ripple">
                        <i className="mdui-icon-left mdui-icon material-icons">translate</i>
                        转换
                    </button>
                </center>
                <br></br>
                <PrintRes
                    res={res}
                    to={toType}
                />
          </div>
          </>
        )
    }
}

export default ()=><Ui />
