import React, { useState } from 'react';
import Input from '../../components/Input'
import Select from '../../components/Select'
import { regularTextCreate } from './engine'
import Tab from '../../components/Tab'

export default () => (
    <Tab
        tabs={[
            {
                text: '规律文本',
                id: 'regular',
                component: <RegularText />
            }, {
                text: '模板文本',
                id: 'template'
            }
        ]}
    />
)

const ResultCard = ({ data }) => {
    if (!data) return null
    return (
        <div className="mdui-card mdui-p-a-1">
            <ul className="mdui-list">
                {data.map((item, i) => (
                    <li className="mdui-list-item" key={i}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

const RegularText = () => {
    const [template, changeTemplate] = useState('test${0}');
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
                            name: '等差数列',
                            value: 0
                        }, {
                            name: '等比数列',
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
