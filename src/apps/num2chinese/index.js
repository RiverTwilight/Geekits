import React from 'react'
import mdui from 'mdui'

import ClipboardJS from 'clipboard'
import num2chinese from './engine'
import { TextInput } from 'mdui-in-react'

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
            res:''
        }
    }
    componentWillMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#becopy');
        clipboard.on('success', e=> {
          mdui.snackbar({message:'已复制'})
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
                        var result = (newText === '')?'':cal.calDirect()                     
                        this.setState({
                            input:newText,
                            res:result
                        })
                    }}
                    autofocus
                    header="输入小写数字"
                    icon="attach_money"
                    type="number"
                    value={input}
                />
                <p 
                    style={{display:(res === '')?'none':'block'}}
                    id="becopy" data-clipboard-text={res} 
                    className="mdui-text-center mdui-typo-title">
                    {res}
                    <button className="mdui-btn-icon mdui-btn"><i class="mdui-icon material-icons">&#xe14d;</i></button>
                </p>          
            </React.Fragment>
    	)
    }
}

export default ()=><Ui />;