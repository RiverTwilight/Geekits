import React from 'react'
import mdui from 'mdui'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'

import Color from '../../utils/mdui-in-react/ColorInput'
import RangeInput from '../../utils/mdui-in-react/RangeInput'
import TextInput from '../../utils/mdui-in-react/TextInput'
import FileRead from '../../utils/fileread'

function dataURLtoFile(dataurl, filename) {
    //将base64转换为文件
    var arr = dataurl.split(',')
      , mime = arr[0].match(/:(.*?);/)[1]
      , bstr = atob(arr[1])
      , n = bstr.length
      , u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr],filename,{
        type: mime
    })
}

//预览图片
const Preview = props => {
    const element = <img alt="选择一张图片" height="100%"width='100%' src={props.src||'/emo_assests/ (10).jpg'} />;
    return element
}

//文字样式
const StyleSet = (props) => {
    return(
        <div className="mdui-row-xs-2">
            <div className="mdui-col">
                <Color
                    text="文本颜色"
                    color={props.color}
                    onColorChange={newColor=>{
                        props.handle({color:newColor})
                    }}
                />
            </div>
            <div className="mdui-col">
                <select 
                    value={props.style}
                    onChange={e=>{
                        props.handle({style:e.target.value})
                    }}
                    className="mdui-select" mdui-select="true">
                    <option value="normal">正常字体风格</option>
                    <option value="bold">加粗字体风格</option>
                    <option value="italic">倾斜字体风格</option>           

                </select>
            </div>            
        </div>
    )
}

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src:null,
            drag:{//开始拖拽时手指的位置
              startX:0,
              startY:0
            },
            startPosition:{//开始拖拽时文字的位置
              x:-30,
              y:210
            },
            size:20,
            x_axis:40,
            y_axis:210,
            color:'#000000',
            text:'输入文字',
            width:490,
            height:410,
            style:'normal'
        }
    }
    assestsList(){
        var el = [];
        for (let i = 1; i <= 266; i++) {
            let name = `${i}.jpg`;
            el.push(
                 <div className="mdui-col">
                   <div className="mdui-grid-tile">
                   <img onClick={e=>{
                      this.setState({src:e.target.src});
                   }} width='200' height='160' key={i} data-original={"assests/"+name}/>
                   </div>
                </div>)
        }
        el.push(
            <button mdui-tooltip="{content: '关闭'}" onClick={()=>{
            }} className="mdui-color-theme mdui-fab mdui-fab-fixed">
                <i className="mdui-icon material-icons">close</i>
            </button>
        )
        return el
    }
    render() {
        const { drag, startPosition, color, style, size, text, x_axis, y_axis } = this.state
    return(
        <React.Fragment>
            <center>  
            <div 
            id="capture" 
            style={{
                height:'250px',width:'250px'//border:'1px solid #888888'
            }}>           
            <span 
                onTouchMove={e=>{
                    var ev = e || window.event;
                    var touch = ev.targetTouches[0];
                    var distance = {
                      x:touch.clientX - drag.startX,
                      y:touch.clientY - drag.startY
                    }
                    //console.log(distance)       
                    this.setState({
                        x_axis: startPosition.x + distance.x,
                        y_axis: startPosition.y + distance.y
                    })
                }}
                onTouchStart={e=>{
                    var ev = e || window.event;
                    var touch = ev.targetTouches[0];
                    //保存开始时位置
                    this.setState({
                      drag: {
                        startX: touch.clientX,
                        startY: touch.clientY
                      },
                      startPosition:{
                        x:x_axis,
                        y:y_axis
                      }
                    })
                }}
                draggable={true}
                onDragStart={e=>{
                    this.setState({
                      drag: {
                        startX: e.pageX,
                        startY: e.pageY
                      },
                      startPosition:{
                        x:x_axis,
                        y:y_axis
                      }
                    })
                }}                  
                onDrag={e=>{
                    var distance = {
                      x:e.pageX - drag.startX,
                      y:e.pageY - drag.startY
                    }
                    //console.log(distance)
                    if (e.pageY > 0||e.pageX > 0) {
                      this.setState({
                        x_axis: startPosition.x + distance.x,
                        y_axis: startPosition.y + distance.y
                      })
                    }
                }}
                style={{
                    //display:(this.state.src === null)?'none':'block',
                    position:'absolute',
                    color:color,
                    fontSize:size + "px",
                    fontStyle:(style === 'italic')?style:'normal',
                    fontWeight:style,
                    marginLeft:x_axis,
                    marginTop:y_axis-this.state.size,
                    cursor:'move'
                }} id="drag">
                {text}
            </span>
            <Preview src={this.state.src} />    
            </div>    
            </center> 
            <br></br>
            <div className="mdui-row-xs-3">
                <div className="mdui-col">
                    <FileRead 
                        maxWidth
                        fileType="image/*"
                        multiple={false}
                        onFileChange={file=>{
                            this.setState({src:file})
                        }}
                    />
                </div>
                <div className="mdui-col">
                    <button 
                    onClick={()=>{  
                        mdui.snackbar({message:'该功能开发者正在一拖再拖~'})             
                    }} 
                    className="mdui-btn">
                    <i class="mdui-icon-left mdui-icon material-icons">stars</i>
                    新增贴纸
                    </button>
                </div>
                <div className="mdui-col">
                    <button 
                    onClick={()=>{  
                        var index = parseInt(Math.random() * (266 - 0 + 1) + 0, 10); //随机选取0到最大值之间的整数
                        this.setState({src:`/emo_assests/ (${index}).jpg`})         
                    }}
                    className="mdui-btn">
                    <i class="mdui-icon-left mdui-icon material-icons">cached</i>
                    换个素材
                    </button>
                </div>
            </div>                  
            <RangeInput 
                default={size}
                min="5" max="100"
                onValueChange={newValue=>{
                    this.setState({size:newValue})

                }}
                title={"文字大小" + size + "px"}
            />
            <TextInput
                onTextChange={newText=>{
                    this.setState({text:newText})
                }}
                header="输入文本"
                value={text}
            /> 
            <StyleSet 
                color={color}
                style={style}
                handle={e=>{
                    this.setState(e)
                }}
            />   
            <button 
                onClick={()=>{
                    html2canvas(document.querySelector("#capture")).then(canvas => {
                       var base64 = canvas.toDataURL("image/png");
                       saveAs(dataURLtoFile(base64,"ygktool-emoticon.jpg"), "ygktool-emoticon.jpg", {
                        type: "image/jpg"
                       })
                   })       
                }}
                mdui-tooltip="{content: '生成表情'}"
                className="mdui-color-theme mdui-fab mdui-fab-fixed">
                <i className="mdui-icon material-icons">&#xe5ca;</i>
            </button>
        </React.Fragment>
    )
  }
}

export default ()=><Ui />;