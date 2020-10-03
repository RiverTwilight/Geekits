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

			<>
{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
				<center>

					<FileInput
						readbydrag
						fileType="image/*"
						onFileUpload={(data, file) => {
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

				<RangeInput
					value={quality}
// @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string | ... Remove this comment to see the full error message
					min={0.1} max={1} step={0.1}
					onValueChange={newValue => {
						this.setState({ quality: Number(newValue) })
					}}
					title={`压缩比率${quality * 100}%`}
				/>

				<button
					onClick={() => {
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'res' implicitly has an 'any' type.
						ImgCompress(file, quality, (res) => {
							this.setState({ res: res })
						}, type)
					}}
					disabled={file === null}
					className="mdui-fab mdui-color-theme mdui-fab-fixed">

					<i className="mdui-icon material-icons">check</i>
				</button>

				<img src={res} className="mdui-img-fluid" />
			</>
		)
	}
}
