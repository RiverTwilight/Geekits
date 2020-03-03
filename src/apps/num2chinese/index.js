import React from 'react'
import mdui from 'mdui'

import ClipboardJS from 'clipboard'
import num2chinese from './engine'
import TextInput from '../../utils/mdui-in-react/TextInput'

const Result = props =>{
    const { src } = props;
    if(src === null)return null
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
            input:'',
            res:null
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
        const { input, res } = this.state
    	return (
    		<React.Fragment>
                <TextInput
                    onTextChange={newText=>{
                        var cal = new num2chinese(newText);                        
                        this.setState({
                            input:newText,
                            res:cal.calDirect()
                        })
                    }}
                    autofocus
                    header="输入小写数字"
                    icon="attach_money"
                    type="number"
                    value={input}
                />
                <p className="mdui-typo-title">{res}</p>          
            </React.Fragment>
    	)
    }
}

export default ()=><Ui />;