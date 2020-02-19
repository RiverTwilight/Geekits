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

const Result = props =>{
    const { data, ifIgnoreLine, onSelectedChange } = props;
    if(data === null)return null
    const Tag = ifIgnoreLine?"span":"p";
    const text = [];
    data.words_result.map(line=>{
        text.push(line.words)
    })
    setTimeout(() => {
        var copy = []
        var selected = document.querySelectorAll('#table tbody tr[class="mdui-table-row-selected"]>td:nth-child(2)')
        for (var i = 0; i <= selected.length - 1; i++) {
            copy.push(selected[i].innerText)
        }
        onSelectedChange(copy.join(""))
    }, 100)
    return(
      <React.Fragment>     
            <div className="mdui-divider"/>
            <button
                data-clipboard-text={props.copy}
                id="copy"
                className="mdui-btn mdui-color-theme mdui-btn-raised">
                复制选中
            </button>
            <br></br><br></br>
            <div id="table" class="mdui-table-fluid">
                <table class="mdui-table mdui-table-selectable">
                    <thead>
                      <tr>                   
                        <th>文本</th>
                      </tr>
                    </thead>
                    <tbody>
                        {text.map((line,i)=>(
                            <tr class="mdui-table-row-selected">
                            <td>{line}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
            url:'http://localhost:444/api/ocr',
            image:null,
            data:null,
            copy:null
        }
    }
    componentWillMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#copy');
        clipboard.on('success', e=> {
            mdui.snackbar({message:'已复制'})
            e.clearSelection();
        })
    }
    loadDataFromServer(){
        const { url, image, language_type, cropperCache } = this.state
        this.refs.load.style.display = 'block';
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
        })
    }
    render(){
        const { image, ifIgnoreLine, data, copy } = this.state
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
                    icon="stars"
                    text="语言"
                    checked={this.state.language_type}
                    onCheckedChange={checked=>{
                        this.setState({language_type:checked})
                    }}
                    items={language_types}
                />
                <button 
                    onClick={()=>{
                    	this.loadDataFromServer()
                    }} 
                    disabled={false}
                    className="mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
                    <i class="mdui-icon material-icons">&#xe5ca;</i>
                </button>
                <Result
                    onSelectedChange={newText=>{this.setState({copy:newText})}}
                    copy={copy}
                    ifIgnoreLine={ifIgnoreLine}
                    data={data}/>
            </React.Fragment>
    	)
    }
}

export default ()=><Ui />;