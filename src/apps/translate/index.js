import React, { createRef, forwardRef } from 'react'
import mdui from 'mdui'
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

const options = [{
    text: '正常文本',
    value: 'text'
}]

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.dropBox = createRef()
        this.state = {
            fromLang: 'text',
            toLang: 'md5',
            text: '',
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
    sendRequest(){

    }
    render(){
        const { text, fromLang, toLang } = this.state
        return(
            <React.Fragment>
            <center style={{margin:'0 auto'}}>
                <Select
                    onOptionChange={val=>{
                        this.setState({fromLang:val})
                    }}
                    value={fromLang}
                    options={options}
                />
                <button 
                    style={{margin:'0px 30px 0px 30px'}}
                    className="mdui-btn mdui-btn-icon"
                    onClick={()=>{
                        this.setState({
                            fromLang:toLang,
                            toLang:fromLang
                        })
                    }}>
                    <i className="mdui-icon material-icons">arrow_forward</i>
                </button>
                <Select
                    onOptionChange={val=>{
                        this.setState({toLang:val})
                    }}
                    value={toLang}
                    options={options}
                />
            </center>
            <div className="mdui-row-md-2">
                <TextInput 
                    text={text} ref={this.dropBox} 
                    onTxetChange={newText=>{this.setState({text:newText})}}
                />
                <center>
                    <button
                        onClick={()=>{
                          this.sendRequest()
                        }} className="mdui-btn-raised mdui-color-theme mdui-btn mdui-ripple">
                        <i className="mdui-icon-left mdui-icon material-icons">translate</i>
                        转换
                    </button>
                </center>
          </div>
          </React.Fragment>
        )
    }
}

export default ()=><Ui />
