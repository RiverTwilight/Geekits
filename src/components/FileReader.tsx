import * as React from 'react';
import { snackbar } from 'mdui'

//读取文件组件
export default class extends React.Component<IProps, IState> {
	realInput: any
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {
			btnText: props.webkitdirectory ? '选择文件夹' : props.title ? props.title : '选择文件'
		}
	}
	readFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return null
		const { maxSize = 99999999, onFileChange } = this.props
		const fileList = e.target.files;
		console.log(e.target.attributes.getNamedItem('webkitdirectory'))

		this.setState({
			btnText: fileList.length < 2 ? fileList[0].name : `${fileList.length}个文件`
		})

		if (e.target.attributes.getNamedItem('webkitdirectory')) {
			onFileChange && onFileChange(null, null, fileList);
			return
		}


		for (var i = 0; i < fileList.length; i++) {
			let file = e.target.files[i];
			if (file.size > maxSize) {
				snackbar({ message: '文件大小不能超过' + maxSize / 1024 / 1024 + 'MB' })
			} else {
				var freader = new FileReader();
				freader.readAsDataURL(file);
				freader.onload = fe => {
					onFileChange && fe.target && onFileChange(fe.target.result, file, fileList)
				}
			}
		}
	}
	handleClick() {
		this.realInput.click();
	}
	render() {
		const { fileType, onFileChange, maxWidth = '120px', ...props } = this.props;
		var icon = 'file_upload';
		if (fileType) {
			let execArr = fileType.match(/^(\S+)\/\S+$/)
			switch (execArr && execArr[1]) {
				case 'image':
					icon = 'image'; break
				case 'video':
					icon = 'videocam'; break
				default:
					icon = 'folder';
			}
		}
		return (
			<>
				<button
					style={{ maxWidth: maxWidth }}
					className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme"
					onClick={this.handleClick.bind(this)}>
					<i className="mdui-icon-left mdui-icon material-icons">{icon}</i>
					{this.state.btnText}
				</button>
				<input
					accept={fileType} type="file"
					style={{ display: 'none' }} ref={r => this.realInput = r}
					onChange={e => this.readFile(e)}
					{...props}
				/>
			</>
		)
	}
}

interface IProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
	/** 按钮宽度 */
	maxWidth?: string,
	maxSize?: number,
	onFileChange?(base64: any, file: File | null, fileList: FileList | null): void,
	fileType?: string,
	webkitdirectory?: boolean,
	title?: string
}

interface IState {
	btnText: string
}
