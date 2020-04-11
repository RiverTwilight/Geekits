import React from 'react'
import ClipboardJS from 'clipboard'
import Template from '../../utils/AskForTemplate.jsx'
import { snackbar } from 'mdui'

class Result extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#input');
        clipboard.on('success', e=> {
            snackbar({message:'已复制'})
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
                    <label class="mdui-textfield-label">点击即可复制</label>
                    <input value={src} className="mdui-textfield-input" type="text"/>
                </div>
                <img alt="预览封面" src={src} className="mdui-img-fluid"/>
          </>
        )
    }
}

export default class Ui extends React.Component {
    render(){
        return(
            <>
                <Template
                    Result={Result}
                    api="/api/bilibili_cover?av="
                    inputOpt={{
                        header:'输入av号/番号',
                        icon:'ondemand_video'
                    }}
                />
            </>
        )
    }
}
