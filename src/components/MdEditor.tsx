import React from 'react'

const text2md = (str: any, style: any, start: any, end: any) => {
    //截取选中字符串
    var arr = str.split("");
    var md;
    var selectedLength = end - start;
    var selectedStr = arr.splice(start, selectedLength).join("")
    switch (style) {
        case 'h1':
            md = "# " + selectedStr;
            break
        case 'h2':
            md = "## " + selectedStr;
            break
        case 'h3':
            md = "### " + selectedStr;
            break
        case 'bold':
            md = `**${selectedStr}**`;
            break
        case 'code':
            md = `\`${selectedStr}\``;
            break
        case 'italic':
            md = `_${selectedStr}_`;
            break
        case 'clear':
            md = `~~${selectedStr}~~`;
            break
        case 'underline':
            md = `<u>${selectedStr}</u>`;
            break
        case 'link':
            md = `[链接文字](链接)`
            break
        case 'enter':
            md = `  <br>\n`
            break
        case 'list':
            md = `* ${selectedStr}`
            break
        case 'image':
            md = `![alt 属性文本](图片地址)`
            break
        default:
            md = "88888"
    }
    arr.splice(start, 0, md)
    return arr.join("")
}

const appMenu = [{
    icon: "image",
    style: "image",
    name: "图片"
}, {
    icon: "format_list_bulleted",
    style: "list",
    name: "列表"
}, {
    icon: "link",
    style: "link",
    name: "链接"
}, {
    icon: "keyboard_return",
    style: "enter",
    name: "换行"
}]

const textApps = [{
    style: "h1",
    text: "大标题"
}, {
    style: "h2",
    text: "中标题"
}, {
    style: "h3",
    text: "小标题"
}, {
    icon: "code",
    style: "code",
    name: "代码块"
}, {
    icon: "format_bold",
    style: "bold",
    name: "粗体"
}, {
    icon: "format_italic",
    style: "italic",
    name: "斜体"
}, {
    icon: "format_strikethrough",
    style: "clear",
    name: "中划线"
}, {
    icon: "format_underlined",
    style: "underline",
    name: "下划线"
}]

const makeFunc = (textarea: any, content: any, style: any, cb: any) => {
    return () => {
        var start = textarea.selectionStart,
            end = textarea.selectionEnd;
        cb(text2md(content, style, start, end))
        textarea.focus()
        textarea.selectionStart = start;
        textarea.selectionEnd = end;
    }
}

type EditToolsState = any;

class EditTools extends React.Component<{}, EditToolsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showTextApps: false,
            history: []
        }
    }
    render() {
        const { showTextApps } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'textarea' does not exist on type 'Readon... Remove this comment to see the full error message
        const { textarea, cb, content, undo, redo } = this.props;
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-btn-group">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <button
                        onClick={() => {
                            this.setState({ showTextApps: !showTextApps })
                        }}
                        type="button" className="mdui-btn">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <i className={`${showTextApps ? 'mdui-text-color-theme-accent' : ''} mdui-icon material-icons`}>font_download</i>
                    </button>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <button
                        onClick={() => {
                            undo()
                        }}
                        type="button" className="mdui-btn">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <i className="mdui-icon material-icons">undo</i>
                    </button>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <button
                        onClick={() => {
                            redo()
                        }}
                        type="button" className="mdui-btn">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <i className="mdui-icon material-icons">redo</i>
                    </button>
                    {appMenu.map((a, i) => (
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <button
                            key={i}
                            mdui-tooltip={`{content: '${a.name}'}`}
                            onClick={makeFunc(textarea, content, a.style, cb)}
                            type="button" className="mdui-btn">
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            {a.icon ? <i className="mdui-icon material-icons">{a.icon}</i> : a.text}
                        </button>
                    ))}
                </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div
                    style={{ display: (showTextApps) ? 'block' : 'none' }}
                    className="bottom-dashboard mdui-card mdui-p-a-1">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-btn-group">
                        {textApps.map((a, i) => (
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <button
                                key={i}
                                mdui-tooltip={`{content: '${a.name ? a.name : a.text}'}`}
                                onClick={makeFunc(textarea, content, a.style, cb)}
                                type="button" className="mdui-btn"
                            >
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                {a.icon ? <i className="mdui-icon material-icons">{a.icon}</i> : a.text}
                            </button>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

type ComponentState = any;

/**
  * Markdown编辑器 2020-2-12 江村暮
  * @param function cb(mdText) {
      //回调函数
  }
  */

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type '{}'.
            history: [props.content],
            editVersion: 0
        }
    }
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { content, cb } = this.props
        const { editVersion, history } = this.state
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <EditTools
                // @ts-expect-error ts-migrate(2322) FIXME: Property 'content' does not exist on type 'Intrins... Remove this comment to see the full error message
                content={content}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'textarea' does not exist on type 'defaul... Remove this comment to see the full error message
                textarea={this.textarea}
                cb={(newSet: any) => {
                    cb(newSet);
                    history.push(newSet)
                    this.setState({
                        history: history,
                        editVersion: history.length - 1
                    })
                }}
                undo={() => {
                    if (editVersion > 0) {
                        cb(history[editVersion - 1])
                        this.setState({
                            editVersion: editVersion - 1
                        })
                    }
                }}
                redo={() => {
                    if (editVersion < history.length - 1) {
                        cb(history[editVersion + 1])
                        this.setState({
                            editVersion: editVersion + 1
                        })
                    }
                }}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-divider"></div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div
                className="mdui-textfield">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <textarea
                    style={{ cursor: 'text' }}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'textarea' does not exist on type 'defaul... Remove this comment to see the full error message
                    ref={r => this.textarea = r}
                    placeholder='内容会自动保存，支持markdown'
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                    rows="40"
                    onChange={e => {
                        cb(e.target.value);
                        history.push(e.target.value)
                        this.setState({
                            history: history,
                            editVersion: history.length - 1
                        })
                    }}
                    value={content}
                    autoFocus type='text' className="mdui-textfield-input">
                </textarea>
            </div>
        </>;
    }
}
