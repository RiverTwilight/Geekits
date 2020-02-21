import React, {Component} from 'react'
import mdui from 'mdui'
import axios from 'axios'
import ClipboardJS from 'clipboard'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import ListControlCheck from '../../utils/mdui-in-react/ListControlCheck'
import ListControlMenu from '../../utils/mdui-in-react/ListControlMenu'
import TextInput from '../../utils/mdui-in-react/TextInput'
import FileRead from '../../utils/fileread'

class ImgCropper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    _crop(){
        var img = this.refs.cropper.getCroppedCanvas().toDataURL()
        this.props.onCropperChange(img)
    }
    render(){
        console.log(this.props.ifHide)
        if(this.props.ifHide)return null
        return(
            <Cropper
                ref='cropper'
                src={this.props.file}
                style={{height: 400, width: '100%'}}
                //aspectRatio={1 / 1}
                //guides={true}
                crop={this._crop.bind(this)}
             />
        )
    }
}

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

const Result = props =>{
    const { data, ifIgnoreLine, onIgnoreLine } = props;
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
                checked={props.ifIgnoreLine}
                onCheckedChange={checked=>{
                    props.onIgnoreLine(checked)
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
            ifIgnoreLine:false
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
        const { url, image, language_type, cropperCache } = this.state
        this.refs.load.style.display = 'block';
        this.refs.startBtn.disabled = true
        axios.post(this.state.url,{
            image:cropperCache.split('base64,')[1],
            language_type:language_types[language_type].value
        }).then(response =>{
            var json = JSON.parse(response.request.response);
            console.log(json)
            this.setState({data:json,image:null})        
        }).catch(error => {
            mdui.snackbar({message:error})
        }).then(()=>{
            this.refs.load.style.display = 'none'
            this.refs.startBtn.disabled = false
        })
    }
    render(){
        const { image, ifIgnoreLine, data, language_type } = this.state
    	return(
    		<React.Fragment>
                <div ref="load" style={{display:'none'}} className="mdui-progress">
                    <div className="mdui-progress-indeterminate"></div>
                </div>
                <ImgCropper
                    ifHide={image === null}
                    onCropperChange={newImg=>{
                        this.setState({cropperCache:newImg})
                    }}
                    file={image}
                />
                <center>
                    <FileRead 
                        fileType="image/*"
                        multiple={false}
                        onFileChange={ file =>{
                            this.setState({image:file})
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
                    data={data}/>
            </React.Fragment>
    	)
    }
}

export default ()=><Ui />;