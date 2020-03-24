import React from 'react'
import FileRead from '../../utils/fileread'
import ClipboardJS from 'clipboard'
import { snackbar } from 'mdui'

/*调试时不要打开React Developer工具！***/

class Ui extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imgFile: null,
            positionX:0,
            positionY:0,
            ctx: null,
            rgb:"255, 255, 255, 0",
            binary: "#ffffff",
            fixed: false
        }
    }
    moveUp(){
        const { positionY, positionX } = this.state
        this.setState({positionY:positionY - 1}, _ => { this.getColor(positionX, positionY)})
    }
    moveDown(){
        const { positionY, positionX } = this.state
        this.setState({positionY:positionY + 1}, _ => { this.getColor(positionX, positionY)})
    }
    moveLeft(){
        const { positionX, positionY } = this.state
        this.setState({positionX:positionX - 1}, _ => { this.getColor(positionX, positionY)})
    }
    moveRight(){
        const { positionX, positionY } = this.state
        this.setState({positionX:positionX + 1}, _ => { this.getColor(positionX, positionY)})
    }
    componentDidMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', e=> {
            snackbar({message:'已复制颜色代码'})
            e.clearSelection();
        })
        document.addEventListener('keydown',e=>{
            switch(e.keyCode){
                case 37:this.moveLeft();break
                case 38:this.moveUp();break
                case 39:this.moveRight();break
                case 40:this.moveDown();break
            }
        })
    }
    getColor(positionX, positionY){
        const { ctx } = this.state;
        const { canvas } = this
        if(ctx){
            var exactPositionX = positionX - Math.round(canvas.getBoundingClientRect().left);
            var exactPositionY = positionY - Math.round(canvas.getBoundingClientRect().top)
            var pixels = ctx.getImageData(exactPositionX, exactPositionY, 1, 1).data;
            var r = pixels[0];
            var g = pixels[1];
            var b = pixels[2];
            var a = pixels[3]/255;
            var grey = 0.3*r + 0.59*g + 0.11*b;//灰度公式
            this.setState({
                rgb: `${r}, ${g}, ${b}, ${a}`,
                binary: '#' + r.toString(16) + g.toString(16) + b.toString(16)
            })
        }
    }
    drawImage(){
        const { imgFile } = this.state;
        const { canvas } = this;
        var ctx = this.canvas.getContext('2d');
        var img = new Image;
        img.src = imgFile;
        img.onload = _ => {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            this.setState({ctx: ctx})
        }
    }
    render(){
        const { rgb, binary, positionX, positionY, fixed } = this.state
        return(
            <>
                <span
                    style={{
                        position: 'fixed',
                        top: positionY - 10,
                        left: positionX - 10
                    }}>
                    <img height="20" width="20" src="/position.svg"></img>
                </span>
                <canvas
                    onClick={e=>{
                        this.getColor(e.pageX, e.pageY)
                        this.setState({
                            positionX: e.pageX,
                            positionY: e.pageY
                        })
                    }}
                    ref={c => { this.canvas = c; }}
                />
                <div
                    className="bottom-dashboard mdui-card mdui-p-a-1">
                    <FileRead 
                        fileType="image/*"
                        onFileChange={file=>{
                            this.setState({
                                imgFile:file
                            }, _=>{this.drawImage()})
                        }}
                    />
                    <div className="mdui-btn-group">
                        <button onClick={_=>{
                            this.moveLeft()
                        }} type="button" className="mdui-btn">
                            <i className="mdui-icon material-icons">chevron_left</i>
                        </button>
                        <button onClick={_=>{
                            this.moveUp()
                        }} type="button" className="mdui-btn">
                            <i className="mdui-icon material-icons">arrow_drop_up</i>
                        </button>
                        <button onClick={_=>{
                            this.moveDown()
                        }} type="button" className="mdui-btn">
                            <i className="mdui-icon material-icons">arrow_drop_down</i>
                        </button>
                        <button onClick={_=>{
                            this.moveRight()
                        }} type="button" className="mdui-btn">
                            <i className="mdui-icon material-icons">chevron_right</i>
                        </button>
                    </div>
                    <button 
                        style={{color: `rgb(${rgb})`}}
                        className="mdui-btn mdui-btn-icon"
                        >
                        <i className="mdui-icon material-icons">lens</i>
                    </button>
                    <button data-clipboard-text={`rgba(${rgb})`} className="copy mdui-btn">rgba({rgb})</button>
                    <button data-clipboard-text={binary} className="copy mdui-btn">{binary}</button>
                </div>
            </>
        )
    }
}


export default Ui