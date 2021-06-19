import React, { useState, useEffect } from "react";
import {
	makeStyles,
	createStyles,
	withStyles,
	Theme,
} from "@material-ui/core/styles";
import CircularProgress, {
	CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TaskLists from "./TaskLists";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { db } from "./db";
import { ITaskItem } from "./ITaskItem";
import { IBrochure } from "./IBrochures";

const DEFAULT_TITLE = "无标题";

const BorderLinearProgress = withStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 10,
			borderRadius: 5,
		},
		colorPrimary: {
			backgroundColor:
				theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
		},
		bar: {
			borderRadius: 5,
			backgroundColor: theme.palette.primary.light,
		},
	})
)(LinearProgress);

// Inspired by the former Facebook spinners.
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		padding: {
			padding: theme.spacing(2),
		},
		addAction: {
			right: theme.spacing(3),
			bottom: theme.spacing(3),
			position: "fixed",
		},
		actions: {
			display: "flex",
			justifyContent: "space-between",
		},
	})
);

const RewardBoard = ({
	brochures,
	totalPoints = 120,
}: {
	totalPoints: number;
	brochures: IBrochure[];
}) => {
	const classes = useStyles();
	const [nextReward, setNextReward] = useState<string>("");
	const [nextRewardPoint, setNextRewardPoint] = useState<number | string>(0)
	// 后续增加手册切换功能
	const currentBrochure: IBrochure = {
		50: {
			reward: "asfd",
		},
		100: {
			reward: "asdff",
		},
		200: {
			reward: "dgs",
		},
	};
	const pointSets = Object.keys(currentBrochure);

	useEffect(() => {
		for (let i in pointSets) {
		let index: number = parseInt(i);
		if (
			totalPoints >= parseInt(pointSets[index]) &&
			totalPoints < parseInt(pointSets[index + 1])
		) {
			setNextReward(currentBrochure[pointSets[index + 1]].reward);
			setNextRewardPoint(pointSets[index + 1]);
			return
		}
	}	
	}, [totalPoints])

	return (
		<>
			<Card className={classes.padding} component={Paper}>
				<Typography variant="h5">
					<CardGiftcardIcon />
					{nextReward}
				</Typography>
				<Typography variant="caption">{`${totalPoints}/${nextRewardPoint}`}</Typography>
				<br />
				<BorderLinearProgress variant="determinate" value={50} />
				<br />
				<div className={classes.actions}>
					<Button startIcon={<KeyboardArrowLeftIcon />}></Button>
					<Button endIcon={<NavigateNextIcon />}>上一个</Button>
				</div>
			</Card>
		</>
	);
};

// TODO 积分手册工具
const App = () => {
	const classes = useStyles();
	const [tasks, setTasks] = useState<ITaskItem[]>([]);
	const [rewards, setRewards] = useState<IBrochure[]>([]);

	useEffect(() => {
		db.table("tasks")
			.toArray()
			.then((tasks) => {
				setTasks(tasks);
			});
	}, []);

	const addTask = (title = DEFAULT_TITLE, point = 10) => {
		const todo: ITaskItem = {
			title,
			done: true,
			point,
		};
		db.table("tasks")
			.add(todo)
			.then((id) => {
				const newList = [...tasks, Object.assign({}, todo, { id })];
				setTasks(newList);
			});
	};

	const sum =
		tasks
			.filter((task) => task.done)
			.map((task) => task.point)
			.reduce((a = 0, b = 0) => a + b, 0) || 0;

	console.log(sum);

	return (
		<>
			<RewardBoard totalPoints={sum} brochures={rewards} />
			<br />
			<TaskLists tasks={tasks} />
			<Fab
				size="small"
				color="secondary"
				aria-label="add"
				className={classes.addAction}
				onClick={() => addTask("bia")}
			>
				<AddIcon />
			</Fab>
		</>
	);
};

export default App;
