import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom"
import marked from 'marked'
import { Input } from 'mdui-in-react'
import MdEditor from '../../components/MdEditor'

//Markdown预览
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const MarkDown = props => {
	return (
		<p
			dangerouslySetInnerHTML={{ __html: marked(props.md) }}
			className="mdui-typo">
		</p>
	)
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const Search = props => {
	const { local, kwd } = props;
// @ts-expect-error ts-migrate(7034) FIXME: Variable 'result' implicitly has type 'any[]' in s... Remove this comment to see the full error message
	var result = []
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
	local.map((a, i) => {
		if (a.name.indexOf(kwd) !== -1) {
			result.push(i)
		} else {
			if (a.content.indexOf(kwd) !== -1) result.push(i);
		}
	})
// @ts-expect-error ts-migrate(7005) FIXME: Variable 'result' implicitly has an 'any[]' type.
	return result
}

type EditState = any;

class Edit extends React.Component<{}, EditState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			statu: 'edit',
			ifUpdateIdIs: 0,
			test: '',
			title: '',
			content: '',
// @ts-expect-error ts-migrate(2345) FIXME: Type 'null' is not assignable to type 'string'.
			local: JSON.parse(localStorage.getItem('note')) || []
		}
	}
	componentDidMount() {
		//检查是否为修改便签
// @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Readon... Remove this comment to see the full error message
		const { location } = this.props
		if (location.search) {
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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
				{/**@ts-expect-error */}
				<Link ref="back" to="/app/note"></Link>
			</>
		)
	}
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'local' implicitly has an 'any' type.
const updateNote = (local, i, newNote, cb?) => {
	local.splice(i, 1, newNote);
	localStorage.setItem('note', JSON.stringify(local));
	cb && cb(local)
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'local' implicitly has an 'any' type.
const addNote = (local, newNote, cb) => {
	local.push(newNote);
	localStorage.setItem('note', JSON.stringify(local));
	cb && cb(local)
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'local' implicitly has an 'any' type.
const deleteNote = (local, i, cb?) => {
	local.splice(i, 1);
	localStorage.setItem('note', JSON.stringify(local));
	cb && cb(local)
}

/**
 * 便签列表
 * @param {local} 便签列表
 * @param editHome 是否处于编辑模式
 */
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'local' implicitly has an 'any' ty... Remove this comment to see the full error message
const NotesList = ({ local, editHome }) => {
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
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

type HomeState = any;

class Home extends React.Component<{}, HomeState> {
	constructor(props: {}) {
		super(props);
		this.state = {
// @ts-expect-error ts-migrate(2345) FIXME: Type 'null' is not assignable to type 'string'.
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

				{!local.length && <p className="mdui-text-center mdui-text-color-white">点击右下角+号添加便签</p>}

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
// @ts-expect-error ts-migrate(2322) FIXME: Property 'editStatu' does not exist on type 'Intri... Remove this comment to see the full error message
					editStatu={editStatu}
					local={local}
					editHome={editHome}
				/>

				<Link to={`/app/note/edit?id=${local.length}`}>

					<button
						onClick={() => {
// @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
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

