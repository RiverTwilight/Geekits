import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const COLOR_LIST = [
	"#FF0000",
	"#FF7F00",
	"#FFFF00",
	"#00FF00",
	"#00FFFF",
	"#0000FF",
	"#8B00FF",
];

/**
 * 渲染本地列表
 * @param param0
 */
// const ReadLocal = ({ local, edit, onClickLi }: any) => {
// 	return local.map((cache: any, i: any) => (
// 		<li
// 			onClick={() => {
// 				onClickLi(i);
// 			}}
// 			key={i}
// 			className="mdui-col mdui-list-item mdui-ripple"
// 		>
// 			<div className="mdui-list-item-content">
// 				<span className="mdui-text-color-theme">{cache}</span>
// 			</div>

// 			<i
// 				onClick={() => {
// 					edit(i);
// 				}}
// 				className="mdui-list-item-icon mdui-icon material-icons"
// 			>
// 				edit
// 			</i>
// 		</li>
// 	));
// };

// //添加组合组件
// const AddLocal = ({ onLocalChange }: any) => {
// 	return (
// 		<li
// 			onClick={() => {
// 				if (!localStorage.getItem("decision")) {
// 					localStorage.setItem("decision", JSON.stringify([]));
// 				}
// 				const cache = JSON.parse(localStorage.decision);
// 				Prompt(
// 					"使用空格分隔",
// 					(value: any) => {
// 						cache.push(value);
// 						localStorage.setItem("decision", JSON.stringify(cache));
// 						onLocalChange();
// 					},
// 					() => {
// 						/*取消事件*/
// 					},
// 					{
// 						type: "textarea",
// 						confirmText: "保存",
// 						cancelText: "取消",
// 						history: false,
// 					}
// 				);
// 			}}
// 			className="mdui-col mdui-list-item mdui-ripple"
// 		>
// 			<div className="mdui-list-item-content">
// 				<span className="mdui-text-color-theme">新增一个组合</span>
// 			</div>

// 			<i className="mdui-list-item-icon mdui-icon material-icons">add</i>
// 		</li>
// 	);
// };

type StartState = {
	statu?: "stop" | "start";
	currentItem?: string;
	timer: any;
};

type StartProps = {
	statu?: any;
	items: string;
};

const calcLocation = (r: number, percent: number): { x: number; y: number } => {
	const x = r * Math.cos(percent * 2 * Math.PI);
	const y = r * Math.sin(percent * 2 * Math.PI);
	return {
		x,
		y,
	};
};

const R: number = 150;

const Pointer: React.FC<{}> = ({}) => {
	return (
		<>
			<svg width={R * 2}>
				<circle cx={R} cy={R} r={R} fill="#66ccff"></circle>
			</svg>
		</>
	);
};

const Lens: React.FC<{
	onStart: () => void;
	items?: string[];
	resultIndex?: number;
	statu: "start" | "stop";
}> = ({ resultIndex, onStart, statu, items = ["脉动", "Cola", "茶"] }) => {
	const DEGREE_PER_ITEM = 360 / items.length;

	const [degree, setDegree] = useState(-DEGREE_PER_ITEM / 2);
	const [index, setIndex] = useState(0);

	const r: number = 150;

	const percent = 1 / items.length;

	useEffect(() => {
		if (resultIndex === null) return;

		const steps =
			resultIndex > index
				? resultIndex - index
				: items.length - index + resultIndex;
		const targetDegree =
			degree - steps * DEGREE_PER_ITEM + getRandom(0, 3) * 360;

		console.log(steps, items[resultIndex]);

		setDegree(targetDegree);
		setIndex(resultIndex);
	}, [resultIndex, statu]);

	return (
		<div onClick={onStart}>
			{/* <Pointer /> */}
			<svg
				height={`${R * 2}px`}
				width={`${R * 2}px`}
				xmlns=""
				version="1.1"
				transform={`rotate(${
					degree + (getRandom(0, 3) / 10) * DEGREE_PER_ITEM - 90
				})`}
				style={{ transition: "transform 5s" }}
			>
				{Array(items.length)
					.fill(0)
					.map((item, i) => {
						return (
							<path
								fill="#66ccff"
								stroke="#000"
								d={`M${R} ${R} L${
									R + calcLocation(r, percent * i).x
								} ${R + calcLocation(r, percent * i).y}`}
							></path>
						);
					})}

				{items.map((item, i) => {
					return (
						<g
							font-size="30"
							line-height="30"
							font-family="sans-serif"
							fill="black"
							stroke="none"
							text-anchor="middle"
							transform={`rotate(${
								360 * (percent * i + percent / 2)
							})`}
							transform-origin="initial"
						>
							<text key={i + item} x={1.5 * r} y={R} dy={10}>
								{item}
							</text>
						</g>
					);
				})}

				<circle
					stroke="#888"
					fill="transparent"
					cx={R}
					cy={R}
					r={R}
				></circle>
			</svg>
		</div>
	);
};

// get random number from range
const getRandom = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

type ComponentState = {
	statu?: "stop" | "start";
	itemString?: string;
	resultString?: string;
	resultIndex?: number;
};

export default class Decision extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			local: JSON.parse(localStorage.getItem("decision") || "[]"),
			statu: "stop",
			itemString: "First Second",
			resultIndex: null,
		};
	}
	componentDidMount() {
		window.location.hash &&
			this.setState({
				items: decodeURI(window.location.hash.substring(1)),
			});
	}

	editItem = (key: any) => {
		const { local } = this.state;
		Prompt(
			"使用空格分隔",
			(value: any) => {
				var local = this.state.local;
				local.splice(key, 1, value);
				localStorage.setItem("decision", JSON.stringify(local));
			},
			() => {
				//删除组合
				let local = this.state.local;
				local.splice(key, 1);
				localStorage.setItem("decision", JSON.stringify(local));
			},
			{
				type: "textarea",
				defaultValue: local[key],
				confirmText: "保存",
				cancelText: "删除",
			}
		);
	};

	handleStart = () => {
		this.setState({
			statu: "start",
			resultIndex: getRandom(
				0,
				this.state.itemString.split(" ").length - 1
			),
		});
	};

	handleChange = (event) => {
		this.setState({
			itemString: event.target.value,
		});
	};

	render() {
		const { statu, itemString, resultIndex } = this.state;
		return (
			<>
				<div className="center-with-flex">
					<Lens
						resultIndex={resultIndex}
						items={itemString.split(" ")}
						onStart={this.handleStart}
						statu={statu}
					/>
				</div>

				<Paper style={{ padding: "5px" }}>
					<FormControl fullWidth>
						<TextField
							variant="outlined"
							value={itemString}
							onChange={this.handleChange}
							multiline
							rows={3}
							placeholder="填入选项，用空格分隔"
						/>
						<Button>保存</Button>
					</FormControl>
				</Paper>
				<Paper></Paper>
			</>
		);
	}
}
