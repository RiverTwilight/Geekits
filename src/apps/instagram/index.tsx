import React from 'react'
import ClipboardJS from 'clipboard'
import { snackbar } from 'mdui'
// @ts-expect-error ts-migrate(2691) FIXME: An import path cannot end with a '.tsx' extension.... Remove this comment to see the full error message
import Template from '../../utils/AskForTemplate.tsx'

class Result extends React.Component {
    componentDidMount() {
        // @ts-expect-error ts-migrate(2454) FIXME: Variable 'clipboard' is used before being assigned... Remove this comment to see the full error message
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#input');
        clipboard.on('success', e => {
            snackbar({ message: '已复制' })
            e.clearSelection();
        })
    }
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { data } = this.props
        if (!data) return null
        var src = data.url
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div disabled={true} id="input" data-clipboard-text={src} className="mdui-textfield">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <label className="mdui-textfield-label">点击即可复制</label>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <input value={src} className="mdui-textfield-input" type="text" />
                </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <img alt="预览封面" src={src} className="mdui-img-fluid" />
            </>
        )
    }
}

export default () => (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
