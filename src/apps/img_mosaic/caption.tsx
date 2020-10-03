import React from "react";
import { snackbar } from "mdui";
import { FileInput, Button } from "mdui-in-react";
import "./caption.css";

class captionMosaic {
	img: any[];
	constructor() {
		this.img = [];
		// @ts-expect-error ts-migrate(2551) FIXME: Property 'cutedImg' does not exist on type 'captio... Remove this comment to see the full error message
		this.cutedImg = [];
	}
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'base64' implicitly has an 'any' type.
	async loadImg(base64) {
		var img = new Image();
		img.src = base64;
		return img;
	}
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'base64' implicitly has an 'any' type.
	addImg(base64, top, bottom) {
		this.img.push({
			base64,
			top,
			bottom,
		});
	}
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'base64' implicitly has an 'any' type.
	async cutImg(base64, top, bottom) {
		var cutWork = document.createElement("canvas"),
			workCtx = cutWork.getContext("2d"),
			ele = await this.loadImg(base64);

		top *= ele.height;
		bottom *= ele.height;

		cutWork.height = ele.height - top - bottom;
		cutWork.width = ele.width;

		console.log(`
			the image is ${ele.width} x ${ele.height},
			cut starts at (0,${top}),
			cut height is ${ele.height - top - bottom}
		`);

		// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
		workCtx.drawImage(
			ele,
			0,
			top,
			ele.width,
			ele.height - top - bottom,
			0,
			0,
			ele.width,
			ele.height - top - bottom
		);

		var res = cutWork.toDataURL();
		console.log(res);
		return res;
	}
	async imgMosaic_Y() {
		for (var i = 0; i <= this.img.length - 1; i++) {
			let { top, bottom, base64 } = this.img[i];
			// @ts-expect-error ts-migrate(2551) FIXME: Property 'cutedImg' does not exist on type 'captio... Remove this comment to see the full error message
			this.cutedImg.push(await this.cutImg(base64, top, bottom));
		}
		// @ts-expect-error ts-migrate(2551) FIXME: Property 'cutedImg' does not exist on type 'captio... Remove this comment to see the full error message
		console.log(this.cutedImg);

		var c = document.createElement("canvas");
		var ctx = c.getContext("2d");

		var imgs = [];
		c.width = 0;
		c.height = 0;

		// @ts-expect-error ts-migrate(2551) FIXME: Property 'cutedImg' does not exist on type 'captio... Remove this comment to see the full error message
		for (var i = 0; i <= this.cutedImg.length; i++) {
			// @ts-expect-error ts-migrate(2551) FIXME: Property 'cutedImg' does not exist on type 'captio... Remove this comment to see the full error message
			var ele = await this.loadImg(this.cutedImg[i]);
			c.height += ele.height;
			if (ele.width > c.width) c.width = ele.width;
			imgs.push(ele);
		}

		var startY = 0;

		for (let j = 0; j <= imgs.length - 1; j++) {
			// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			ctx.drawImage(imgs[j], 0, startY, imgs[j].width, imgs[j].height);
			startY += imgs[j].height;
		}

		var res = c.toDataURL();
		return res;
	}
}

const Preview = ({ res }: { res: any }) => {
	if (!res) return null;
	return <img className="mdui-img-fluid" src={res} />;
};

type AlbumState = any;
type AlbumProps = {
	assets: {
		img: string;
		top: number;
		bottom: number;
		getConHeight(): void;
	}[];
	/**上边界移动 */
	onTopDrag: (distance: number, index: number) => void;
	/** 下边界移动 */
	onBottomDrag: (distance: number, index: number) => void;
	/** 删除照片 */
	deleteImg: (index: number) => void;
	/**  */
	getConHeight: (height: number, index: number) => void;
	/** 图片前移 */
	putForward: (index: number) => void;
	putBack: (index: number) => void;
};

/** 相册组件
 */
