import React, {Component} from 'react'
import mdui from 'mdui'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import ListControlMenu from '../../utils/mdui-in-react/ListControlMenu'
import FileRead from '../../utils/fileread'
import NewPage from '../../utils/NewPage'
import Cropper from '../../utils/Cropper'

const Result = props =>{
    return(
      <React.Fragment>   
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

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aic_type:0,
            url:'https://api.ygktool.cn/api/aic',
            image:null,
            data:null,
            ifShow:false,
            ifShowCropper:false
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
                data: json
            })
        }).catch(error => {
            mdui.snackbar({message:error})
        }).then(()=>{
            this.refs.load.style.display = 'none'
        })
    }
    render(){
        const { image, ifShow, data, aic_type, ifShowCropper } = this.state
    	return(
    		<React.Fragment>
                <div style={{display:(ifShow||ifShowCropper)?'none':'block'}}>
                    <div ref="load" style={{display:'none'}} className="mdui-progress">
                        <div className="mdui-progress-indeterminate"></div>
                    </div>
                    <center>
                        <FileRead 
                            fileType="image/*"
                            multiple={false}
                            onFileChange={ file =>{
                                this.setState({ifShowCropper:true,image:file})
                            }}
                        />
                    </center>
                    <ListControlMenu
                        icon="language"
                        text="识别类型"
                        checked={aic_type}
                        onCheckedChange={checked=>{
                            this.setState({aic_type:checked})
                        }}
                        items={aic_types}
                    />
                    <div className="mdui-divider"/>
                    <button 
                        onClick={()=>{
                        	this.loadDataFromServer();
                            this.setState({ifShow:true})
                        }} 
                        disabled={false}
                        className="mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
                        <i className="mdui-icon material-icons">&#xe5ca;</i>
                    </button>
                    
                </div>
                <NewPage
                    onClose={()=>{
                        this.setState({ifShow:false})
                    }}
                    title="识别结果"
                    ifShow={ifShow}
                >
                    <Result data={data} />
                </NewPage>
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