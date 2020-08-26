import React from 'react'

const text2md = (str, style, start, end) => {
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

const makeFunc = (textarea, content, style, cb) => {
    return () => {
        var start = textarea.selectionStart,
            end = textarea.selectionEnd;
        cb(text2md(content, style, start, end))
        textarea.focus()
        textarea.selectionStart = start;
        textarea.selectionEnd = end;
    }
}

class EditTools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextApps: false,
            history: []
        }
    }
    render() {
        const { showTextApps } = this.state;
        const { textarea, cb, content, undo, redo } = this.props;
        return (
            <>
                <div className="mdui-btn-group">
                    <button
                        onClick={() => {
                            this.setState({ showTextApps: !showTextApps })
                        }}
                        type="button" className="mdui-btn">
                        <i className={`${showTextApps ? 'mdui-text-color-theme-accent' : ''} mdui-icon material-icons`}>font_download</i>
                    </button>
                    <button
                        onClick={() => {
                            undo()
                        }}
                        type="button" className="mdui-btn">
                        <i className="mdui-icon material-icons">undo</i>
                    </button>
                    <button
                        onClick={() => {
                            redo()
                        }}
                        type="button" className="mdui-btn">
                        <i className="mdui-icon material-icons">redo</i>
                    </button>
                    {appMenu.map((a, i) => (
                        <button
                            key={i}
                            mdui-tooltip={`{content: '${a.name}'}`}
                            onClick={makeFunc(textarea, content, a.style, cb)}
                            type="button" className="mdui-btn">
                            {a.icon ? <i className="mdui-icon material-icons">{a.icon}</i> : a.text}
                        </button>
                    ))}
                </div>
                <div
                    style={{ display: (showTextApps) ? 'block' : 'none' }}
                    className="bottom-dashboard mdui-card mdui-p-a-1">
                    <div className="mdui-btn-group">
                        {textApps.map((a, i) => (
                            <button
                                key={i}
                                mdui-tooltip={`{content: '${a.name ? a.name : a.text}'}`}
                                onClick={makeFunc(textarea, content, a.style, cb)}
                                type="button" className="mdui-btn"
                            >
                                {a.icon ? <i className="mdui-icon material-icons">{a.icon}</i> : a.text}
                            </button>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

/**
  * Markdown编辑器 2020-2-12 江村暮
  * @param function cb(mdText) {
      //回调函数
  }
  */

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [props.content],
            editVersion: 0
        }
    }
    render() {
        const { content, cb } = this.props
        const { editVersion, history } = this.state
        return (
            <>
                <EditTools
                    content={content}
                    textarea={this.textarea}
                    cb={newSet => {
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
                <div className="mdui-divider"></div>
                <div
                    className="mdui-textfield">
                    <textarea
                        style={{ cursor: 'text' }}
                        ref={r => this.textarea = r}
                        placeholder='内容会自动保存，支持markdown'
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
            </>
        )
    }
}
