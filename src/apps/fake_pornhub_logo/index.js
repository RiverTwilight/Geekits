import React from 'react';
import mdui from 'mdui';
import html2canvas from 'html2canvas';

import saveFile from '../../utils/fileSaver'

const IfBr = ({statu}) =>{
    if(statu === 'vertical')return <br></br>
    return null
}

const FakeLogo = React.forwardRef(({hStyle, frontStyle, lastStyle},ref) => {
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
                fontSize: hStyle.size + 'em'
            }} className="mdui-text-center">

                <span style={{
                    borderRadius:'4px',
                    color:frontStyle.color,
                    backgroundColor:frontStyle.backgroundColor,
                }} onInput={e=>{
                    /*props.onTextChange({
                        front:{
                            text:e.target.innerText,
                            backgroundColor:props.frontStyle.backgroundColor
                        }
                    })*/
                }} contentEditable={true}>Ygkt</span>
                <IfBr statu={hStyle.array}/>
                <span style={{
                    display:'inline',
                    backgroundColor:lastStyle.backgroundColor,
                    borderRadius:'4px',
                    color:lastStyle.color,
                    padding:'0px 4px 0px 4px',
                    marginLeft:'3px'
                }}
                ref={ref} contentEditable={true}>ool</span>
            </h1>
        </div>
    );
    return logo
})

//字体大小
const FontSize = ({onTextChange, hStyle}) =>{
    return(
        <div className="mdui-textfield">
            <label className="mdui-textfield-label">字体大小</label>
            <label className="mdui-slider">
                <input 
                onChange={e=>{
                    onTextChange({
                        hStyle:{
                            size:e.target.value,
                            array:hStyle.array
                        }
                    })
                }}
                value={hStyle.size} type="range" step="1" min="1" max="10"/>
            </label>
        </div>
    )
}

//颜色翻转
const ColorTurn = ({onStatuChange}) =>{
    return(
        <label className="mdui-checkbox">
            <input onChange={e=>{
                onStatuChange(e.target.checked)
            }} type="checkbox"/>
            <i className="mdui-checkbox-icon"></i>
            颜色翻转
        </label>
    )
}

//竖直排列
const ArrayTurn = ({onStatuChange}) =>{
    return(
        <label className="mdui-checkbox">
            <input onChange={e=>{onStatuChange(e.target.checked)}} type="checkbox"/>
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
        const { hStyle, front, last} = this.state;
        return (
        <React.Fragment>
            <FakeLogo           
                hStyle={hStyle}
                frontStyle={front}
                lastStyle={last}
                ref={this.inputRef}//没卵用
            />
            <FontSize
                hStyle={hStyle}
                onTextChange={newStyle=>{
                    this.setState(newStyle)
                }}
            />
            <ArrayTurn                      
                onStatuChange={statu=>{
                    if(statu){
                        this.setState({
                            hStyle:{
                                size:hStyle.size,
                                array:'vertical'
                            }
                        })
                    }else{
                        this.setState({
                            hStyle:{
                                size:hStyle.size,
                                array:'transverse'
                            }
                        })
                    }
                }}
            />
            <br></br>
            <ColorTurn              
                onStatuChange={statu=>{
                    if(statu){
                        this.setState({
                            front:{
                                color:'#000000',
                                backgroundColor:last.backgroundColor
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
                                backgroundColor:front.backgroundColor
                            }
                        })
                    }
                }}
            />

            <button onClick={()=>{
                html2canvas(document.querySelector("#blackborad")).then(canvas => {
                    var base64 = canvas.toDataURL("image/png");
                    saveFile({
                        file: base64,
                        filename: "ygktool-fake_pornhub_logo.jpg"
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