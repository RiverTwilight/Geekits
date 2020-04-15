import React from 'react'
import ClipboardJS from 'clipboard'
import { snackbar } from 'mdui'
import Template from '../../utils/AskForTemplate.tsx'

class Result extends React.Component {
    componentDidMount() {
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#input');
        clipboard.on('success', e => {
            snackbar({ message: '已复制' })
            e.clearSelection();
        })
    }
    render() {
        const { data } = this.props
        if (!data) return null
        var src = data.url
        return (
            <>
                <div disabled={true} id="input" data-clipboard-text={src} className="mdui-textfield">
                    <label class="mdui-textfield-label">点击即可复制</label>
                    <input value={src} className="mdui-textfield-input" type="text" />
                </div>
                <img alt="预览封面" src={src} className="mdui-img-fluid" />
            </>
        )
    }
}

export default () => (
    <Template
        Result={Result}
        api="/api/instagram?type=0&url="
        inputOpt={{
            header: '输入Instagram图片链接',
            icon: 'link'
        }}
        btnText='获取'
    />
)
