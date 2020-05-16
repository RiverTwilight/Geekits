import React, { useState, useEffect } from 'react';
import { snackbar } from 'mdui'
import Input from '../../components/Input'
import Tab from '../../components/Tab'
import Select from '../../components/Select'
import { regularTextCreate, templateTextCreate } from './engine'
import ClipboardJS from 'clipboard'

export default () => (
    <Tab
        tabs={[
            {
                text: '规律文本',
                id: 'regular',
                component: <RegularText />
            }, {
                text: '模板文本',
                id: 'template',
                component: <TemplateText />
            }
        ]}
    />
)

const ResultCard = ({ data }) => {
    if (!data) return null;
    useEffect(() => {
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制' })
            e.clearSelection()
        })
        clipboard.on('error', e => {
            snackbar({ message: '文本太长无法复制' })
            e.clearSelection()
        })
    }, [])
    return (
        <div className="mdui-card mdui-p-a-1">
            <button data-clipboard-text={data.join('\n')} className="copy mdui-btn mdui-btn-block mdui-color-theme mdui-ripple mdui-btn-raised">
                全部复制
            </button>
            <ul className="mdui-list">
                {data.map((item, i) => (
                    <li data-clipboard-text={item} className="copy mdui-list-item" key={i}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

const TemplateText = () => {
    const [template, changeTemplate] = useState('我是${}');
    const [func, setFunc] = useState('云极客工具');
    const [arrayType, setArrayType] = useState(2);
    const [result, setResult] = useState(null);
    const dictionary = [
        {
            template: '你知道${}吗？${}最近为什么这么火？大家都知道，${}最近很火，究竟是为什么很火呢？${}到底是什么梗？相信大家对${}都很熟悉，${}就是我们每天都会经常遇到的，但是${}是怎么回事呢？${}最近很火，其实就是因为${}在网上火了起来。大家可能会感到很惊讶，${}为什么是这样的？${}究竟为什么火起来了呢？但事实就是这样，小编也感到非常惊讶。那么以上就是今天小编为大家整理的关于${}是什么梗，'
        }, {
            template: '${}${}${}${}${}${}${}${}${}${}${}${}'
        }, {
            template: ''
        }]
    return (
        <>
            <div className="mdui-card mdui-p-a-1">
                <Input
                    onValueChange={changeTemplate}
                    placeholder="模板串"
                    rows="4"
                    value={template}
                    icon="functions"
                />
                <Input
                    onValueChange={setFunc}
                    placeholder="关键字"
                    value={func}
                    icon="font_download"
                />
                <Select
                    onOptionChange={value => {
                        setArrayType(value)
                        changeTemplate(dictionary[value].template)
                    }}
                    value={arrayType}
                    config={{
                        position: 'top'
                    }}
                    options={[
                        {
                            name: '营销号文案',
                            value: 0
                        }, {
                            name: '复读机',
                            value: 1
                        }, {
                            name: '自定义',
                            value: 2
                        }
                    ]}
                />
                <button
                    onClick={() => {
                        const res = templateTextCreate({
                            template,
                            func
                        })
                        setResult(res)
                    }}
                    className="mdui-float-right mdui-color-theme mdui-btn mdui-btn-raised">
                    生成
                </button>
            </div>
            <br></br>
            <ResultCard
                data={result}
            />
        </>
    )
}

const RegularText = () => {
    const [template, changeTemplate] = useState('${5}test${0}');
    const [arrayType, setArrayType] = useState(0);
    const [func, setFunc] = useState(1);
    const [length, setLength] = useState(10);
    const [result, setResult] = useState(null);
    return (
        <>
            <div className="mdui-card mdui-p-a-1">
                <Input
                    onValueChange={changeTemplate}
                    placeholder="模板串"
                    value={template}
                    icon="functions"
                />
                <div className="mdui-row-xs-2">
                    <div className="mdui-col">
                        <Input
                            onValueChange={setFunc}
                            value={func}
                            header={arrayType === 0 ? '公差' : '公比'}
                            type="number"
                            icon="add_circle_outline"
                        />
                    </div>
                    <div className="mdui-col">
                        <Input
                            onValueChange={setLength}
                            value={length}
                            header="长度"
                            type="number"
                            icon="add_circle_outline"
                        />
                    </div>
                </div>
                <Select
                    onOptionChange={setArrayType}
                    value={arrayType}
                    config={{
                        position: 'top'
                    }}
                    options={[
                        {
                            name: '等差',
                            value: 0
                        }, {
                            name: '等比',
                            value: 1
                        }
                    ]}
                />
                <button
                    onClick={() => {
                        const res = regularTextCreate({
                            template,
                            length,
                            func,
                            arrayType
                        })
                        setResult(res)
                    }}
                    className="mdui-float-right mdui-color-theme mdui-btn mdui-btn-raised">
                    生成
                </button>
            </div>
            <br></br>
            <ResultCard
                data={result}
            />
        </>
    )
}
