import React from 'react'
import WordCloud from 'wordcloud'
import saveFile from '../../utils/fileSaver'

import {
    ListControlCheck,
    Input
} from 'mdui-in-react'

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
            sizes:"",
            edit:false,
            update:{
                open:false,
                i:0
            }
        }
    }
    render(){
        const { text, sizes, edit, update } = this.state;
        const { add, onUpdate, onDelete, words } = this.props;
        var applist = words.map((icon,i)=>{                       
            let button = (edit)?
                <button onClick={()=>onDelete(i)} className="mdui-btn mdui-btn-icon">
                    <i className="mdui-icon material-icons mdui-text-color-red">delete</i>
                </button>
                :
                null
            return(
                <li 
                    key={i}
                    mdui-dialog={edit?null:"{target:'#icon',history:false}"}
                    className="mdui-list-item mdui-ripple"
                    onClick={()=>{
                        update.open = true;
                        update.i = i;
                        this.setState({
                            text: icon[0],
                            sizes: icon[1],
                            edit: edit,
                            update:update
                        })
                    }}>
                    <i className="mdui-list-item-icon mdui-icon material-icons">font_download</i>
                    <div className="mdui-list-item-content">
                        <div className="mdui-list-item-title mdui-list-item-one-line">{icon[0]}</div>
                        <div className="mdui-list-item-text mdui-list-item-one-line">{(icon[1]==="")?"随机":icon[1]}</div>
                    </div>
                    {button}
                </li>
            )
        })
        return(
            <>
                <li className="mdui-subheader">
                    文字&nbsp;&nbsp;
                    <span mdui-dialog="{target:'#icon',history:false}" className="mdui-text-color-theme">添加</span>
                    &nbsp;&nbsp;
                    <span
                        onClick={()=>{
                            this.setState({edit:!edit})
                        }}
                        className="mdui-text-color-theme">
                        {(!edit)?'编辑':'确定'}
                    </span>             
                </li>
                {applist}               
                <div style={{display:'inline-block'}} className="mdui-dialog" id="icon">
                    <div className="mdui-dialog-content">
                        <Input
                            onValueChange={newText=>{
                                this.setState({text:newText})
                            }}
                            header="文字"
                            placeholder=" "
                            value={text}
                        />
                        <Input
                            onValueChange={newText=>{
                                this.setState({sizes:newText})
                            }}
                            header="大小,留空为随机"
                            placeholder=" "
                            type="number"
                            value={sizes}
                        />
                    </div>
                    <div className="mdui-dialog-actions">
                        <button                            
                            className="mdui-btn mdui-ripple" mdui-dialog-close="true">
                            取消
                        </button>
                        <button 
                            className="mdui-btn mdui-ripple" mdui-dialog-close="true"
                            onClick={()=>{
                                if (update.open) {
                                    onUpdate(update.i,[ text, sizes ])
                                    update.open = false
                                    this.setState({update:update})
                                } else {
                                    add([ text, sizes ])
                                }
                            }}  
                            >
                                保存
                        </button>
                    </div>
                </div>
            </>
        )
    }   
}

const RandomNum = () => {
    var num = parseInt(Math.random() * (100 - 0 + 1) + 0, 10); //随机选取0到100之间的整数
    return num
}

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words:[
                ['云极客工具',20],
                ['乱世论',20],
                ['御坂美琴',20],
                ['自由',''],
            ],
            NoRotate:false,
            transportBg: true
        }
        this.create = this.create.bind(this)
    }
    componentDidMount(){
        this.create()
    }
    create(){
        const { words, NoRotate, transportBg } = this.state       
        var list = words.map((word)=>(
            [word[0],(word[1] === "")?RandomNum():word[1]]
        ))
        WordCloud(this.canvas, {
            list:list,
            minRotation:(NoRotate)?0:RandomNum(),
            maxRotation:(NoRotate)?0:RandomNum(),
            backgroundColor:(transportBg?'#fff0':'#ffffff')
        })
    }
    render(){
        const{ words, NoRotate, transportBg } = this.state
        return(
            <>  
                <canvas
                    onClick={()=>{
                        saveFile({
                            file: this.canvas.toDataURL('jpg'),
                            filename: "ygktool-word_cloud.jpg"
                        })
                    }}
                    style={{width:'100%',border:'2px solid #888888'}}
                    ref={c => { this.canvas = c; }}
                />
                <span className="mdui-typo-caption-opacity mdui-text-center">点击图片即可保存</span>
                <div className="mdui-tab" mdui-tab="true">
                    <a href="#text" className="mdui-ripple">文字</a>
                    <a href="#option" className="mdui-ripple">高级</a>
                </div>
                <div id="text">
                    <ul className="mdui-list">
                        <Words 
                            words={words}
                            add={newIcon=>{
                                words.push(newIcon);
                                this.setState({
                                    words:words
                                })
                            }}
                            onDelete={i=>{
                                words.splice(i,1);
                                this.setState({
                                    words:words
                                })
                            }}
                            onUpdate={(i,info)=>{
                                words.splice(i,1,info);
                                this.setState({
                                    words:words
                                })
                            }}
                        />   
                    </ul>  
                </div>
                <div id="option">
                    <ListControlCheck
                        icon="keyboard_return"
                        title="禁止倾斜"
                        checked={NoRotate}
                        onCheckedChange={checked=>{
                            this.setState({NoRotate:checked})
                        }}
                    />  
                    <ListControlCheck
                        icon="crop_landscape"
                        title="透明背景"
                        checked={transportBg}
                        onCheckedChange={checked=>{
                            this.setState({transportBg:checked})
                        }}
                    />      
                </div>   
                <button 
                    onClick={this.create} 
                    className="mdui-ripple mdui-fab mdui-color-theme-accent mdui-fab-fixed">
                    <i className="mdui-icon material-icons">&#xe5ca;</i>
                </button>
            </>
        )
    }
}

export default Ui