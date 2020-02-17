import React from 'react'

/**
  *Markdown编辑器 2020-2-12 江村暮
  */


const text2md = (str, style, start, end)=>{
	//截取选中字符串
	var arr = str.split("");
	var selectedLength = end - start;
	var selectedStr = arr.splice(start, selectedLength).join("")
	console.log(style);
	switch(style){
		case'h1':
			var md = "# " + selectedStr;
			break
		case'h2':
			var md = "## " + selectedStr;
			break
		case'h3':
			var md = "### " + selectedStr;	
			break	
		case'bold':
			var md = "**" + selectedStr +　"**"		
			break	
		case'code':
			var md = "`" + selectedStr +　"`"		
			break
		case'italic':
			var md = "_" + selectedStr +　"_"		
			break
		case'clear':
			var md = `~~${selectedStr}~~`	
			break
		case'underline':
			var md = `<u>${selectedStr}</u>`	
			break
		case'link':
			var md = `[${selectedStr}](https://)`	
			break 
		case'enter':
			var md = `  <br>`	
			break
		case'list':
			var md = `* ${selectedStr}`	
			break	
		case'image':
			var md = `![alt 属性文本](图片地址)`	
			break			    
		default:
		    var md = "88888"
	}
	arr.splice(start, 0, md)
	return arr.join("")
}

class EditTools extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMore:false
		}
	}
	render(){
		const { showMore } = this.state
		const apps = [{
		icon: "title",
		style: "h1",
		name:"大标题"
		}, {
			icon: "format_size",
			style: "h2",
			name:"中标题"
		}, {
			icon: "format_size",
			style: "h3",
			name:"小标题"
		}, {
			icon: "code",
			style: "code",
			name:"代码块"
		}, {
			icon: "format_bold",
			style: "bold",
			name:"粗体"
		}, {
			icon: "format_italic",
			style: "italic",
			name:"斜体"
		}, {
			icon: "format_strikethrough",
			style: "clear",
			name:"中划线"
		}, {
			icon: "format_underlined",
			style: "underline",
			name:"下划线"
		}, {
			icon: "link",
			style: "link",
			name:"链接"
		}, {
			icon: "image",
			style: "image",
			name:"图片"
		}, {
			icon: "keyboard_return",
			style: "enter",
			name:"换行"
		}, {
			icon: "format_list_bulleted",
			style: "list",
			name:"列表"
		}]
		const btnGroup = apps.map((a,i)=>{
			return(
				<button 
					mdui-tooltip={`{content: '${a.name}'}`}
					onClick={()=>{
						const textarea  = this.props.textarea
						var start = textarea.selectionStart
						  , end = textarea.selectionEnd;
					    console.log(start,end,this.props.content)
						this.props.cb(text2md(this.props.content, a.style, start, end))
					}}
					style={{display:(showMore)?'block':((i>=5)?'none':'block')}}
					type="button" className="mdui-btn">
				    <i className="mdui-icon material-icons">{a.icon}</i>
				</button>
			)
		})
		return(
			<div className="mdui-btn-group">
			{btnGroup}
			<button 
				mdui-tooltip={`{content: '${(showMore)?'收起':'显示更多'}'}`}
				onClick={()=>{
					this.setState({showMore:!showMore})
				}}
				type="button" className="mdui-btn">
			    <i className="mdui-text-color-theme mdui-icon material-icons">
			    {(showMore)?'keyboard_arrow_left':'more_horiz'}
			    </i>
			</button>
			</div>
		)
	}
}	

class MdEditor extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		const { content, cb } = this.props			
		return(
			<React.Fragment>
				<EditTools 
		            content={content}
		            textarea={this.refs.textarea}
		            cb={newSet=>{
		            	cb(newSet)
		            }}
		        />
		        <div className="mdui-divider"></div>
			    <div 
				    className="mdui-textfield">
		            <textarea
			            style={{cursor:'text'}}
			            ref="textarea"
		                placeholder='内容，支持markdown' 
		                rows="40"
		                onChange={e=>{
		                   cb(e.target.value)
		                }} 
		                value={content}
		                autoFocus type='text' className="mdui-textfield-input">
		            </textarea>
		        </div>
	        </React.Fragment>
		)
	}
}

export default MdEditor