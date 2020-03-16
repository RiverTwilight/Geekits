import React from 'react'
import ClipboardJS from 'clipboard'
import Template from '../../utils/AskForTemplate.jsx'
import mdui from 'mdui'

class Result extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#input');
        clipboard.on('success', e=> {
            mdui.snackbar({message:'已复制'})
            e.clearSelection();
        })
    }
    render(){
        const { data } = this.props
        if(!data)return null
        var src = data.cover
        return(
          <>       
                <div disabled={true} id="input" data-clipboard-text={src} className="mdui-textfield">
                    <input value={src} className="mdui-textfield-input" type="text"/>
                </div>
                <img alt="预览封面" src={src} className="mdui-img-fluid"/>
          </>
        )
    }
}

class Ui extends React.Component {
    render(){
        return(
            <>
                <Template
                    Result={Result}
                    api="https://api.ygktool.cn/api/bilibili_cover?av="
                    inputOpt={{
                        header:'输入av号/番号',
                        icon:'ondemand_video'
                    }}
                />
            </>
        )
    }
}


export default Ui