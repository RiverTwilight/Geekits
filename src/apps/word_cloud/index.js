import React from 'react'
import mdui from 'mdui'
import WordCloud from 'wordcloud'


import {
    ListControlCheck,
    TextInput
} from '../../utils/mdui-in-react/'

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
                <button onClick={()=>this.props.onDelete(i)} className="mdui-btn mdui-btn-icon">
                    <i className="mdui-icon material-icons mdui-text-color-red">delete</i>
                </button>
                :
                null
            return(
                <li 
                    mdui-dialog={(edit)?null:"{target:'#icon',history:false}"}
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
            <React.Fragment>
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
                        <TextInput
                            onTextChange={newText=>{
                                this.setState({text:newText})
                            }}
                            header="文字"
                            value={text}
                        />
                        <TextInput
                            onTextChange={newText=>{
                                this.setState({sizes:newText})
                            }}
                            header="大小,留空为随机"
                            type="number"
                            value={sizes}
                        />
                    </div>
                    <div className="mdui-dialog-actions">
                        <button
                            onClick={()=>{
                                if (update.open) {
                                    onUpdate(update.i,[ text, sizes ])
                                    update.open = false
                                    this.setState({update:update})
                                } else {
                                    add([ text, sizes ])
                                }
                            }}                              
                            className="mdui-btn mdui-ripple"mdui-dialog-close="true">
                            保存
                        </button>
                        <button className="mdui-btn mdui-ripple"mdui-dialog-close="true">取消</button>
                    </div>
                </div>
            </React.Fragment>
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
            NoRotate:false
        }
    }
    render(){
        const { words, NoRotate } = this.state
    	return (
    		<React.Fragment>  
                <canvas
                    style={{width:'100%',border:'2px solid #888888'}}
                    ref="test">
                </canvas>
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
                        text="禁止倾斜"
                        checked={NoRotate}
                        onCheckedChange={checked=>{
                            this.setState({NoRotate:checked})
                        }}
                    />    
                </div>   
            <button 
                onClick={()=>{
                    var list = words.map((word)=>(
                        [word[0],(word[1] === "")?RandomNum():word[1]]
                    ))
                	WordCloud(this.refs.test, {
                        list:list,
                        minRotation:(NoRotate)?0:RandomNum(),
                        maxRotation:(NoRotate)?0:RandomNum()
                    });
                }} 
                className="mdui-ripple mdui-fab mdui-color-theme-accent mdui-fab-fixed">
                <i class="mdui-icon material-icons">&#xe5ca;</i>
            </button>
            </React.Fragment>
    	)
    }
}

export default ()=><Ui />;