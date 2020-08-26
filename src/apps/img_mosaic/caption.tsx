import React from "react";
import { snackbar } from "mdui";

import { FileInput } from "mdui-in-react";
import "./caption.css";

class captionMosaic {
	constructor() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'img' does not exist on type 'captionMosa... Remove this comment to see the full error message
		this.img = [];
		// @ts-expect-error ts-migrate(2551) FIXME: Property 'cutedImg' does not exist on type 'captio... Remove this comment to see the full error message
		this.cutedImg = [];
	}
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'base64' implicitly has an 'any' type.
	async loadImg(base64) {
		var img = await new Image();
		img.src = base64;
		return img;
	}
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'base64' implicitly has an 'any' type.
	addImg(base64, top, bottom) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'img' does not exist on type 'captionMosa... Remove this comment to see the full error message
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
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'img' does not exist on type 'captionMosa... Remove this comment to see the full error message
		for (var i = 0; i <= this.img.length - 1; i++) {
			let {
				top,
				bottom,
				base64,
				// @ts-expect-error ts-migrate(2339) FIXME: Property 'img' does not exist on type 'captionMosa... Remove this comment to see the full error message
			} = this.img[i];
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

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'res' implicitly has an 'any' type... Remove this comment to see the full error message
const Preview = ({ res }) => {
	if (!res) return null;
	return <img className="mdui-img-fluid" src={res} />;
};

type AlubmState = any;

class Alubm extends React.Component<{
	assets: {
		img: string,
		top: number,
		bottom: number,
		getConHeight(): void
	}[]
}, AlubmState> {
	constructor(props: Readonly<{ assets: { img: string; top: number; bottom: number; getConHeight: any; }[]; }>) {
		super(props);
		this.state = {
			startPosition: 0,
		};
	}
	render() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'assets' does not exist on type 'Readonl... Remove this comment to see the full error message
		const { assets, onTopDrag, onBottomDrag, deleteImg } = this.props;
		const { startPosition } = this.state;
		return (
			<div className="mdui-row-xs-1">
				{
					assets.map((assest, i) => (
						<div
							style={{ marginTop: "5px" }}
							className="mdui-card mdui-col"
						>
							<div
								key={i}
								className="mdui-card-media mdui-center"
							>
								<img
									onLoad={(e) => {
										// @ts-expect-error
										this.props.getConHeight(
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
										e.pageY > 0 &&
											onBottomDrag(distance, i);
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

									<button
										style={{
											display: i >= 1 ? "block" : "none",
										}}
										onClick={() => {
											// @ts-expect-error ts-migrate(2339) FIXME: Property 'putForward' does not exist on type 'Read... Remove this comment to see the full error message
											this.props.putForward(i);
										}}
										className="mdui-btn mdui-btn-icon mdui-text-color-white"
									>
										<i className="mdui-icon material-icons">
											arrow_upward
										</i>
									</button>

									<button
										style={{
											display:
												i >= 1 && i < assets.length - 1
													? "block"
													: "none",
										}}
										onClick={() => {
											// @ts-expect-error ts-migrate(2339) FIXME: Property 'putBack' does not exist on type 'Readonl... Remove this comment to see the full error message
											this.props.putBack(i);
										}}
										className="mdui-btn mdui-btn-icon mdui-text-color-white"
									>
										<i className="mdui-icon material-icons">
											arrow_downward
										</i>
									</button>
								</div>
							</div>
						</div>
					))
				}
			</div>
		);
	}
}

class VideoShotter extends React.Component {
	video: any;
	render() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'video' does not exist on type 'Readonly<... Remove this comment to see the full error message
		const { video, addImg } = this.props;
		if (!video) return null;
		return (
			<>
				<video
					ref={(r) => (this.video = r)}
					className="mdui-video-fluid"
					controls
				>
					<source src={video} type="video/mp4" />
				</video>
				<br></br>
				<button
					className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme"
					onClick={() => {
						var canvas = document.createElement("canvas");
						var video = this.video;
						var ctx = canvas.getContext("2d");
						canvas.width = video.videoWidth;
						canvas.height = video.videoHeight;
						ctx && ctx.drawImage(
							video,
							0,
							0,
							video.videoWidth,
							video.videoHeight
						);
						var res = canvas.toDataURL();
						addImg(res);
					}}
				>
					截图
				</button>
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
				<Alubm
					// @ts-expect-error ts-migrate(2322) FIXME: Property 'onTopDrag' does not exist on type 'Intri... Remove this comment to see the full error message
					onTopDrag={(distance, i) => {
						if (assets[i].top + distance >= 0)
							assets[i].top += distance;
						this.setState({ assets: assets });
					}}
					// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'distance' implicitly has an 'any' type.
					onBottomDrag={(distance, i) => {
						if (assets[i].bottom - distance >= 0)
							assets[i].bottom -= distance;
						this.setState({ assets: assets });
					}}
					// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cHeight' implicitly has an 'any' type.
					getConHeight={(cHeight, i) => {
						assets[i].cHeight = cHeight;
					}}
					// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
					putForward={(i) => {
						var cache = assets[i];
						assets.splice(i, 1);
						assets.splice(i - 1, 0, cache);
						this.setState({ assets: assets });
					}}
					// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
					putBack={(i) => {
						var cache = assets[i];
						assets.splice(i, 1);
						assets.splice(i + 1, 0, cache);
						this.setState({ assets: assets });
					}}
					assets={assets}
					// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
					deleteImg={(i) => {
						assets.splice(i, 1);
						this.setState({ assets: assets });
					}}
				/>

				<div className="bottom-dashboard mdui-card mdui-p-a-1">
					<FileInput
						fileType="image/*"
						multiple={true}
						onFileChange={(file) => {
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
						onFileChange={(file) => {
							this.setState({ video: file });
						}}
						// @ts-expect-error ts-migrate(2769) FIXME: Property 'text' does not exist on type 'IntrinsicA... Remove this comment to see the full error message
						text="截取视频"
					/>
				</div>

				<VideoShotter
					// @ts-expect-error ts-migrate(2769) FIXME: Property 'video' does not exist on type 'Intrinsic... Remove this comment to see the full error message
					video={video}
					// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'img' implicitly has an 'any' type.
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
					// @ts-expect-error ts-migrate(2322) FIXME: Type '"1003"' is not assignable to type '"-moz-ini... Remove this comment to see the full error message
					style={{ zIndex: "1003" }}
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
