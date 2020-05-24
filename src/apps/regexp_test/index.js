import React from 'react'
import Input from '../../components/Input.tsx'

const test = (unMarkedExp, unMarkedText) => {
    try {
        const markedExp = unMarkedExp.replace(/\\/g, '\\').replace(/\</, '&lt;')
          , markedText = unMarkedText.replace(/\</, '&lt;').replace(/\>/, '&gt;').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
          , reg = new RegExp(markedExp, 'g');
          //不要调整replace顺序
        //console.log(markedExp, markedText)
        return markedText.replace(reg, '<span style="background-color:#9be49e">$&</span>')
    } catch (err) {
        console.log(err)
    }
}

const Link = ({ onInput }) => {
    const list = [
        {
            exp: '\\d+\\.\\d+\\.\\d+\\.\\d+',
            description: 'IP地址'
        },
        {
            exp: '\\d{4}-\\d{1,2}-\\d{1,2}',
            description: '日期yyyy-mm-dd'
        },
        {
            exp: '[1-9][0-9]{4,}',
            description: 'QQ号'
        },
        {
            exp: 'http(s)?:\/\/([\\w-]+\\.)+[\\w-]+(\/[\\w- .\/?%&=]*)?',
            description: 'url'
        },
        {
            exp: '[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$',
            description: 'E-mail'
        }
    ]
    return (
        <div className="mdui-card mdui-p-a-1">
            <ul className="mdui-list mdui-row-md-6 mdui-row-sm-4 mdui-row-xs-3 mdui-list-dense">
                <li className="mdui-subheader">常用正则</li>
                {
                    list.map((reg, i) => (
                        <li key={i} onClick={() => {
                            onInput(reg.exp)
                        }} className="mdui-col mdui-list-item mdui-ripple">
                            {reg.description}
                        </li>
                    ))
                }</ul>
        </div>
    )
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exp: '\\d+\\.\\d+\\.\\d+\\.\\d+',
            toTest: 'IP address: 118.484.15.11\nLocation: Tokyo, Japan',
            tempTest: 'IP address: 118.484.15.11\nLocation: Tokyo, Japan'
        }
    }
    render() {
        const { exp, toTest, tempTest } = this.state
        return (
            <>
                <Input
                    onValueChange={newText => {
                        this.setState({
                            exp: newText
                        })
                    }}
                    header="正则表达式"
                    icon="attach_money"
                    value={exp}
                />
                <Link
                    onInput={exp => this.setState({ exp: exp })}
                />
                <br></br>
                <div style={{
                    position: 'relative',
                    height: '180px',
                    overflowY: 'auto',
                    fontSize: '1.2em'
                }} className="mdui-card mdui-col">
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            outline: 'none',
                            color: 'transparent'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: test(exp, toTest).replace(/\n/g, '<br>')
                        }}
                        className="mdui-typo mdui-p-a-2"
                    >
                    </div>
                    <textarea
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            zIndex: '1',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            border: 'none',
                            width: '100%',
                            height: '100%'
                        }}
                        className="mdui-typo mdui-p-a-2"
                        onChange={e => {
                            this.setState({
                                toTest: e.target.value,
                                tempTest: e.target.value
                            })
                        }}
                        value={tempTest}
                    >
                    </textarea>
                </div>
            </>
        )
    }
}
