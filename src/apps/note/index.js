import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom"
import marked from 'marked'
import Input from '../../utils/Component/Input.tsx'
import MdEditor from '../../utils/MdEditor'

//Markdown预览
const MarkDown = props => {
	return (
		<p
			dangerouslySetInnerHTML={{ __html: marked(props.md) }}
			className="mdui-typo">
		</p>
	)
}

const Search = props => {
	const { local, kwd } = props;
	var result = []
	local.map((a, i) => {
		if (a.name.indexOf(kwd) !== -1) {
			result.push(i)
		} else {
			if (a.content.indexOf(kwd) !== -1) result.push(i);
		}
	})
	return result
}

class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			statu: 'edit',
			ifUpdateIdIs: 0,
			test: '',
			title: '',
			content: '',
			local: JSON.parse(localStorage.getItem('note')) || []
		}
	}
	componentDidMount() {
		//检查是否为修改便签
		const { location } = this.props
		if (location.search) {
			const index = /\?id\=(\d+)/.exec(location.search)[1];
			this.setState({
				content: this.state.local[index].content,
				statu: 'update',
				noteId: index
			})
		}
	}
	render() {
		const { noteId, title, local, content, statu } = this.state;
		return (
			<>
				<Input
					onValueChange={newText => {
						this.setState({
							title: newText
						})
						var newNote = {
							title: newText,
							content: content,
							tags: 'a b c',
							date: Date.toLocaleString()
						}
						content !== '' && updateNote(local, noteId, newNote)
					}}
					placeholder="标题（可选）"
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
						cb={newText => {
							this.setState({ content: newText });
							var today = new Date;
							var newNote = {
								title: title,
								content: newText,
								tags: 'a b c',
								date: today.toLocaleString()
							}
							updateNote(local, noteId, newNote)
						}}
					/>
				</div>
				<div id="preview">
					<MarkDown md={content} />
				</div>
				<Link ref="back" to="/app/note"></Link>
			</>
		)
	}
}

const updateNote = (local, i, newNote, cb) => {
	local.splice(i, 1, newNote);
	localStorage.setItem('note', JSON.stringify(local));
	cb && cb(local)
}

const addNote = (local, newNote, cb) => {
	local.push(newNote);
	localStorage.setItem('note', JSON.stringify(local));
	cb && cb(local)
}

const deleteNote = (local, i, cb) => {
	local.splice(i, 1);
	localStorage.setItem('note', JSON.stringify(local));
	cb && cb(local)
}

/**
 * 便签列表
 * @param {local} 便签列表
 * @param editHome 是否处于编辑模式
 */
const NotesList = ({ local, editHome }) => {
	var list = local.map((a, i) => {
		if (a.content === '') {
			deleteNote(local, i)
			return null
		}
		return (
			<React.Fragment key={i}>
				<Link to={editHome ? "#" : "/app/note/edit?id=" + i + "#preview"} className="mdui-list-item mdui-ripple">
					<div className="mdui-list-item-content">
						{a.title &&
							<div className="mdui-list-item-title mdui-list-item-one-line">{a.title}</div>}
						<div className="mdui-list-item-text mdui-list-item-two-line">
							{a.content}
						</div>
						<div className="mdui-list-item-text mdui-list-item-one-line">
							{a.date}
						</div>
					</div>
					{editHome &&
						<button onClick={() => deleteNote(local, i)} className="mdui-btn mdui-btn-icon">
							<i className="mdui-icon material-icons mdui-text-color-red">delete</i>
						</button>}
				</Link>
				<li className="mdui-divider"></li>
			</React.Fragment>
		)
	})
	return <ul className="mdui-list">{list}</ul>
}

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			local: JSON.parse(localStorage.getItem('note')) || [],
			editStatu: false,
			editHome: false,
			view: 'list'
		}
	}
	render() {
		const { local, editStatu, editHome } = this.state;
		return (
			<>
				{!local.length && <p className="mdui-text-center">点击右下角+号添加便签</p>}
				<button
					style={{ display: local.length ? "block" : "none" }}
					onClick={() => {
						this.setState({ editHome: !editHome })
					}}
					className="mdui-float-right mdui-btn mdui-btn-icon">
					<i className="mdui-icon material-icons">{(editHome) ? 'check' : 'delete_sweep'}</i>
				</button>
				<div className="mdui-clearfix"></div>
				<NotesList
					editStatu={editStatu}
					local={local}
					editHome={editHome}
				/>
				<Link to={`/app/note/edit?id=${local.length}`}>
					<button
						onClick={() => {
							addNote(local, {
								content: ""
							})
						}}
						className="mdui-color-theme mdui-fab mdui-fab-fixed">
						<i className="mdui-icon material-icons">&#xe145;</i>
					</button>
				</Link>
			</>
		)
	}
}

export default () => (
	<Router>
		<Switch>
			<Route exact path="/app/note" component={Home}></Route>
			<Route exact path="/app/note/edit" component={Edit}></Route>
		</Switch>
	</Router>
)

