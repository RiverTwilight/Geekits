import React, { useState, useEffect } from 'react';
import { snackbar } from 'mdui'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui-in-react"' has no exported member 'T... Remove this comment to see the full error message
import { Tab, Select, Input } from 'mdui-in-react'
import { regularTextCreate, templateTextCreate } from './engine'
import ClipboardJS from 'clipboard'

const TextCreate = () => (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Tab
        tabs={[
            {
                text: '规律文本',
                id: 'regular',
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                component: <RegularText />
            }, {
                text: '模板文本',
                id: 'template',
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                component: <TemplateText />
            }
        ]}
    />
)

const ResultCard = ({
    data
}: any) => {
    useEffect(() => {
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制' })
            e.clearSelection()
        })
        clipboard.on('error', e => {
            snackbar({ message: '文本太长无法复制' })
            e.clearSelection()
        })
        return () => {
            clipboard && clipboard.destroy();
        }
    }, [])
    if (!data) return null;
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="mdui-p-a-1">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <button data-clipboard-text={data.join('\n')} className="copy mdui-btn mdui-btn-block mdui-color-theme mdui-ripple mdui-btn-raised">
                全部复制
            </button>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ul className="mdui-list">
                {data.map((item: any, i: any) => (
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <li data-clipboard-text={item} className="copy mdui-list-item" key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

const TemplateText = () => {
    const [template, changeTemplate] = useState('我是${}');
    const [func, setFunc] = useState('云极客工具');
    const [arrayType, setArrayType] = useState(3);
    const [result, setResult] = useState(null);
    const dictionary = [
        {
            template: '你知道${}吗？${}最近为什么这么火？大家都知道，${}最近很火，究竟是为什么很火呢？${}到底是什么梗？相信大家对${}都很熟悉，${}就是我们每天都会经常遇到的，但是${}是怎么回事呢？${}最近很火，其实就是因为${}在网上火了起来。大家可能会感到很惊讶，${}为什么是这样的？${}究竟为什么火起来了呢？但事实就是这样，小编也感到非常惊讶。那么以上就是今天小编为大家整理的关于${}是什么梗，'
        }, {
            template: '${}${}${}${}${}${}${}${}${}${}${}${}'
        }, {
            template: '如何编程游戏,需要学习多种编程语言。1:首先要知道游戏编程用的什么语言。2:C++语言是目前最为稳定的.指针最为全面的语言。游戏尤其网游的稳定性要求极高,因此必须用c++.3:先学${},${}是全部计算机语言的基础更是c++的基础。因此要学好。再学c++,这个要:学精，不然开发游戏没戏。然后学数据结构.数据库.线性代数。离散数学结构。4:html.css.js也要知道。5:如果要制作跨平台游戏，建议学习下openg/opengles.这是个很强大很专业的图形接口,因为很多平台支持所以适合跨平台游戏制作使用。6:做2d游戏,可以使用cocos2dx等一些引擎.当然你也可以使用上面的3d引擎制作2d游戏。在电脑上怎样编程.VB~VC~VF~C~C#~C++~JAVA~.NET~这些都是偏程ASP~CGI~PHP~JSP这些是WEB编程。。虽然都是偏程.但编出来的程序可是不一样的。目标是什么?开发?创业?还是去公司上班?还是业余爱好?如果想业余编小程序,推荐VB~VC~容易上手。简单。也蛮强大。如果想学好了去企业上班,推荐C++---.net--~JAVA之类的大型项目开发。如果想做网站。就学ASP~CGI~PHP~JSP.这4个就JSP最最最难,先学ASP。编程语言很多.但是目的都是想写出好的程序.只要学精了一个就有钱赚.一上来不要要求太高语言是用来交流沟通的计算机语言也一-样多说多练我推荐你学三种编程语言,因为推荐你学是有原因的。第--:先学习好${}。这个是学所有编程语言的基础。也是将来去考国家证书的必须要考的一门。第二:学好java,因为java在目前来说.占领地位是排第一位的。而且工资待遇也不错。市场需求占有率高达50%以上。或者学习.NET,因为.NET出来还不算太久。但是就因为是微软出的东西.所以市场占有率也已经达到了48%了.况且.NET比java要容易上手。两者之一.你可以选择一个。学java就往jsp工程师方向发展,学.NET就往ASP.NET方向发展吧。第三:顺便学-门数据库的技术。因为开发的时候.难免会要和数据库打交道。懂总比不懂要好。-般就学SQL就行了.ORACLE-般只适应于大型公司。怎么开始学编程学习编程的四个步骤建议学习编程的过程如下。第1步:决定你想做什么“我想编程,但我没有任何我想做的事情”与“我没有任何业务,但我只是想在山里行走”-样。如果你想触摸电脑世界,比如欣赏山景,我觉得这也很好。但是如果你想通过学习编程来提高自己，那就要确定你的目标!通过想象特定产品(用编程实现某个产品或功能)来学习的话，可以大大提高学习效率。也考虑市场趋势。再建议决定做什么如果您无法明确决定要做什么，那么通过查看IT领域的近期市场趋势来决定也是一件好事。如果你正在学习编程.准备找工作或换工作，那么通过在需要更多需求的领域学握必要的技能。可以增加被视为“即时战斗力”的可能性。第2步:确定要学习的语言PHP推荐蚊程:《PHP教程》PHP(外文名:PHP:HypertextPreprocessor.中文名:“超文本预处理器”)是-种通用开源脚本语言。语法吸收了${}、Java和Perl的特点，利于学习。使用广泛.主要适用于Web开发领域。Java推荐教程:《Java教程》Java是一门面向对象编程语言.不仅吸收了C++.语言的各种优点.还摒弃了C++里难以理解的多继承指针等概念.因此Java语言具有功能强大和简单易用两个特征。Java语言作为静态面向对象编程语言的代表,极好地实现了面向对象理论,允许程序员以优雅的思维方式进行复杂的编程。Python推荐教程:《Python教程》Python是-种计算机程序设计语言。是一种动态的.面向对象的脚本语言.最初被设计用于编写自动化脚本(shell),随著版本的不断更新和语言新功能的添加，越来越多被用于独立的.大型项目的开发。第三步:了解环境构建和使用工具创建环境是为了能够在计算机(个人计算机)上使用所选择的编程语言。环境构建意味着安排计算机和信息系统的状态,以便特定的设备,软件,系统等运行。'
        }, {
            template: ''
        }]
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="mdui-p-a-1">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                onValueChange={changeTemplate}
                placeholder="模板串"
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                rows="4"
                value={template}
                icon="functions"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                onValueChange={setFunc}
                placeholder="关键字"
                value={func}
                icon="font_download"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Select
                onOptionChange={(value: any) => {
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
                        name: '狗屁不通-编程',
                        value: 2
                    }, {
                        name: '自定义',
                        value: 3
                    }
                ]}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <button
                onClick={() => {
                    const res = templateTextCreate({
                        template,
                        func
                    })
                    // @ts-expect-error ts-migrate(2345) FIXME: Type 'string[]' provides no match for the signatur... Remove this comment to see the full error message
                    setResult(res)
                }}
                className="mdui-float-right mdui-color-theme mdui-btn mdui-btn-raised">
                生成
            </button>
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <br></br>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ResultCard
            data={result}
        />
    </>;
}

const RegularText = () => {
    const [template, changeTemplate] = useState('${5}test${0}');
    const [arrayType, setArrayType] = useState(0);
    const [func, setFunc] = useState(1);
    const [length, setLength] = useState(10);
    const [result, setResult] = useState(null);
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-p-a-1">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Input
                    onValueChange={changeTemplate}
                    placeholder="模板串"
                    value={template}
                    icon="functions"
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-row-xs-2">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-col">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Input
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'SetStateA... Remove this comment to see the full error message
                            onValueChange={setFunc}
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
                            value={func}
                            header={arrayType === 0 ? '公差' : '公比'}
                            type="number"
                            icon="add_circle_outline"
                        />
                    </div>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-col">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Input
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<number>>' is not ass... Remove this comment to see the full error message
                            onValueChange={setLength}
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
                            value={length}
                            header="长度"
                            type="number"
                            icon="add_circle_outline"
                        />
                    </div>
                </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <button
                    onClick={() => {
                        const res = regularTextCreate({
                            template,
                            length,
                            func,
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type '0 | 1'.
                            arrayType
                        })
                        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string[]' is not assignable to p... Remove this comment to see the full error message
                        setResult(res)
                    }}
                    className="mdui-float-right mdui-color-theme mdui-btn mdui-btn-raised">
                    生成
                </button>
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <br></br>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ResultCard
                data={result}
            />
        </>
    )
}

export default TextCreate
