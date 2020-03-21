import React from 'react'
import mdui from 'mdui'
import axios from 'axios'
import { Input } from 'mdui-in-react'

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input:'',
            data:null
        }
    }
    loadCommentsFromServer(){
        const { api } = this.props;
        const { input } = this.state
        window.loadShow()
        axios({
            method: 'get',
            url: api + input,
            withCredentials: false
        }).then(response =>{
            var json = JSON.parse(response.request.response);
            this.setState({data:json})        
        }).catch(error => {
            mdui.snackbar({message:error})
        }).then(()=>{
            window.loadHide()
        })
    }
    render(){
        const { Result, inputOpt, btnText } = this.props
        const { input } = this.state
    	return (
    		<>
                <Input
                    onValueChange={newText=>{
                        this.setState({input:newText})
                    }}
                    {...inputOpt}
                    value={input}
                />          
                <button 
                    onClick={()=>{
                    	this.loadCommentsFromServer()
                    }} 
                    className="mdui-ripple mdui-color-theme mdui-float-right mdui-btn-raised mdui-btn">
                    {btnText || "查询"}
                </button>
                <div className="mdui-clearfix"></div><br></br>
                <Result 
                    data={this.state.data}
                    input={input}
                />
            </>
    	)
    }
}

export default Ui