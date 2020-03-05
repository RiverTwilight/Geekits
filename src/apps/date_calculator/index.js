import React from 'react'
import mdui from 'mdui'
import ClipboardJS from 'clipboard'

import DateInput from '../../utils/mdui-in-react/DateInput'

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
            dateEarly:''
            dateLate:''
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
    render(){
	return (
		<React.Fragment>
            <TextInput
                onTextChange={newText=>{
                    this.setState({av:newText})
                }}
                header="输入AV号"
                icon="link"
                type="number"
                value={this.state.av}
            />          
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