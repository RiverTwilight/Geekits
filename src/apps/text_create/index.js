import React, { useState } from 'react';
import Input from '../../utils/Component/Input'
import Select from '../../utils/Component/Select'
import textCreate from './engine'

const Result = ({ data }) => {
    if (!data) return null
    return (
        <div className="mdui-card mdui-p-a-1">
        </div>
    )
}

export default () => {
    const [template, changeTemplate] = useState('test${0}');
    const [arrayType, setArrayType] = useState(0);
    const [func, setFunc] = useState(1)
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
                            placeholder={arrayType === 0 ? '公差' : '公比'}
                            type="number"
                            icon="add_circle_outline"
                        />
                    </div>
                    <div className="mdui-col">
                        <Input
                            onValueChange={setFunc}
                            value={func}
                            placeholder={arrayType === 0 ? '公差' : '公比'}
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
                        var engine = new textCreate(template)
                    }}
                    className="mdui-float-right mdui-color-theme mdui-btn mdui-btn-raised">
                    生成
                </button>
            </div>
            <br></br>
            <Result />
        </>
    )
}
