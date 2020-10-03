import React from 'react'
import saveFile from '../../utils/fileSaver'
import html2canvas from 'html2canvas'
import { FileInput, Input, ColorPicker, RangeInput, BottomAlert as NewPage  } from 'mdui-in-react'

const Result = ({
    src
}: any) => {
    if (!src) return null
    return (
        
        <img alt="生成结果" src={src} className="mdui-img-fluid" />
    )
}

type DragTextState = any;

class DragText extends React.Component<{}, DragTextState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            drag: {//开始拖拽时手指的位置
                startX: 0,
                startY: 0
            },
            startPosition: {//开始拖拽时文字的位置
                x: -30,
                y: 210
            },
            x_axis: 40,
            y_axis: 210,
            width: 490,
            height: 410,
        }
    }
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'color' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { color, style, size, text } = this.props;
        const { drag, startPosition, x_axis, y_axis } = this.state
        return (
            
            <span
                onTouchMove={e => {
                    var ev = e || window.event;
                    var touch = ev.targetTouches[0];
                    var distance = {
                        x: touch.clientX - drag.startX,
                        y: touch.clientY - drag.startY
                    }
                    this.setState({
                        x_axis: startPosition.x + distance.x,
                        y_axis: startPosition.y + distance.y
                    })
                }}
                onTouchStart={e => {
                    var ev = e || window.event;
                    var touch = ev.targetTouches[0];
                    //保存开始时位置
                    this.setState({
                        drag: {
                            startX: touch.clientX,
                            startY: touch.clientY
                        },
                        startPosition: {
                            x: x_axis,
                            y: y_axis
                        }
                    })
                }}
                draggable={true}
                onDragStart={e => {
                    this.setState({
                        drag: {
                            startX: e.pageX,
                            startY: e.pageY
                        },
                        startPosition: {
                            x: x_axis,
                            y: y_axis
                        }
                    })
                }}
                onDrag={e => {
                    var distance = {
                        x: e.pageX - drag.startX,
                        y: e.pageY - drag.startY
                    }
                    if (e.pageY > 0 || e.pageX > 0) {
                        this.setState({
                            x_axis: startPosition.x + distance.x,
                            y_axis: startPosition.y + distance.y
                        })
                    }
                }}
                style={{
                    //display:(this.state.src === null)?'none':'block',
                    position: 'absolute',
                    color: color,
                    fontSize: size + "px",
                    fontStyle: (style === 'italic') ? style : 'normal',
                    fontWeight: style,
                    marginLeft: x_axis,
                    marginTop: y_axis - size,
                    cursor: 'move',
                    touchAction: 'none'//取消页面滑动
                }} id="drag">
                {text}
            </span>
        )
    }
}

//预览图片
const Preview = (props: any) => {
    
    const element = <img
        crossOrigin="anonymous"
        alt="选择一张图片" height="100%" width='100%'
        src={props.src || '/emoticon/1.jpg'}
    />;
    return element
}

//文字样式
const StyleSet = ({
    color,
    handle,
    style
}: any) => {
    return (
        
        <div className="mdui-row-xs-2">
            
            <div className="mdui-col">
                
                <ColorPicker
                    text="文本颜色"
                    color={color}
                    onColorChange={newColor => {
                        handle({ color: newColor })
                    }}
                />
            </div>
            
            <div className="mdui-col">
                
                <select
                    value={style}
                    onChange={e => {
                        handle({ style: e.target.value })
                    }}
                    className="mdui-select" mdui-select="{position:'top'}"
                >
                    
                    <option value="normal">正常字体风格</option>
                    
                    <option value="bold">加粗字体风格</option>
                    
                    <option value="italic">倾斜字体风格</option>
                </select>
            </div>
        </div>
    )
}

