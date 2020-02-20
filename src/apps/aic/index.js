/*import React, {Component} from 'react'
import mdui from 'mdui'
import axios from 'axios'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

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

const aic_types = [{
    name:'通用物体和场景',
    value:'normal'
}, {
    name:'动物',
    value:'animal'
},{
    name:'植物',
    value:'plant'
},{
    name:'车型',
    value:'car'
},{
    name:'菜品',
    value:'dish'
}]

class Aic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aic_type:0,
            url:'https://api.ygktool.cn/api/ocr',
            image:null,
            data:null
        }
    }
    loadDataFromServer(){
        const { url, image, cropperCache } = this.state
        this.refs.load.style.display = 'block';
        axios.post(this.state.url,{
            image:cropperCache.split('base64,')[1]
        }).then(response =>{
            var json = JSON.parse(response.request.response);
            console.log(json);
            this.setState({
                data: json,
                image: null
            });
            var path = {
                pathname: '/apps/result',
                state: json
            }
        }).catch(error => {
            mdui.snackbar({message:error})
        }).then(()=>{
            this.refs.load.style.display = 'none'
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
                    text="识别类型"
                    checked={aic_types}
                    onCheckedChange={checked=>{
                        this.setState({aic_type:checked})
                    }}
                    items={aic_types}
                />
                <div className="mdui-divider"/>
                <button 
                    onClick={()=>{
                    	this.loadDataFromServer()
                    }} 
                    disabled={false}
                    className="mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
                    <i className="mdui-icon material-icons">&#xe5ca;</i>
                </button>
                <Result
                    onIgnoreLine={
                        newCheck=>{
                            this.setState({ifIgnoreLine:newCheck})
                        }
                    }
                    data={data}/>
            </React.Fragment>
    	)
    }
}

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:null
        }
    }
    render(){
        <Router>
            <Switch>
                <Route exact path="/apps/aic" component={Aic}></Route>               
                <Route exact path="/apps/aic/result" component={Result}></Route>                               
            </Switch>
        </Router>

    }
}
export default ()=><Ui />;