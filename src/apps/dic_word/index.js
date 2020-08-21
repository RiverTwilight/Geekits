import React, { useState } from 'react'
import Template from '../../utils/AskForTemplate.tsx'
import { ToTop } from 'mdui-in-react'

const Word = ({ item }) => {
    const [open, setOpen] = useState(false);
    //item.more = item.more.replace(/\n/g, "<br>")
    return (
        <div key={item.word} className="mdui-table-fluid">
            <table className="mdui-table">
                <tbody>
                    <tr>
                        <td>汉字</td>
                        <td style={{ fontSize: '1.5em' }}>
                            <ruby>
                                {item.word}<rp>(</rp><rt>{item.pinyin}</rt><rp>)</rp>
                            </ruby>
                        </td>
                        <td>旧体字</td>
                        <td>{item.oldword}</td>
                    </tr>
                    <tr>
                        <td>偏旁</td>
                        <td>{item.radicals}</td>
                        <td>笔画</td>
                        <td>{item.strokes}</td>
                    </tr>
                    <tr>
                        <td colSpan="4">{item.explanation}</td>
                    </tr>
                    <tr style={{ display: !open ? "contents" : "none" }}>
                        <td colSpan="4" >
                            {item.more.substring(0, 200)}...
                            <button onClick={() => setOpen(true)} className="mdui-float-right mdui-btn">展开</button>
                        </td>
                    </tr>
                    {item.more.length > 200 &&
                        <tr style={{ display: open ? "contents" : "none" }} >
                            <td colSpan="4" >
                                {item.more}<br></br>
                                <button onClick={() => setOpen(false)} className="mdui-float-right mdui-btn">收起</button>
                            </td>
                        </tr>}
                </tbody>
            </table>
        </div>
    )
}

const Result = ({ data }) => {
    if (!data) return null
    if (!data.length) return <p className="mdui-text-center">暂未收录，建议谷歌一下</p>
    return (
        <>
            {data.map((item) => (
                <Word key={item.word} item={item} />
            ))}
        </>
    )
}

export default () => (
    <>
        <Template
            Result={Result}
            api="https://api.ygktool.cn/api/dic_word?word="
            inputOpt={{
                header: '从14502个汉字中查询',
                icon: 'search'
            }}
        />
        <ToTop />
    </>
)
