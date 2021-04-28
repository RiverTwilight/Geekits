import React from "react";
import ClipboardJS from "clipboard";
import { RangeInput, Button } from "mdui-in-react";
import { snackbar } from "mdui";
import Cursor from "../../svg/position.svg";
import FileInput from "../../components/FileInput";

//调色盘
const ColorLens = ({ onChange, rgb, isHide }: any) => {
	if (isHide) return null;
	const [r, g, b, a] = rgb.replace(/\s/g, "").split(",");
	const SameProps = {
		max: "255",
		min: "0",
		step: "1",
	};
	return (
		<div className="mdui-row-md-2">
			<div className="mdui-col">
				<RangeInput
					{...SameProps}
					title="R"
					value={r}
					onValueChange={(newValue) => {
						onChange(`${newValue}, ${g}, ${b}, ${a}`);
					}}
				/>
			</div>

			<div className="mdui-col">
				<RangeInput
					{...SameProps}
					title="G"
					value={g}
					onValueChange={(newValue) => {
						onChange(`${r}, ${newValue}, ${b}, ${a}`);
					}}
				/>
			</div>

			<div className="mdui-col">
				<RangeInput
					{...SameProps}
					title="B"
					value={b}
					onValueChange={(newValue) => {
						onChange(`${r}, ${g}, ${newValue}, ${a}`);
					}}
				/>
			</div>

			<div className="mdui-col">
				<RangeInput
					{...SameProps}
					value={a}
					title="A"
					onValueChange={(newValue) => {
						onChange(
							`${r}, ${g}, ${b}, ${
								Math.floor((parseFloat(newValue) / 255) * 100) /
								100
							}`
						);
					}}
				/>
			</div>
		</div>
	);
};

type ComponentState = any;

export default class ColorPicker extends React.Component<{}, ComponentState> {
	canvas: any;
	constructor(props: {}) {
		super(props);
		this.state = {
			imgFile: null,
			positionX: 0,
			positionY: 0,
			ctx: null,
			rgb: "255, 255, 255, 0",
			binary: "#ffffff",
			fixed: false,
			marginLeft: 0,
			isHideLens: true,
		};
	}
	moveUp() {
		const { positionY, positionX } = this.state;
		this.setState({ positionY: positionY - 1 }, () => {
			this.getColor(positionX, positionY);
		});
	}
	moveDown() {
		const { positionY, positionX } = this.state;
		this.setState({ positionY: positionY + 1 }, () => {
			this.getColor(positionX, positionY);
		});
	}
	moveLeft() {
		const { positionX, positionY } = this.state;
		this.setState({ positionX: positionX - 1 }, () => {
			this.getColor(positionX, positionY);
		});
	}
	moveRight() {
		const { positionX, positionY } = this.state;
		this.setState({ positionX: positionX + 1 }, () => {
			this.getColor(positionX, positionY);
		});
	}
	componentDidMount() {
		var clipboard = new ClipboardJS(".copy");
		clipboard.on("success", (e) => {
			snackbar({ message: "已复制" });
			e.clearSelection();
		});
		this.setState({
			marginLeft: this.canvas.getBoundingClientRect().left,
			marginTop: this.canvas.getBoundingClientRect().top,
		});
		document.addEventListener("keydown", (e) => {
			// "typescript.validate.enable": false
			// 加入这条可去掉横线
			switch (e.keyCode) {
				case 37:
					e.preventDefault();
					this.moveLeft();
					break;
				case 38:
					e.preventDefault();
					this.moveUp();
					break;
				case 39:
					e.preventDefault();
					this.moveRight();
					break;
				case 40:
					e.preventDefault();
					this.moveDown();
					break;
			}
		});
	}
	getColor(positionX: any, positionY: any) {
		const { ctx } = this.state;
		if (ctx) {
			var pixels = ctx.getImageData(positionX, positionY, 1, 1).data;
			var r = pixels[0];
			var g = pixels[1];
			var b = pixels[2];
			var a = pixels[3] / 255;
			// var grey = 0.3 * r + 0.59 * g + 0.11 * b;//灰度公式
			this.setState({
				rgb: `${r}, ${g}, ${b}, ${a}`,
				binary: "#" + r.toString(16) + g.toString(16) + b.toString(16),
			});
		}
	}
	drawImage() {
		const { imgFile } = this.state;
		const { canvas } = this;
		var ctx = this.canvas.getContext("2d");
		var img = new Image();
		img.src = imgFile;
		img.onload = () => {
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img, 0, 0, img.width, img.height);
			this.setState({ ctx: ctx });
		};
	}
	render() {
		const {
			rgb,
			binary,
			positionX,
			positionY,
			marginLeft,
			marginTop,
			isHideLens,
			imgFile,
		} = this.state;
		return (
			<>
				<span
					style={{
						position: "absolute",
						height: "20px",
						width: "20px",
						top: positionY - 10,
						left: positionX - 10,
					}}
				>
					<Cursor />
				</span>
				<canvas
					style={{
						maxWidth: "100%",
					}}
					onClick={(e) => {
						let zoomLevel: number =
							this.canvas.width / this.canvas.clientWidth;
						let absoluteLeft = (e.pageX - marginLeft) * zoomLevel;
						let absoluteTop = (e.pageY - marginTop) * zoomLevel;
						this.setState({
							positionX: e.pageX,
							positionY: e.pageY,
						});
						this.getColor(absoluteLeft, absoluteTop);
					}}
					ref={(c) => {
						this.canvas = c;
					}}
				/>
				<div
					style={
						imgFile && {
							position: "fixed",
							bottom: "10px",
						}
					}
					className="mdui-card mdui-p-a-1"
				>
					<FileInput
						readbydrag
						fileType="image/*"
						handleFileUpload={(file) => {
							this.setState(
								{
									imgFile: file,
								},
								() => {
									this.drawImage();
								}
							);
						}}
					/>
					<div className="mdui-btn-group">
						<Button
							onClick={this.moveLeft.bind(this)}
							type="button"
							icon="chevron_left"
						/>
						<Button
							onClick={this.moveUp.bind(this)}
							type="button"
							icon="arrow_drop_up"
						/>
						<Button
							onClick={this.moveDown.bind(this)}
							type="button"
							icon="arrow_drop_down"
						/>
						<Button
							onClick={this.moveRight.bind(this)}
							type="button"
							icon="chevron_right"
						/>
					</div>

					{/** connot convert to Component */}
					<button
						style={{ color: `rgb(${rgb})` }}
						className="mdui-btn mdui-btn-icon"
					>
						<i className="mdui-icon material-icons">lens</i>
					</button>
					<button
						data-clipboard-text={`rgba(${rgb})`}
						className="copy mdui-btn"
					>
						rgba({rgb})
					</button>
					<button
						data-clipboard-text={binary}
						className="copy mdui-btn"
					>
						{binary}
					</button>
					<Button
						onClick={() => {
							this.setState({ isHideLens: !isHideLens });
						}}
						icon="color_lens"
					/>
					<ColorLens
						onChange={(newColor: any) => {
							const [r, g, b, ,] = newColor
								.replace(/\s/g, "")
								.split(",")
								.map((a: any) => parseInt(a));
							this.setState({
								rgb: newColor,
								binary:
									"#" +
									r.toString(16) +
									g.toString(16) +
									b.toString(16),
							});
						}}
						isHide={isHideLens}
						rgb={rgb}
						binary={binary}
					/>
				</div>
			</>
		);
	}
}
