import React from 'react';
import mdui from 'mdui';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

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
    });
}

const IfBr = props =>{
    if(props.statu == 'vertical')return <br></br>
    return null
}

const FakeLogo = React.forwardRef((props,ref) => {
    var logo = (
        <div style={{
            paddingTop: '50px',
            borderRadius: '4px',
            backgroundColor:'#000000',
            width:'90%',
            height: '200px',
            textAlign: 'center'
        }} id="blackborad">
            <h1 style={{
                marginTop:'20px',
                fontFamily: 'SimHei',
                fontWeight: '1000',
                letterSpacing: '-1.5px',
                fontSize: props.hStyle.size + 'em'
            }} className="mdui-text-center">

                <span style={{
                    borderRadius:'4px',
                    color:props.frontStyle.color,
                    backgroundColor:props.frontStyle.backgroundColor,
                }} onInput={e=>{
                    /*props.onTextChange({
                        front:{
                            text:e.target.innerText,
                            backgroundColor:props.frontStyle.backgroundColor
                        }
                    })*/
                }} contentEditable={true}>Ygkt</span>
                <IfBr statu={props.hStyle.array}/>
                <span style={{
                    display:'inline',
                    backgroundColor:props.lastStyle.backgroundColor,
                    borderRadius:'4px',
                    color:props.lastStyle.color,
                    padding:'0px 4px 0px 4px',
                    marginLeft:'3px'
                }} onInput={e=>{
                    /*props.onTextChange({
                        last:{
                            text:e.target.innerText,
                            backgroundColor:props.lastStyle.backgroundColor,
                        }
                    })*/
                }} ref={ref} contentEditable={true}>ool</span>

            </h1>
        </div>
    );
    return logo
})

//字体大小
const FontSize = props =>{
    return(
        <div className="mdui-textfield">
            <label className="mdui-textfield-label">字体大小</label>
            <label className="mdui-slider">
                <input 
                onChange={e=>{
                    props.onTextChange({
                        hStyle:{
                            size:e.target.value,
                            array:props.hStyle.array
                        }
                    })
                }}
                value={props.hStyle.size} type="range" step="1" min="1" max="10"/>
            </label>
        </div>
    )
}

//颜色翻转
const ColorTurn = props =>{
    return(
        <label className="mdui-checkbox">
          <input onChange={e=>{
            props.onStatuChange(e.target.checked)
          }} type="checkbox"/>
          <i className="mdui-checkbox-icon"></i>
          颜色翻转
        </label>
    )
}

//竖直排列
const ArrayTurn = props =>{
    return(
        <label className="mdui-checkbox">
          <input onChange={e=>{props.onStatuChange(e.target.checked)}} type="checkbox"/>
          <i className="mdui-checkbox-icon"></i>
          竖直排列
        </label>
    )
}

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            hStyle:{
                size:4.0,
                array:'transverse'
            },
            front:{
                color:'#ffffff',
                backgroundColor:'transparent'
            },
            last:{
                color:'#000000',
                backgroundColor:'#f79817'
            }
        }
    }
    render(){
        return (
        <React.Fragment>
            <FakeLogo           
                hStyle={this.state.hStyle}
                frontStyle={this.state.front}
                lastStyle={this.state.last}
                ref={this.inputRef}//没卵用
            />
            <FontSize
                hStyle={this.state.hStyle}
                onTextChange={newStyle=>{
                    this.setState(newStyle)
                }}
            />
            <ArrayTurn                      
                onStatuChange={statu=>{
                    if(statu == true){
                        this.setState({
                            hStyle:{
                                size:this.state.hStyle.size,
                                array:'vertical'
                            }
                        })
                    }else{
                        this.setState({
                            hStyle:{
                                size:this.state.hStyle.size,
                                array:'transverse'
                            }
                        })
                    }
                }}
            />
            <br></br>
            <ColorTurn              
                onStatuChange={statu=>{
                    if(statu == true){
                        this.setState({
                            front:{
                                color:'#000000',
                                backgroundColor:this.state.last.backgroundColor
                            },
                            last:{
                                color:'#ffffff',
                                backgroundColor:'transparent'
                            }
                        })
                    }else{
                        this.setState({
                            front:{
                                color:'#ffffff',
                                backgroundColor:'transparent'
                            },
                            last:{
                                color:'#000000',
                                backgroundColor:this.state.front.backgroundColor
                            }
                        })
                    }
                }}
            />

            <button onClick={()=>{
                html2canvas(document.querySelector("#blackborad")).then(canvas => {
                    var base64 = canvas.toDataURL("image/png");
                    saveAs(dataURLtoFile(base64,"ygktool-fake_pornhub_logo.jpg"), "ygktool-emoticon.jpg", {
                        type: "image/jpg"
                    })
                })              
            }} className="mdui-color-theme mdui-fab mdui-fab-fixed">
                <i className="mdui-icon material-icons">check</i>
            </button>
        </React.Fragment>
        )
    }
}

export default ()=><Ui />;