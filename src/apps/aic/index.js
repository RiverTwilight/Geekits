import React from 'react'
import { snackbar } from 'mdui'
import axios from 'axios'

import FileRead from '../../utils/fileread'
import NewPage from '../../utils/BottomAlert'
import Cropper from '../../utils/Cropper'
import Input from '../../utils/Component/ListControlMenu.tsx'

const Result = ({result}) =>{
    if(result === null)return null
    return(
        <>
            {result.map(({keyword, baike_info, score},i)=>(
                <>
                <div key={i} className="mdui-col mdui-card">
                    <div className="mdui-card-media">
                        {/*baike_info?<img src={baike_info.image_url}/>:""*/}
                        <div className="mdui-card-primary">
                            <div className="mdui-card-primary-title">{keyword}</div>
                            <div className="mdui-card-primary-subtitle">相似度:{score}</div>
                        </div>
                        <div className="mdui-card-content">
                            {baike_info.description?baike_info.description:'暂无介绍'}
                        </div>
                    </div>
                </div>
                <br></br>
                </>
            ))}
        </>
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

export default class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aic_type:0,
            image:null,
            data:null,
            ifShow:false,
            ifShowCropper:false
        }
    }
    loadDataFromServer(){
        const { image } = this.state
        window.loadShow()
        axios.post('https://api.ygktool.cn/api/aic',{
            image:image.split('base64,')[1]
        }).then(response =>{
            var json = JSON.parse(response.request.response);
            this.setState({
                data: json.result,
                ifShow: true
            })
        }).catch(error => {
            snackbar({message:error})
        }).then(()=>{
            window.loadHide()
        })
    }
    render(){
        const { image, ifShow, data, aic_type, ifShowCropper } = this.state
    	return(
    		<>
                <div style={{display:ifShowCropper?'none':'block'}}>
                    <center>
                        <FileRead 
                            maxWidth="220px"
                            fileType="image/*"
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
                        	this.loadDataFromServer()
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
                    <Result result={data} />
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
            </>
    	)
    }
}
