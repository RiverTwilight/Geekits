import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";

const PREFIX = "Len";

const classes = {
	lenText: `${PREFIX}-lenText`,
	lenWarpper: `${PREFIX}-lenWarpper`,
};

const Root = styled("div")(({ theme: Theme }) => ({
	maxWidth: "500px",
	[`& .${classes.lenText}`]: {
		fill: Theme.palette.mode === "dark" ? "#fff" : "#000",
		stroke: Theme.palette.mode === "dark" ? "#fff" : "#000",
	},
	[`& .${classes.lenWarpper}`]: {
		boxShadow:
			Theme.palette.mode === "dark"
				? "0px 0px 9px 2px #000"
				: "0px 0px 20px 0px #747070",
	},
}));

const COLOR_LIST = [
	"#FF0000",
	"#FF7F00",
	"#FFFF00",
	"#00FF00",
	"#00FFFF",
	"#0000FF",
	"#8B00FF",
];

const calcLocation = (r: number, percent: number): { x: number; y: number } => {
	const x = r * Math.cos(percent * 2 * Math.PI);
	const y = r * Math.sin(percent * 2 * Math.PI);
	return {
		x,
		y,
	};
};

const R: number = 150;

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
		<Root onClick={onStart}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<ArrowDropDownIcon sx={{ transform: "scale(2, 2)" }} />
			</Box>
			<Box
				sx={{
					borderRadius: "250px",
					padding: "10px",
				}}
				className={classes.lenWarpper}
			>
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
									className={classes.lenText}
									d={`M${R} ${R} L${
										R + calcLocation(r, percent * i).x
									} ${R + calcLocation(r, percent * i).y}`}
								></path>
							);
						})}

					{items.map((item, i) => {
						return (
							<g
								fontSize="30"
								line-height="30"
								font-family="sans-serif"
								stroke="none"
								textAnchor="middle"
								className={classes.lenText}
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
			</Box>
		</Root>
	);
};

const getRandom = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

type ComponentState = {
	status?: "stop" | "start";
	itemString?: string;
	resultString?: string;
	resultIndex?: number;
	presets: any[];
};

export default class Decision extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			status: "stop",
			itemString: "First Second",
			resultIndex: null,
			presets: [],
		};
	}
	componentDidMount() {
		window.location.hash &&
			this.setState({
				itemString: decodeURI(window.location.hash.substring(1)),
			});

		if (localStorage.getItem("DECISION_MAKER_PRESETS")) {
			this.setState({
				presets: JSON.parse(
					localStorage.getItem("DECISION_MAKER_PRESETS")
				),
			});
		}
	}

	handleSavePresets = () => {
		let newPresets = [
			...this.state.presets,
			{
				text: this.state.itemString,
			},
		];
		this.setState({
			presets: newPresets,
		});
		localStorage.setItem(
			"DECISION_MAKER_PRESETS",
			JSON.stringify(newPresets)
		);
	};

	handleLoadPreset = (text: string) => {
		this.setState({
			itemString: text,
		});
	};

	handleStart = () => {
		this.setState({
			status: "start",
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
		const { status: statu, itemString, resultIndex, presets } = this.state;
		return (
			<>
				<Box
					sx={{
						paddingY: 2,
					}}
					component={Paper}
					className="center-with-flex"
				>
					<Lens
						resultIndex={resultIndex}
						items={itemString.split(" ")}
						onStart={this.handleStart}
						statu={statu}
					/>
				</Box>

				<Box component={Paper} sx={{ padding: "5px", mt: "24px" }}>
					<FormControl fullWidth>
						<TextField
							variant="outlined"
							value={itemString}
							onChange={this.handleChange}
							multiline
							rows={3}
							placeholder="填入选项，用空格分隔"
						/>
						<Button onClick={this.handleSavePresets}>
							保存组合
						</Button>
					</FormControl>
				</Box>

				{!!presets.length && (
					<List
						component={Paper}
						sx={{
							mt: "24px",
						}}
						subheader={<ListSubheader>已保存的组合</ListSubheader>}
					>
						{presets.map((preset) => (
							<ListItemButton
								onClick={() =>
									this.handleLoadPreset(preset.text)
								}
							>
								<ListItemText primary={preset.text} />
							</ListItemButton>
						))}
					</List>
				)}

				<Paper></Paper>
			</>
		);
	}
}
