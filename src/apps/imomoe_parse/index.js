import React from 'react'
import mdui from 'mdui'
import axios from 'axios'
import ClipboardJS from 'clipboard'

import TextInput from '../../utils/mdui-in-react/TextInput'

const VideoList = props => {
    console.log(props.list)
    return(
        <React.Fragment>{
            props.list.map((video,i)=>(
                <li onClick={()=>{
                    window.open(/\$(\S+)\$/.exec(video)[1])
                }} className="mdui-col mdui-list-item mdui-ripple">
                    <i className="mdui-color-theme mdui-list-item-avatar mdui-icon material-icons">ondemand_video</i>
                    <div className="mdui-list-item-content">
                        <div class="mdui-list-item-title mdui-list-item-one-line">{`第${i+1}集`}</div>
                        <div class="mdui-list-item-text mdui-list-item-one-line">{/\$(\S+)\$/.exec(video)[1]}</div>
                    </div>
                </li>
            ))
        }</React.Fragment>
    )
}

const Result = props =>{
    const { src } = props;
    if(!src.length)return null
    
    return(
        <ul className="mdui-row-md-2 mdui-list">
        {src.map((source,i)=>(
            <React.Fragment>
                <li class="mdui-subheader">{`播放源${i + 1}`}</li>
                <VideoList list={source[1]} />
                <div className="mdui-clearfix"></div>
            </React.Fragment>
        ))}
        </ul>     
    )
}



class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'http://www.imomoe.in/player/7599-0-1.html',
            data:[]
        };       
    }
    componentWillMount(){  
        //var VideoListJson    
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('.becopy');
        clipboard.on('success', e=> {
            mdui.snackbar({message:'已复制链接'})
            e.clearSelection();
        })
    }
    loadCommentsFromServer(){
        this.refs.load.style.display = 'block';
        const {url} = this.state;
        function loadJosnp() {
            var VideoListJson
            return new Promise((resolve, reject) => {
                axios.get('https://api.ygktool.cn/api/bangumi?url=' + url).then(response => {
                    console.log(response.data);                   
                    var tag = document.createElement('script');
                    tag.innerText = response.data;
                    document.getElementsByTagName('body')[0].appendChild(tag);
                    resolve()       
                }).catch(error => {
                    mdui.snackbar({
                        message: error
                    })
                })
            })
        }       
        loadJosnp().then(() => {
            this.refs.load.style.display = 'none'
            //console.log(VideoListJson);
            //this.setState({data:VideoListJson})
        })
    }
  render(){
    return (
        <React.Fragment>
            <TextInput
                autofocus
                onTextChange={newText=>{
                    this.setState({url:newText})
                }}
                header="输入视频播放地址(一定是播放地址！)"
                icon="link"
                type="link"
                value={this.state.url}
                TagType="input"
            />
            <div ref="load" style={{display:'none',position:'absolute',top:'0'}} className="mdui-progress">
                <div className="mdui-progress-indeterminate"></div>
            </div>           
            <button 
                onClick={()=>{
                    var VideoListJson
                    this.loadCommentsFromServer()
                }} 
                className="mdui-color-theme mdui-ripple mdui-float-right mdui-btn-raised mdui-btn">
                获取
            </button>
            <div className="mdui-clearfix"></div>
            <Result src={this.state.data}/>
        </React.Fragment>
    )
    }
}

export default ()=><Ui />;