const AssestsList = ({
    onChoose
}: any) => {
    return (
        
        <div className="mdui-row-xs-3 mdui-row-sm-4 mdui-row-md-5 mdui-row-lg-6 mdui-row-xl-7 mdui-grid-list">
            {Array(30).fill(0).map((_, i) => (
                
                <div key={i} className="mdui-col">
                    
                    <div onClick={() => onChoose(i + 1)} className="mdui-grid-tile">
                        
                        <img
                            alt={`(${i + 1}).jpg`}
                            src={`/emoticon/${i + 1}.jpg`}
                        />
                    </div>
                </div>
            ))
            }
        </div>
    )
}

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            src: null,
            size: 20,
            color: '#000000',
            texts: ['输入文字'],
            width: 490,
            height: 410,
            style: 'normal',
            ifShow: true,
            result: null
        }
    }
    render() {
        const { src, result, ifShow, texts, style, size, color } = this.state
        
        return <>
            
            <div className="mdui-card mdui-p-a-1" >
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
                <center>
                    
                    <div
                        id="capture"
                        style={{
                            height: '250px', width: '250px'//border:'1px solid #888888'
                        }}>
                        {texts.map((text: any, i: any) => (
                            
                            <DragText
                                key={i}
                                // @ts-expect-error ts-migrate(2322) FIXME: Property 'text' does not exist on type 'IntrinsicA... Remove this comment to see the full error message
                                text={text}
                                style={style}
                                size={size}
                                color={color}
                            />
                        ))
                        }
                        
                        <Preview src={src} />
                    </div>
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
                </center>
                
                <br></br>
                
                <div className="mdui-row-xs-3">
                    
                    <div className="mdui-col">
                        
                        <FileInput
                            fileType="image/*"
                            multiple={false}
                            onFileUpload={file => {
                                this.setState({ src: file })
                            }}
                        />
                    </div>
                    
                    <div className="mdui-col">
                        
                        <button
                            onClick={() => {
                                texts.push(`输入文字${texts.length + 1}`)
                                this.setState({ texts: texts })
                            }}
                            className="mdui-btn">
                            
                            <i className="mdui-icon-left mdui-icon material-icons">add</i>
                            新增输入框
                            </button>
                    </div>
                    
                    <div className="mdui-col">
                        
                        <button
                            onClick={() => {
                                this.setState({ ifShow: true })
                                //var index = parseInt(Math.random() * (266 - 0 + 1) + 0, 10); //随机选取0到最大值之间的整数
                                //this.setState({src:`/emo_assests/ (${index}).jpg`})         
                            }}
                            className="mdui-btn">
                            
                            <i className="mdui-icon-left mdui-icon material-icons">add_shopping_cart</i>
                            换个素材
                            </button>
                    </div>
                </div>
            </div>
            
            <br></br>
            
            <NewPage
                onClose={() => {
                    this.setState({ ifShow: false })
                }}
                title="选择素材"
                ifShow={ifShow}
                height={500}
            >
                
                <AssestsList
                    onChoose={(i: any) => {
                        this.setState({ ifShow: false, src: `/emoticon/${i}.jpg` })
                    }}
                />
            </NewPage>
            
            <br></br>
            
            <div className="mdui-card mdui-p-a-1" >
                
                <RangeInput
                    value={size}
                    min="5" max="100"
                    onValueChange={newValue => {
                        this.setState({ size: newValue })
                    }}
                    title={"文字大小" + size + "px"}
                />
                {texts.map((text: any, i: any) => (
                    
                    <Input
                        key={i}
                        onValueChange={newText => {
                            texts.splice(i, 1, newText)
                            this.setState({ texts: texts })
                        }}
                        header="输入文本"
                        value={text}
                    />
                ))
                }
                
                <StyleSet
                    color={color}
                    style={style}
                    handle={(e: any) => {
                        this.setState(e)
                    }}
                />
            </div>
            
            <button
                onClick={() => {
                    // @ts-expect-error ts-migrate(2345) FIXME: Type 'null' is not assignable to type 'HTMLElement... Remove this comment to see the full error message
                    html2canvas(document.querySelector("#capture")).then(canvas => {
                        var base64 = canvas.toDataURL();
                        this.setState({
                            result: base64
                        }, () => {
                            // @ts-expect-error ts-migrate(2345) FIXME: Property 'type' is missing in type '{ file: string... Remove this comment to see the full error message
                            saveFile({
                                file: base64,
                                filename: "ygktool-emoticon.jpg"
                            })
                        })
                    })
                }}
                className="mdui-color-theme mdui-fab mdui-fab-fixed">
                
                <i className="mdui-icon material-icons">&#xe5ca;</i>
            </button>
            
            <Result src={result} />
        </>;
    }
}
