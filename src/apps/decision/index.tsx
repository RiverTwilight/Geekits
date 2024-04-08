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
import OutlinedCard from "@/components/OutlinedCard";
import { Fab, Typography } from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";

const PREFIX = "Len";

const classes = {
	lenText: `${PREFIX}-lenText`,
	lenWarpper: `${PREFIX}-lenWarpper`,
	lenBorder: `${PREFIX}-lenBorder`,
};

const Root = styled("div")(({ theme: Theme }) => ({
	maxWidth: "500px",
	[`& .${classes.lenText}`]: {
		fill: Theme.palette.primary.main,
		stroke: Theme.palette.primary.main,
	},
	[`& .${classes.lenBorder}`]: {
		stroke: Theme.palette.primary.main,
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
	}, [resultIndex]);

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
					borderRadius: "999px",
					padding: 2,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					background: (theme) => theme.palette.background.paper,
				}}
			>
				<svg
					height={`${R * 2 + 4}px`}
					width={`${R * 2 + 4}px`}
					xmlns=""
					version="1.1"
					style={{
						transform: `rotate(${
							degree +
							(getRandom(0, 3) / 10) * DEGREE_PER_ITEM -
							90
						}deg)`,
						transition: "transform 5s",
					}}
				>
					{Array(items.length)
						.fill(0)
						.map((item, i) => {
							return (
								<path
									className={classes.lenText}
									d={`M${R + 2} ${R + 2} L${
										R + 2 + calcLocation(r, percent * i).x
									} ${
										R + 2 + calcLocation(r, percent * i).y
									}`}
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
								style={{
									fontFamily: "Product Sans",
								}}
								key={item}
								transform-origin="initial"
							>
								<text x={1.5 * r} y={R} dy={10}>
									{item}
								</text>
							</g>
						);
					})}

					<circle
						stroke="#888"
						strokeWidth={"4px"}
						className={classes.lenBorder}
						fill="transparent"
						cx={R + 2}
						cy={R + 2}
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
			<Box
				sx={{
					maxWidth: "1000px",
				}}
			>
				<OutlinedCard>
					<Box
						sx={{
							padding: 1,
							borderRadius: "10px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
						}}
					>
						<Lens
							resultIndex={resultIndex}
							items={itemString.split(" ")}
							onStart={this.handleStart}
							statu={statu}
						/>
						<Fab
							onClick={this.handleStart}
							size="small"
							sx={{ position: "absolute", bottom: 8, right: 8 }}
						>
							<RefreshRounded />
						</Fab>
					</Box>
				</OutlinedCard>

				<br />

				<OutlinedCard>
					<Box padding={2}>
						<FormControl fullWidth>
							<TextField
								variant="outlined"
								value={itemString}
								onChange={this.handleChange}
								placeholder="填入选项，用空格分隔"
							/>
						</FormControl>
						<br />
						<br />
						<Box display={"flex"} justifyContent={"center"}>
							<Button
								variant="outlined"
								onClick={this.handleSavePresets}
							>
								保存组合
							</Button>
						</Box>
					</Box>
				</OutlinedCard>

				<br />

				{!!presets.length && (
					<OutlinedCard padding={2}>
						<Typography gutterBottom>预设</Typography>
						<List>
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
					</OutlinedCard>
				)}
			</Box>
		);
	}
}