class Album extends React.Component<AlbumProps, AlbumState> {
	constructor(props: AlbumProps) {
		super(props);
		this.state = {
			startPosition: 0,
		};
	}
	render() {
		const {
			assets,
			onTopDrag,
			onBottomDrag,
			deleteImg,
			getConHeight,
		} = this.props;
		const { startPosition } = this.state;
		return (
			<div className="mdui-row-xs-1">
				{assets.map((assest, i) => (
					<div
						style={{ marginTop: "5px" }}
						className="mdui-card mdui-col"
					>
						<div key={i} className="mdui-card-media mdui-center">
							<img
								onLoad={(e) => {
									getConHeight(
										// @ts-expect-error ts-migrate(2339) FIXME: Property 'getConHeight' does not exist on type 'Re... Remove this comment to see the full error message
										e.target.offsetHeight,
										i
									);
								}}
								src={assest.img}
							/>
							<span
								draggable={true}
								onDragStart={(e) => {
									e.pageY >= 0 &&
										this.setState({
											startPosition: e.pageY,
										});
								}}
								onDrag={(e) => {
									var distance = e.pageY - startPosition;
									console.log(distance);
									e.pageY > 0 && onTopDrag(distance, i);
									e.pageY > 0 &&
										this.setState({
											startPosition: e.pageY,
										});
								}}
								onTouchStart={(e) => {
									var ev = e || window.event;
									var touch = ev.targetTouches[0];
									this.setState({
										startPosition: touch.clientY,
									});
								}}
								onTouchMove={(e) => {
									var ev = e || window.event;
									var touch = ev.targetTouches[0];
									var distance =
										touch.clientY - startPosition;
									console.log(distance);
									onTopDrag(distance, i);
									this.setState({
										startPosition: touch.clientY,
									});
								}}
								style={{ height: `${assest.top}px` }}
								className="mask mask-top"
							></span>

							<span
								draggable={true}
								onDragStart={(e) => {
									e.pageY >= 0 &&
										this.setState({
											startPosition: e.pageY,
										});
								}}
								onDrag={(e) => {
									var distance = e.pageY - startPosition;
									console.log(distance);
									e.pageY > 0 && onBottomDrag(distance, i);
									e.pageY > 0 &&
										this.setState({
											startPosition: e.pageY,
										});
								}}
								onTouchStart={(e) => {
									e.preventDefault();
									var ev = e || window.event;
									var touch = ev.targetTouches[0];
									this.setState({
										startPosition: touch.clientY,
									});
								}}
								onTouchMove={(e) => {
									e.preventDefault();
									var ev = e || window.event;
									var touch = ev.targetTouches[0];
									var distance =
										touch.clientY - startPosition;
									console.log(distance);
									onBottomDrag(distance, i);
									this.setState({
										startPosition: touch.clientY,
									});
								}}
								style={{ height: `${assest.bottom}px` }}
								className="mask mask-bottom"
							></span>

							<div className="mdui-card-menu">
								<button
									style={{
										background: "rgba(0, 0, 0, 0.27)",
									}}
									onClick={() => {
										deleteImg(i);
									}}
									className="mdui-btn mdui-btn-icon mdui-text-color-white"
								>
									<i className="mdui-icon material-icons">
										close
									</i>
								</button>
								{i >= 1 && (
									<Button
										onClick={() => {
											this.props.putForward(i);
										}}
										icon="arrow_upward"
										iconColor="white"
									/>
								)}
								{i >= 1 && i < assets.length - 1 && (
									<Button
										onClick={() => {
											this.props.putBack(i);
										}}
										icon="arrow_downward"
										iconColor="white"
									/>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}

/** 视频截图器 */
class VideoShotter extends React.Component<
	{
		addImg(imgSrc: string): void;
		video: any;
	},
	{}
> {
	videoDom: any;
	takeShot() {
		const { addImg } = this.props;
		var { videoDom } = this;
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.width = videoDom.videoWidth;
		canvas.height = videoDom.videoHeight;
		ctx &&
			ctx.drawImage(
				videoDom,
				0,
				0,
				videoDom.videoWidth,
				videoDom.videoHeight
			);
		var res = canvas.toDataURL();
		addImg(res);
	}
	render() {
		const { video } = this.props;
		if (!video) return null;
		return (
			<>
				<video
					ref={(r) => (this.videoDom = r)}
					className="mdui-video-fluid"
					controls
				>
					<source src={video} type="video/mp4" />
				</video>
				<br></br>
				<Button
					onClick={this.takeShot.bind(this)}
					primary
					raised
					title="截图"
				/>
			</>
		);
	}
}

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			assets: [],
			res: null,
			video: null,
		};
	}
	render() {
		const { assets, res, video } = this.state;
		return (
			<>
				<Album
					onTopDrag={(distance, i) => {
						if (assets[i].top + distance >= 0)
							assets[i].top += distance;
						this.setState({ assets: assets });
					}}
					onBottomDrag={(distance, i) => {
						if (assets[i].bottom - distance >= 0)
							assets[i].bottom -= distance;
						this.setState({ assets: assets });
					}}
					getConHeight={(cHeight, i) => {
						assets[i].cHeight = cHeight;
					}}
					putForward={(i) => {
						var cache = assets[i];
						assets.splice(i, 1);
						assets.splice(i - 1, 0, cache);
						this.setState({ assets: assets });
					}}
					putBack={(i) => {
						var cache = assets[i];
						assets.splice(i, 1);
						assets.splice(i + 1, 0, cache);
						this.setState({ assets: assets });
					}}
					assets={assets}
					deleteImg={(i) => {
						assets.splice(i, 1);
						this.setState({ assets: assets });
					}}
				/>

				<div className="bottom-dashboard mdui-card mdui-p-a-1">
					<FileInput
						fileType="image/*"
						multiple={true}
						onFileUpload={(file) => {
							assets.push({
								img: file,
								top:
									assets.length >= 1
										? assets[0].cHeight - assets[0].bottom
										: 50,
								bottom: assets.length >= 1 ? 0 : 50,
								cHeight: 200,
							});
							this.setState({ assets: assets });
						}}
					/>

					<span style={{ margin: "0px 5px 0px 5px" }}></span>

					<FileInput
						fileType="video/*"
						onFileUpload={(file) => {
							this.setState({ video: file });
						}}
						title="截取视频"
					/>
				</div>

				<VideoShotter
					video={video}
					addImg={(img) => {
						assets.push({
							img: img,
							top:
								assets.length >= 1
									? assets[0].cHeight - assets[0].bottom
									: 50,
							bottom: assets.length >= 1 ? 0 : 50,
							cHeight: 200,
						});
						this.setState({ assets: assets }, () => {
							snackbar({
								message: "已添加截图",
							});
						});
					}}
				/>

				<button
					style={{ zIndex: 1003 }}
					className="mdui-fab mdui-fab-fixed mdui-color-theme"
					onClick={() => {
						var mos = new captionMosaic();
						// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'assest' implicitly has an 'any' type.
						assets.map((assest) => {
							mos.addImg(
								assest.img,
								assest.top / assest.cHeight,
								assest.bottom / assest.cHeight
							);
						});
						mos.imgMosaic_Y().then((res) => {
							this.setState({ res: res }, () => {
								snackbar({
									message: "图片制作成功，请在页面底部查看",
								});
							});
						});
					}}
				>
					<i className="mdui-icon material-icons">&#xe5ca;</i>
				</button>
				<br></br>
				<Preview res={res} />
			</>
		);
	}
}
