import React, {Component} from 'react'
import mdui from 'mdui'
import axios from 'axios'
import ClipboardJS from 'clipboard'

import {
    ListControlMenu,
    ListControlCheck,
    TextInput
} from '../../utils/mdui-in-react/'

import FileRead from '../../utils/fileread'
import Cropper from '../../utils/Cropper'

const numMark = text => {
    var reg = /^1[3|4|5|7|8]\d{9}$/g;
    if(reg.test(text))return text
    var text = text.replace(reg,'<span data-clipboard-text="$&" class="copy mdui-text-color-theme">$&</span>');
    return text
}

const emailMark = text => {
    var reg = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/g;
    if (reg.test(text)) return text
    var text = text.replace(reg, '<span data-clipboard-text="$&" class="copy mdui-text-color-theme">$&</span>');
    return text
}

const urlMark = text => {
    var reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/g;
    console.log(text + ' is a url', reg.test(text))
    if (reg.test(text)) return text
    var text = text.replace(reg, '<span data-clipboard-text="$&" class="copy mdui-text-color-theme">$&</span>');
    return text
}

const Result = ({data, ifIgnoreLine, onIgnoreLine}) =>{
    if(data === null)return null
    const Tag = ifIgnoreLine?"span":"p";
    var markedText = [];
    var copiedText = '';
    data.words_result.map(line=>{
        markedText.push(emailMark(urlMark(line.words)))
        copiedText += line.words     
    })
    console.log(markedText)
    return(
      <React.Fragment>   
            <ListControlCheck
                icon="keyboard_return"
                text="忽略换行"
                checked={ifIgnoreLine}
                onCheckedChange={checked=>{
                    onIgnoreLine(checked)
                }}
            />             
            <button
                data-clipboard-text={copiedText}
                className="copy mdui-btn mdui-color-theme mdui-btn-raised">
                复制
            </button>
            <div className="mdui-p-a-1 mdui-typo">
            {
                markedText.map((line,i)=>(
                    <Tag key={i} dangerouslySetInnerHTML={{__html:line}}></Tag>
                ))
            }
            </div>
      </React.Fragment>
    )
}

const language_types = [{
    name:'中英混合',
    value:'CHN_ENG'
}, {
    name:'英语',
    value:'ENG'
},{
    name:'葡萄牙语',
    value:'POR'
},{
    name:'法语',
    value:'FRE'
},{
    name:'意大利语',
    value:'ITA'
},{
    name:'德语',
    value:'GER'
},{
    name:'西班牙语',
    value:'SPA'
},{
    name:'俄语',
    value:'RUS'
},{
    name:'日语',
    value:'JAP'
},{
    name:'韩语',
    value:'KOR'
},]

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language_type:0,
            url:'https://api.ygktool.cn/api/ocr',
            image:null,
            data:null,
            ifIgnoreLine:false,
            ifShowCropper:false
        }
    }
    componentWillMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', e=> {
            mdui.snackbar({message:'已复制'})
            e.clearSelection();
        })
    }
    loadDataFromServer(){
        const { url, image, language_type } = this.state
        window.loadShow()
        this.refs.startBtn.disabled = true
        axios.post(this.state.url,{
            image:image.split('base64,')[1],
            language_type:language_types[language_type].value
        }).then(response =>{
            var json = JSON.parse(response.request.response);
            console.log(json)
            this.setState({data:json,image:null})        
        }).catch(error => {
            mdui.snackbar({message:error})
        }).then(()=>{
            window.loadHide()
            this.refs.startBtn.disabled = false
        })
    }
    render(){
        const { image, ifIgnoreLine, ifShowCropper, data, language_type } = this.state
    	return(
    		<React.Fragment>
                <div style={{display:(ifShowCropper)?'none':'block'}}>
                    <div ref="load" style={{display:'none'}} className="mdui-progress">
                        <div className="mdui-progress-indeterminate"></div>
                    </div>
                    <center>
                        <FileRead 
                            maxWidth="220px"
                            fileType="image/*"
                            multiple={false}
                            onFileChange={ file =>{
                                this.setState({ifShowCropper:true,image:file})
                            }}
                        />
                    </center>
                    <ListControlMenu
                        icon="language"
                        text="语言"
                        checked={language_type}
                        onCheckedChange={checked=>{
                            this.setState({language_type:checked})
                        }}
                        items={language_types}
                    />
                    <div className="mdui-divider"/>
                    <button 
                        onClick={()=>{
                        	this.loadDataFromServer()
                        }} 
                        ref="startBtn"
                        className="mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
                        <i className="mdui-icon material-icons">&#xe5ca;</i>
                    </button>
                    <Result
                        onIgnoreLine={
                            newCheck=>{
                                this.setState({ifIgnoreLine:newCheck})
                            }
                        }
                        ifIgnoreLine={ifIgnoreLine}
                        data={data}
                    />
                </div>
                <Cropper
                    ifShow={ifShowCropper}
                    img={image}
                    onClose={()=>{
                        this.setState({ifShowCropper:false})
                    }}
                    onConfirm={img=>{
                        this.setState({ifShowCropper:false,image:img})
                    }}
                    title=""
                />
            </React.Fragment>
    	)
    }
}

export default ()=><Ui />;