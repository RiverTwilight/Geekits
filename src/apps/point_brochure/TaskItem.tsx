import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import { ITaskItem } from "./ITaskItem";

export const TaskItem = ({ title, id, done }: ITaskItem) => {
	return (
		<ListItem>
			<ListItemText primary={title} secondary="Jan 7, 2014" />
			<ListItemSecondaryAction>
				<Button variant="outlined" startIcon={<DataUsageIcon />}>+5</Button>
			</ListItemSecondaryAction>
		</ListItem>
	);
};
