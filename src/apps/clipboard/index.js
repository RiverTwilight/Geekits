import React from 'react'
import mdui from 'mdui'

import ClipboardJS from 'clipboard'
import io from 'socket.io-client'
import QRCode from 'qrcode'
import { saveAs } from 'file-saver'

import FileRead from '../../utils/fileread'
import TextInput from '../../utils/mdui-in-react/TextInput'

function dataURLtoFile(dataurl, filename) {
    //将base64转换为文件
    var arr = dataurl.split(',')
      , mime = arr[0].match(/:(.*?);/)[1]
      , bstr = atob(arr[1])
      , n = bstr.length
      , u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr],filename,{
        type: mime
    })
}

const Share = props =>{
    return(
        <React.Fragment>
            <button
                style={{
                    position:"fixed",
                    bottom:'180px',
                    right:'10px'
                }}
                mdui-menu="{target: '#share',position:'center'}"
                className="mdui-color-theme mdui-fab mdui-fab-mini">
                <i className="mdui-icon material-icons">&#xe80d;</i>
            </button>
            <ul className="mdui-menu" id="share">
                <img src={props.qrcode}></img>                   
                <li>
                从其他设备访问此页链接[<a 
                data-clipboard-text={window.location.href + "#/" + props.token}
                className="mdui-text-color-theme copy">复制</a>]或扫描二维码
                </li>
            </ul>        
        </React.Fragment>
    )
}

const MsgList = props =>{
    const { data } = props;
    if (!navigator.onLine){
        return(
            <p className="mdui-text-center">此工具需要联网才能使用</p>
        )
    }
    if(!data.length){
        return(
            <p className="mdui-text-center">点击右下角"分享"按钮添加设备</p>
        )
    }
    const list = data.map((a,i)=>{
        if(a.type === 'text'){
            return(
                <li 
                    onClick={()=>{
                        mdui.alert(a.content,()=>{},{history:false})
                    }}
                    key={i} className="mdui-col mdui-list-item mdui-ripple">
                    <div className="mdui-list-item-content">
                        <div className="mdui-list-item-text">
                            <div className="mdui-list-item-title mdui-list-item-one-line">{a.content}</div>
                            <div className="mdui-list-item-text mdui-list-item-one-line">{a.time}</div>
                        </div>
                    </div>
                    <button 
                        data-clipboard-text={a.content}
                        className="copy mdui-btn mdui-btn-icon">
                        <i className="mdui-list-item-icon mdui-icon material-icons">content_copy</i>
                    </button>
               </li>
           )
        }else{
            return(
                <li key={i} class="mdui-list-item mdui-ripple">
                    <i class="mdui-list-item-avatar mdui-icon material-icons">folder</i>
                    <div class="mdui-list-item-content">
                        <div class="mdui-list-item-title">{a.content.name}</div>
                        <div class="mdui-list-item-text">{a.content.size}</div>
                    </div>
                    <button
                        onClick={()=>{
                            saveAs(dataURLtoFile(a.content.data), a.content.name)
                        }}
                        className="mdui-btn mdui-btn-icon">
                        <i class="mdui-icon material-icons">file_download</i>                       
                    </button>
                </li>
           )
        }
    })
    return(
      <ul className="mdui-list mdui-row-md-2">{list}</ul>
    )
}

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content:"",
            type:'',
            data:[],
            token:"",
            qrcode:"",
            socket:null,
            pwd:null
        }
    }
    componentWillMount() {
        if (window.location.hash) {
            //如果链接有hash信息保存为token
            var token = /^\#\/(\d+)$/.exec(window.location.hash)[1];
            this.setState({
                token: Number(token)
            })
        } else {
            //没有则生成token
            const td = new Date;
            var token = td.getTime();
            this.setState({
                token: token
            })
        }
    }
    componentDidMount(){

        const cb = data => {
            this.setState(data)
        }
  
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', e=> {
            mdui.snackbar({message:'已复制'})
            e.clearSelection();
        })

        const sendBtn = this.refs.sendBtn;

        const { token, data } = this.state;

        console.log(token);

        QRCode.toDataURL(window.location.href + "#/" + this.state.token, (err, url) => {
            if (err) throw err
            cb({
                qrcode: url
            })
        })

        const socket = io('https://api.ygktool.cn', {
            path: '/routes/wss/clipboard/',
            query:{
                token:token
            }
            //transports: ['websocket']//取消轮询
        });

        this.setState({socket:socket});

        socket.on('error', msg=>{
            //mdui.snackbar({message:'电波无法到达哟~'})
            this.refs.sendBtn.disabled = false;
            this.refs.sendBtn.innerText = '发送';
        })

        socket.on('chat_message', msg => {
            console.log('从服务器返回的数据:%o',msg);           
            this.refs.sendBtn.disabled = false;
            this.refs.sendBtn.innerText = '发送';
            let { type, content, time } = msg;
            let newData = { type, content, time }
            data.push(newData);
            cb({data:data,content:''})
        })
    }
    sendMsg() {
        this.refs.sendBtn.disabled = true
        this.refs.sendBtn.innerText = '发送中...';
        var now = new Date;
        var time = now.toLocaleTimeString()
        const { content, token, socket, type, pwd } = this.state;
        socket.emit('chat_message', { content, type, token, time, pwd })      
    }
    render(){
        const { qrcode, type, data, content, token } = this.state
        return (
            <React.Fragment>
                <MsgList data={data}/>
                <div
                    style={{
                        zIndex:'999',
                        position:'fixed',
                        bottom:'0',
                        right:'0',
                        left:(window.innerWidth >= 1024)?'240px':'0'
                    }}
                    className="mdui-card mdui-p-a-1">
                    <TextInput
                        disabled={(type === 'file')?false:true}
                        onTextChange={newText=>{
                            this.setState({
                                content:newText,
                                type:'text'
                            })
                        }}
                        rows="2"
                        maxlength="3000"
                        header="输入要发送的内容，大于3000字符请发送文件"
                        value={(type === 'text')?content:''}
                    />
                    <button 
                        ref="sendBtn"
                        onClick={()=>{
                            this.sendMsg()
                        }} 
                        className="mdui-ripple mdui-float-right mdui-color-theme mdui-btn-raised mdui-btn">
                        发送
                    </button>
                    {/*<button
                        onClick={()=>{
                            mdui.prompt(
                                '',
                                '设置密码',
                                value => {this.setState({pwd:value})},
                                value => {}, {
                                    type: 'text',
                                    maxlength: 20,
                                    confirmText: '保存',
                                    cancelText: '取消',
                                    history:false
                                }
                            )
                        }}
                        className="mdui-float-right mdui-btn">
                        <i className="mdui-icon-left mdui-icon material-icons">vpn_key</i>
                        设置密码
                    </button>*/}
                    <span style={{marginRight:'5px'}} className="mdui-float-right">
                        <FileRead 
                            maxSize={3*1024*1024}
                            fileType="*/*"
                            multiple={false}
                            onFileChange={(dataUrl, file)=>{
                                this.setState({
                                    content:{
                                        name:file.name,
                                        size:Math.round(file.size/1024 * 10)/10 + 'KB',
                                        data:dataUrl
                                    },
                                    type:'file'
                                })
                            }}
                        />
                    </span>
                </div>      
                <Share token={token} qrcode={qrcode} />
            </React.Fragment>
        )
    }
}

export default ()=><Ui />;