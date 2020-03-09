import React from 'react'
import mdui from 'mdui'
import { TextInput } from 'mdui-in-react'

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }
    loadCommentsFromServer(){
        window.loadShow()
        fetch({
            method: 'post',
            url: '',
            withCredentials: false
        }).then(response =>{
            var json = JSON.parse(response.request.response);
            this.setState({data:json.data.pic})        
        }).catch(error => {
            mdui.snackbar({message:error})
        }).then(()=>{
            window.loadHide()
        })
    }
    render(){
        const { password, username } = this.state
    	return (
    		<React.Fragment>
                <TextInput
                    onTextChange={newText=>{
                        this.setState({username:newText})
                    }}
                    header="用户名"
                    icon="link"
                    type="email"
                    value={username}
                /> 
                <TextInput
                    onTextChange={newText=>{
                        this.setState({password:newText})
                    }}
                    header="密码"
                    icon="link"
                    type="password"
                    value={password}
                />              
                <button 
                    onClick={()=>{
                    	this.loadCommentsFromServer()
                    }} 
                    className="mdui-ripple mdui-float-right mdui-btn-raised mdui-btn">
                    df
                </button>
                <div className="mdui-clearfix"></div>
            </React.Fragment>
    	)
    }
}

export default Ui