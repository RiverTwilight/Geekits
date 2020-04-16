import React, { createRef, forwardRef } from 'react'
import { snackbar } from 'mdui'
import dic from './dictionary'
import ClipboardJS from 'clipboard'
import Select from '../../utils/Component/Select'
import DragRead from '../../utils/DragReadContainer'
import Input from '../../utils/Component/Input.tsx'

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
        <div className="mdui-card mdui-textfield">
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
            snackbar({message:'已复制结果'})
            e.clearSelection();
        })
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
            <Input 
                onValueChange={newText=>{
                    this.setState({key:newText})
                }} 
                value={key}
                placeholder="输入密钥（可选）"
            />
            <div className="mdui-row-md-2">
                <DragRead
                    cb={newValue=>{
                        this.setState({text: newValue})
                    }}
                >
                        <Input
                        value={text}
                        onValueChange={newValue=>{
                            this.setState({text: newValue})
                        }}
                        placeholder="输入内容或拖入txt文件"
                        rows="5"
                    />
                </DragRead>
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
