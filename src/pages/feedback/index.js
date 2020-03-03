import React from 'react'
import mdui from 'mdui'

import {
    TextInput
} from '../../utils/mdui-in-react/'

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	contact:'',
            content:''
        }       
    }
    sendData(){

    }
    render(){
        window.titleRef.innerText = '意见反馈'
        const { content, contact } = this.state
    	return(
            <React.Fragment>
                <TextInput
                    onTextChange={newText=>{
                        this.setState({contact:newText})
                    }}
                    header="联系方式"
                    placeholder="例 QQ:1985386335"
                    value={contact}
                />
                <TextInput
                    onTextChange={newText=>{
                        this.setState({content:newText})
                    }}
                    placeholder="内容"
                    value={content}
                    rows="5"
                />
                <button 
                    onClick={()=>{
                        this.sendData()
                    }}
                    className="mdui-color-theme mdui-btn mdui-btn-raised">提交</button>
            </React.Fragment>
        )
    }
}

export default ()=><Ui />;