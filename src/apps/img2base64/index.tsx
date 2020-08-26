import React from 'react'
import ClipboardJS from 'clipboard'
import { snackbar } from 'mdui'
import { FileInput } from 'mdui-in-react'

type State = any;

class Ui extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			file: null
		}
	}
	componentDidMount() {
// @ts-expect-error ts-migrate(2454) FIXME: Variable 'clipboard' is used before being assigned... Remove this comment to see the full error message
		clipboard && clipboard.destroy();
		var clipboard = new ClipboardJS('#copy');
		clipboard.on('success', e => {
			snackbar({ message: '已复制' })
			e.clearSelection()
		})
		clipboard.on('error', e => {
			snackbar({ message: '文本太长无法复制' })
			e.clearSelection()
		})
	}
	render() {
		const { file } = this.state;
		return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
				<center>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<FileInput
// @ts-expect-error ts-migrate(2769) FIXME: Property 'readByDrag' does not exist on type 'Intr... Remove this comment to see the full error message
						readByDrag
						fileType="image/*"
						onFileChange={file => {
							this.setState({ file: file })
						}}
					/>
{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
				</center>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div
// @ts-expect-error ts-migrate(2322) FIXME: Property 'disabled' does not exist on type 'Detail... Remove this comment to see the full error message
					disabled={true}
					style={{ display: (file === null) ? 'none' : 'block' }}
					data-clipboard-text={file} className="mdui-textfield">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<textarea rows="4" value={file} className="mdui-textfield-input" type="text"></textarea>
				</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<button
					id="copy"
					style={{ display: (!file) ? 'none' : 'block' }}
					className="mdui-float-right mdui-btn mdui-btn-icon">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<i className="mdui-icon material-icons">&#xe14d;</i>
				</button>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div className="mdui-clearfix"></div>
			</>
		)
	}
}

export default Ui
