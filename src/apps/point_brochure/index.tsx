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
import { IRewardItem } from "./IRewardItem";

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

const RewardBoard = ({ rewards }: { rewards: IRewardItem[] }) => {
	const classes = useStyles();
    // 后续增加手册切换功能
    const curerntBrochure = rewards[0];
	return (
		<>
			<Card className={classes.padding} component={Paper}>
				<Typography variant="h5">
					<CardGiftcardIcon />
					一杯奶茶
				</Typography>
				<Typography variant="caption">120/200</Typography>
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
	const [rewards, setRewards] = useState<IRewardItem[]>([]);

	useEffect(() => {
		db.table("tasks")
			.toArray()
			.then((tasks) => {
				setTasks(tasks);
			});
	});

	const addTask = (title = DEFAULT_TITLE) => {
		const todo: ITaskItem = {
			title,
			done: false,
		};
		db.table("tasks")
			.add(todo)
			.then((id) => {
				const newList = [...tasks, Object.assign({}, todo, { id })];
				setTasks(newList);
			});
	};

	return (
		<>
			<RewardBoard rewards={rewards} />
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
