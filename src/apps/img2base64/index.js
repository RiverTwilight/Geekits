import React from 'react'
import ClipboardJS from 'clipboard'
import mdui from 'mdui'
//读取文件组件
import FileRead from '../../utils/fileread'

class Ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file:null
		}
	}
	componentDidMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#copy');
        clipboard.on('success', e=> {
            mdui.snackbar({message:'已复制'})
            e.clearSelection()
        })
        clipboard.on('error', e=> {
            mdui.snackbar({message:'文本太长无法复制'})
            e.clearSelection()
        })
    }
	render(){
		const { file } = this.state;
		return(
			<> 
				<center>
					<FileRead 
						fileType="image/*"
						onFileChange={file=>{
							this.setState({file:file})
						}}
					/>
				</center>
				<div 
					disabled={true}
					style={{display:(file === null)?'none':'block'}}
					data-clipboard-text={file} className="mdui-textfield">
                    <textarea rows="4" value={file} className="mdui-textfield-input" type="text"></textarea>
                </div>
                <button 
	                id="copy" 
	                style={{display:(!file)?'none':'block'}}
	                className="mdui-float-right mdui-btn mdui-btn-icon">
	                <i className="mdui-icon material-icons">&#xe14d;</i>
                </button>
                <div className="mdui-clearfix"></div>
			</>
		)  	
	}
}

export default Ui