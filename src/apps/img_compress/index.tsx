import React from 'react'
// @ts-expect-error ts-migrate(2691) FIXME: An import path cannot end with a '.ts' extension. ... Remove this comment to see the full error message
import ImgCompress from './engine.ts'
import { FileInput, RangeInput } from 'mdui-in-react'

type State = any;

export default class extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			file: null,
			type: '.jpg',
			res: null,
			quality: 0.5
		}
	}
	render() {
		const { file, quality, res, type } = this.state;
		return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
				<center>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<FileInput
						readbydrag
						fileType="image/*"
						onFileChange={(data, file) => {
							this.setState({
								file: data,
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
								type: file.type
							})
						}}
						maxWidth="200px"
					/>
{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
				</center>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<RangeInput
					value={quality}
// @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string | ... Remove this comment to see the full error message
					min={0.1} max={1} step={0.1}
					onValueChange={newValue => {
						this.setState({ quality: Number(newValue) })
					}}
					title={`压缩比率${quality * 100}%`}
				/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<button
					onClick={() => {
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'res' implicitly has an 'any' type.
						ImgCompress(file, quality, (res) => {
							this.setState({ res: res })
						}, type)
					}}
					disabled={file === null}
					className="mdui-fab mdui-color-theme mdui-fab-fixed">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<i className="mdui-icon material-icons">check</i>
				</button>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<img src={res} className="mdui-img-fluid" />
			</>
		)
	}
}
