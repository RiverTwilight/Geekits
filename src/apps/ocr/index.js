import React from 'react'
import { snackbar } from 'mdui'
import axios from 'axios'
import ClipboardJS from 'clipboard'

import ListControlMenu from '../../utils/Component/ListControlMenu'
import ListControlCheck from '../../utils/Component/ListControlCheck'


import FileRead from '../../utils/fileread'
import Cropper from '../../utils/Cropper'

const numMark = text => {
    var reg = /^1[3|4|5|7|8]\d{9}$/g;
    if (reg.test(text)) return text
    var text = text.replace(reg, '<span data-clipboard-text="$&" class="copy mdui-text-color-theme">$&</span>');
    return text
}

const emailMark = text => {
    var reg = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/g;
    if (reg.test(text)) return text
    var text = text.replace(reg, '<span data-clipboard-text="$&" class="copy mdui-text-color-theme">$&</span>');
    return text
}

const urlMark = text => {
    var reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/g;
    console.log(text + ' is a url', reg.test(text))
    if (reg.test(text)) return text
    var text = text.replace(reg, '<span data-clipboard-text="$&" class="copy mdui-text-color-theme">$&</span>');
    return text
}

const Result = ({ data, ifIgnoreLine, onIgnoreLine }) => {
    if (data === null) return null
    const Tag = ifIgnoreLine ? "span" : "p";
    var markedText = [];
    var copiedText = '';
    data.words_result.map(line => {
        markedText.push(emailMark(urlMark(line.words)))
        copiedText += line.words
    })
    console.log(markedText)
    return (
        <>
            <div className="mdui-card">
                <div className="mdui-card-content">
                    <ListControlCheck
                        icon="keyboard_return"
                        title="忽略换行"
                        checked={ifIgnoreLine}
                        onCheckedChange={checked => {
                            onIgnoreLine(checked)
                        }}
                    />
                    {
                        markedText.map((line, i) => (
                            <Tag key={i} dangerouslySetInnerHTML={{ __html: line }}></Tag>
                        ))
                    }
                </div>
                <div className="mdui-card-actions">
                    <button
                        data-clipboard-text={copiedText}
                        className="copy mdui-btn mdui-color-theme mdui-btn-raised">
                        复制
                    </button>
                </div>
            </div>
        </>
    )
}

const language_types = [{
    name: '中英混合',
    value: 'CHN_ENG'
}, {
    name: '英语',
    value: 'ENG'
}, {
    name: '葡萄牙语',
    value: 'POR'
}, {
    name: '法语',
    value: 'FRE'
}, {
    name: '意大利语',
    value: 'ITA'
}, {
    name: '德语',
    value: 'GER'
}, {
    name: '西班牙语',
    value: 'SPA'
}, {
    name: '俄语',
    value: 'RUS'
}, {
    name: '日语',
    value: 'JAP'
}, {
    name: '韩语',
    value: 'KOR'
},]

export default class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language_type: 0,
            image: null,
            defaultImage: null,
            data: null,
            ifIgnoreLine: false,
            ifShowCropper: false
        }
    }
    componentDidMount() {
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制' })
            e.clearSelection()
        })
    }
    loadDataFromServer() {
        const { image, language_type } = this.state
        window.loadShow()
        axios.post('/api/ocr', {
            image: image.split('base64,')[1],
            language_type: language_types[language_type].value
        }).then(response => {
            var json = JSON.parse(response.request.response);
            this.setState({ data: json, image: null })
        }).catch(error => {
            snackbar({ message: error })
        }).then(() => {
            window.loadHide()
        })
    }
    render() {
        const { image, defaultImage, ifIgnoreLine, ifShowCropper, data, language_type } = this.state
        return (
            <>
                <div style={{ display: ifShowCropper ? 'none' : 'block' }}>
                    <div className="mdui-card">
                        <div className="mdui-card-content">
                            {image && <img
                                style={{
                                    display: 'block',
                                    margin: '0 auto',
                                    maxHeight: '200px'
                                }}
                                src={image} />}
                            <ListControlMenu
                                icon="language"
                                title="语言"
                                checked={language_type}
                                onCheckedChange={checked => {
                                    this.setState({ language_type: checked })
                                }}
                                items={language_types}
                            />
                        </div>
                        <div className="mdui-card-actions">
                            <button
                                style={{
                                    display: image ? 'inline-block' : 'none'
                                }}
                                onClick={() => {
                                    this.setState({
                                        ifShowCropper: true,
                                        image: defaultImage
                                    })
                                }}
                                className="mdui-ripple mdui-btn">
                                重新裁剪
                            </button>
                            <FileRead
                                fileType="image/*"
                                onFileChange={file => {
                                    this.setState({
                                        ifShowCropper: true,
                                        image: file,
                                        defaultImage: file
                                    })
                                }}
                            />
                            <button
                                onClick={() => {
                                    image && this.loadDataFromServer()
                                }}
                                className="loadBtn mdui-btn-raised mdui-ripple mdui-color-theme mdui-btn">
                                <i className="mdui-icon mdui-icon-left material-icons">&#xe5ca;</i>识别
                            </button>

                        </div>
                    </div>
                    <br></br>
                    <Result
                        onIgnoreLine={
                            newCheck => {
                                this.setState({ ifIgnoreLine: newCheck })
                            }
                        }
                        ifIgnoreLine={ifIgnoreLine}
                        data={data}
                    />
                </div>
                <Cropper
                    ifShow={ifShowCropper}
                    img={image}
                    onClose={() => {
                        this.setState({ ifShowCropper: false })
                    }}
                    onConfirm={img => {
                        this.setState({ ifShowCropper: false, image: img })
                    }}
                    title=""
                />
            </>
        )
    }
}
