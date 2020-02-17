import React from 'react'
import mdui from 'mdui'
import axios from 'axios'
import ClipboardJS from 'clipboard'

import TextInput from '../../utils/mdui-in-react/TextInput'

const Result = props =>{
    const { src } = props;
    if(src == null)return null
    return(
      <React.Fragment>       
            <div disabled={true} id="input" data-clipboard-text={src} className="mdui-textfield">
              <input value={src} className="mdui-textfield-input" type="text"/>
            </div>
            <img src={src} className="mdui-img-fluid"/>
      </React.Fragment>
    )
}

class Ui extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        av:32211954,
        url:'https://api.ygktool.cn/api/bilibili?av=',
        data:null
    }
  }
    componentWillMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#input');
        clipboard.on('success', e=> {
          mdui.snackbar({message:'已复制链接'})
          e.clearSelection();
        })
    }
    loadCommentsFromServer(){
        this.refs.load.style.display = 'block';

        axios({
            method: 'get',
            url: this.state.url + this.state.av,
            withCredentials: false
        }).then(response =>{
            var json = JSON.parse(response.request.response);
            this.setState({data:json.data.pic})        
        }).catch(error => {
            mdui.snackbar({message:error})
        }).then(()=>{
            this.refs.load.style.display = 'none'
        })
    }
  render(){
	return (
		<React.Fragment>
            <TextInput
                autofocus
                onTextChange={newText=>{
                    this.setState({av:newText})
                }}
                header="输入AV号"
                icon="link"
                type="number"
                value={this.state.av}
                TagType="input"
            />
            <div ref="load" style={{display:'none',position:'absolute',top:'0'}} className="mdui-progress">
                <div className="mdui-progress-indeterminate"></div>
            </div>           
        <button 
            onClick={()=>{
            	this.loadCommentsFromServer()
            }} 
            className="mdui-ripple mdui-color-pink-300 mdui-float-right mdui-btn-raised mdui-btn">
            哔哩哔哩 (゜-゜)つロ 干杯~
        </button>
        <div className="mdui-clearfix"></div>
        <Result src={this.state.data}/>
        </React.Fragment>
	)
    }
}

export default ()=><Ui />;