import React from 'react'
import ImgCompress from './engine.ts'
import { FileInput, RangeInput } from 'mdui-in-react'

export default class extends React.Component {
	constructor(props) {
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
				<center>
					<FileInput
						readbydrag
						fileType="image/*"
						onFileChange={(data, file) => {
							this.setState({
								file: data,
								type: file.type
							})
						}}
						maxWidth="200px"
					/>
				</center>
				<RangeInput
					value={quality}
					min={0.1} max={1} step={0.1}
					onValueChange={newValue => {
						this.setState({ quality: Number(newValue) })
					}}
					title={`压缩比率${quality * 100}%`}
				/>
				<button
					onClick={() => {
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
