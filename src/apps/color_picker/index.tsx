import React from 'react'
import ClipboardJS from 'clipboard'
import { ReactComponent as Cursor } from './position.svg'
import { RangeInput, FileInput } from 'mdui-in-react'
import { snackbar } from 'mdui'

//调色盘
const ColorLens = ({
    onChange,
    rgb,
    isHide
}: any) => {
    if (isHide) return null
    const [r, g, b, a] = rgb.replace(/\s/g, '').split(',');
    const SameProps = {
        max: "255",
        min: "0",
        step: "1"
    }
    return (
        
        <div className="mdui-row-md-2">
            
            <div className="mdui-col">
                
                <RangeInput
                    {...SameProps}
                    title="R"
                    value={r}
                    onValueChange={newValue => {
                        onChange(`${newValue}, ${g}, ${b}, ${a}`)
                    }}
                />
            </div>
            
            <div className="mdui-col">
                
                <RangeInput
                    {...SameProps}
                    title="G"
                    value={g}
                    onValueChange={newValue => {
                        onChange(`${r}, ${newValue}, ${b}, ${a}`)
                    }}
                />
            </div>
            
            <div className="mdui-col">
                
                <RangeInput
                    {...SameProps}
                    title="B"
                    value={b}
                    onValueChange={newValue => {
                        onChange(`${r}, ${g}, ${newValue}, ${a}`)
                    }}
                />
            </div>
            
            <div className="mdui-col">
                
                <RangeInput
                    {...SameProps}
                    value={a}
                    title="A"
                    onValueChange={newValue => {
                        // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
                        onChange(`${r}, ${g}, ${b}, ${Math.floor(newValue / 255 * 100) / 100}`)
                    }}
                />
            </div>
        </div>
    )
}

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            imgFile: null,
            positionX: 0,
            positionY: 0,
            ctx: null,
            rgb: "255, 255, 255, 0",
            binary: "#ffffff",
            fixed: false,
            marginLeft: 0,
            isHideLens: true
        }
    }
    moveUp() {
        const { positionY, positionX } = this.state
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(_: any) => void' is not assigna... Remove this comment to see the full error message
        this.setState({ positionY: positionY - 1 }, (_: any) => { this.getColor(positionX, positionY) })
    }
    moveDown() {
        const { positionY, positionX } = this.state
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(_: any) => void' is not assigna... Remove this comment to see the full error message
        this.setState({ positionY: positionY + 1 }, (_: any) => { this.getColor(positionX, positionY) })
    }
    moveLeft() {
        const { positionX, positionY } = this.state
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(_: any) => void' is not assigna... Remove this comment to see the full error message
        this.setState({ positionX: positionX - 1 }, (_: any) => { this.getColor(positionX, positionY) })
    }
    moveRight() {
        const { positionX, positionY } = this.state
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(_: any) => void' is not assigna... Remove this comment to see the full error message
        this.setState({ positionX: positionX + 1 }, (_: any) => { this.getColor(positionX, positionY) })
    }
    componentDidMount() {
        // @ts-expect-error ts-migrate(2454) FIXME: Variable 'clipboard' is used before being assigned... Remove this comment to see the full error message
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制' })
            e.clearSelection();
        });
        this.setState({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'default'... Remove this comment to see the full error message
            marginLeft: this.canvas.getBoundingClientRect().left,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'default'... Remove this comment to see the full error message
            marginTop: this.canvas.getBoundingClientRect().top
        })
        document.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 37: e.preventDefault(); this.moveLeft(); break
                case 38: e.preventDefault(); this.moveUp(); break
                case 39: e.preventDefault(); this.moveRight(); break
                case 40: e.preventDefault(); this.moveDown(); break
            }
        })
    }
    getColor(positionX: any, positionY: any) {
        const { ctx } = this.state;
        if (ctx) {
            var pixels = ctx.getImageData(positionX, positionY, 1, 1).data;
            var r = pixels[0];
            var g = pixels[1];
            var b = pixels[2];
            var a = pixels[3] / 255;
            // var grey = 0.3 * r + 0.59 * g + 0.11 * b;//灰度公式
            this.setState({
                rgb: `${r}, ${g}, ${b}, ${a}`,
                binary: '#' + r.toString(16) + g.toString(16) + b.toString(16)
            })
        }
    }
    drawImage() {
        const { imgFile } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'default'... Remove this comment to see the full error message
        const { canvas } = this;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'default'... Remove this comment to see the full error message
        var ctx = this.canvas.getContext('2d');
        var img = new Image();
        img.src = imgFile;
        img.onload = _ => {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            this.setState({ ctx: ctx })
        }
    }
    render() {
        const { rgb, binary, positionX, positionY, marginLeft, marginTop, isHideLens } = this.state
        
        return <>
            
            <span
                style={{
                    position: 'absolute',
                    height: '20px',
                    width: '20px',
                    top: positionY - 10,
                    left: positionX - 10
                }}>
                
                <Cursor />
            </span>
            
            <canvas
                onClick={e => {
                    var absoluteLeft = e.pageX - marginLeft;
                    var absoluteTop = e.pageY - marginTop;
                    this.setState({
                        positionX: absoluteLeft,
                        positionY: absoluteTop
                    })
                    this.getColor(absoluteLeft, absoluteTop);
                }}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'default'... Remove this comment to see the full error message
                ref={c => { this.canvas = c; }}
            />
            
            <div
                className="bottom-dashboard mdui-card mdui-p-a-1">
                
                <FileInput
                    readbydrag
                    fileType="image/*"
                    onFileChange={file => {
                        this.setState({
                            imgFile: file
                        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(_: any) => void' is not assigna... Remove this comment to see the full error message
                        }, (_: any) => { this.drawImage() })
                    }}
                />
                
                <div className="mdui-btn-group">
                    
                    <button onClick={_ => {
                        this.moveLeft()
                    }} type="button" className="mdui-btn">
                        
                        <i className="mdui-icon material-icons">chevron_left</i>
                    </button>
                    
                    <button onClick={_ => {
                        this.moveUp()
                    }} type="button" className="mdui-btn">
                        
                        <i className="mdui-icon material-icons">arrow_drop_up</i>
                    </button>
                    
                    <button onClick={_ => {
                        this.moveDown()
                    }} type="button" className="mdui-btn">
                        
                        <i className="mdui-icon material-icons">arrow_drop_down</i>
                    </button>
                    
                    <button onClick={_ => {
                        this.moveRight()
                    }} type="button" className="mdui-btn">
                        
                        <i className="mdui-icon material-icons">chevron_right</i>
                    </button>
                </div>
                
                <button
                    style={{ color: `rgb(${rgb})` }}
                    className="mdui-btn mdui-btn-icon"
                >
                    
                    <i className="mdui-icon material-icons">lens</i>
                </button>
                
                <button data-clipboard-text={`rgba(${rgb})`} className="copy mdui-btn">rgba({rgb})</button>
                
                <button data-clipboard-text={binary} className="copy mdui-btn">{binary}</button>
                
                <button
                    onClick={_ => {
                        this.setState({ isHideLens: !isHideLens })
                    }}
                    className="mdui-btn mdui-btn-icon"
                >
                    
                    <i className="mdui-icon material-icons">color_lens</i>
                </button>
                
                <ColorLens
                    onChange={(newColor: any) => {
                        const [r, g, b, ,] = newColor.replace(/\s/g, '').split(',').map((a: any) => parseInt(a));
                        this.setState({
                            rgb: newColor,
                            binary: '#' + r.toString(16) + g.toString(16) + b.toString(16)
                        })
                    }}
                    isHide={isHideLens}
                    rgb={rgb}
                    binary={binary}
                />
            </div>
        </>;
    }
}
