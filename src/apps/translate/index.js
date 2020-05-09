import React, { createRef, forwardRef } from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
import Select from '../../utils/Component/Select'
import axios from 'axios'
import DragRead from '../../utils/DragReadContainer'
import Input from '../../utils/Component/Input.tsx'

const options = [{
    name:'自动',
    value: 'auto',
},{
    name:'英语',
    value: 'en',
},{
    name:'中文',
    value: 'zh',
},{
    name:'日语',
    value: 'jp',
},{
    name:'文言文',
    value: 'wyw',
},{
    name:'韩语',
    value: 'kor',
},{
    name:'粤语',
    value: 'yue',
},{
    name:'法语',
    value: 'fra',
},{
    name:'西班牙语',
    value:'spa'
},{
    name:'泰语',
    value:'th'
},{
    name:'意大利语',
    value:'it'
}]

const PrintRes = ({res}) => {
    return(
        <div className="mdui-card mdui-col">
            <div style={{height:'130px'}} className="mdui-typo mdui-dialog-content mdui-p-a-2">
            {res}
            </div>
            <a id="becopy" data-clipboard-text={res} className="mdui-float-right mdui-btn mdui-btn-icon">
                <i className="mdui-icon material-icons">&#xe14d;</i>
            </a>
        </div>
    )
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.dropBox = createRef()
        this.state = {
            fromLang: 'auto',
            toLang: 'zh',
            text: '',
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
    sendRequest(){
        const { text, fromLang, toLang } = this.state
        window.loadShow();
        axios.post('/api/translate',{
            text:text,
            from:fromLang,
            to:toLang
        }).then(response =>{
            var json = JSON.parse(response.request.response);
            this.setState({res:json.trans_result[0].dst})
        }).catch(error => {
            snackbar({message:error})
        }).then(()=>{
            window.loadHide()
        })
    }
    render(){
        const { text, fromLang, toLang, res } = this.state
        return(
            <>
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
                            text !== '' && this.sendRequest()
                        }} className="mdui-btn-raised mdui-color-theme mdui-btn mdui-ripple">
                        <i className="mdui-icon-left mdui-icon material-icons">translate</i>
                        翻译
                    </button>
                </center>
                <br></br>
                <PrintRes
                    res={res}
                />
          </div>
          </>
        )
    }
}
