import React from 'react'
import mdui from 'mdui'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import marked from 'marked'

import TextInput from '../../utils/mdui-in-react/TextInput'
import MdEditor from '../../utils/MdEditor'

//Markdown预览
const MarkDown = props => {
	return(
		<p 
			dangerouslySetInnerHTML={{__html : marked(props.md)}}
			className="mdui-typo">
		</p>
	)
}

const Search = props => {
	const { local, kwd} = props;
	var result = []
	local.map((a,i)=>{
		if(a.name.indexOf(kwd) !== -1){
			result.push(i)
		}else{
			if(a.content.indexOf(kwd) !== -1)result.push(i);
		}		
	})
	return result
}

class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			statu:'edit',
			ifUpdateIdIs:0,
			test:'',
			title:'',
			content:'',
			local:JSON.parse(localStorage.getItem('note')) || []
		}		
	}
	componentDidMount(){
		//检查是否为修改便签
		const { location } = this.props
		if(location.search){
			const index  = /\?id\=(\d+)/.exec(location.search)[1];
			this.setState({
				content:this.state.local[index].content,
				statu:'update',
				noteId:index
			})
		}
	}
	render(){
		const { noteId, title, local, content, statu} = this.state;
		return(
			<React.Fragment>
				<TextInput
					onTextChange={newText=>{
						this.setState({
							title:newText
						})
						var newNote = {
							title:newText,
							content:content,
							tags:'a b c',
							date:Date.toLocaleString()
						}
						updateNote(local, noteId, newNote)
					}}
					header="标题（可选）"
					value={title}
				/>
				<div className="mdui-tab" mdui-tab="true">
	                <a href="#input" className="mdui-ripple">编辑</a>
	                <a ref="preview" href="#preview" className="mdui-ripple">预览</a>
                </div>
	            <div id="input">
		            <MdEditor
			            live={true}
			            content={content}
			            cb={newText=>{
			            	this.setState({content:newText});
			            	var today = new Date;
							var newNote = {
								title:title,
								content:newText,
								tags:'a b c',
								date:today.toLocaleString()
							}
							updateNote(local, noteId, newNote)
			            }}
			        />
	            </div>
	            <div id="preview">
		            <MarkDown md={content} />
	            </div>				
				<Link ref="back" to="/apps/note"></Link>			
			</React.Fragment>
		)
	}
}

const updateNote = (local, i, newNote, cb) =>{
	local.splice(i,1,newNote);
	localStorage.setItem('note', JSON.stringify(local));
	cb &&　cb(local)
}

const addNote = (local, newNote, cb) =>{
	local.push(newNote);
	localStorage.setItem('note', JSON.stringify(local));
	cb &&　cb(local)
}

const deleteNote = (local, i, cb) =>{
	local.splice(i,1);
	localStorage.setItem('note', JSON.stringify(local));
	cb &&　cb(local)
}

const NotesList = props => {
	var list = props.local.map((a,i)=>{
		let title = (a.title)?<div className="mdui-list-item-title mdui-list-item-one-line">{a.title}</div>
		:
		null;
		let button = (props.editHome)?
            <button onClick={()=>deleteNote(props.local,i)} className="mdui-btn mdui-btn-icon">
                <i className="mdui-icon material-icons mdui-text-color-red">delete</i>
            </button>
            :
            null
		return(
			<React.Fragment>
			<Link key={i} to={(props.editHome)?"#":"/apps/note/edit?id=" + i + "#preview"} className="mdui-list-item mdui-ripple">
			    <div className="mdui-list-item-content">
			        {title}			      
			        <div className="mdui-list-item-text mdui-list-item-two-line">
			        {a.content}
			        </div>
			        <div className="mdui-list-item-text mdui-list-item-one-line">
			        {a.date}
			        </div>
			    </div>
			    {button}
			</Link>
			<li class="mdui-divider"></li>
			</React.Fragment>
		)
	})
	return <ul className="mdui-list">{list}</ul>
}

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			local:JSON.parse(localStorage.getItem('note')) || [],
			editStatu:false,
			editHome:false,
			view:'list'
		}		
	}
	render(){
		const {local, editStatu, editHome, view} = this.state;
		const msg = (local === [])?<p className="mdui-text-center">点击右下角添加便签</p>:null
		return(
			<React.Fragment>
                <button 
                    onClick={()=>{
                        this.setState({editHome:!editHome})
                    }}
                    className="mdui-float-right mdui-btn mdui-btn-icon">
                    <i className="mdui-icon material-icons">{(editHome)?'check':'delete_sweep'}</i>
                </button>
                <div className="mdui-clearfix"></div>
				<NotesList
					editStatu={editStatu}
					local={local}
					editHome={editHome}
				/>
				<Link to={`/apps/note/edit?id=${local.length}`}>
					<button
						onClick={()=>{
							addNote(local,{
								content:""
							})
						}}
						className="mdui-color-theme mdui-fab mdui-fab-fixed">
						<i className="mdui-icon material-icons">&#xe145;</i>
					</button>
				</Link>
			</React.Fragment>
		)			
	}
}

const Ui = () => {
	return(
        <Router>          
            <Switch>
                <Route exact path="/apps/note" component={Home}></Route>
                <Route exact path="/apps/note/edit" component={Edit}></Route>               
            </Switch>
        </Router>
    )
}

export default ()=><Ui />