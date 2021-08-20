import { TaskItem } from "./TaskItem";
import { ITaskItem } from "./ITaskItem";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

export default ({ tasks }: { tasks: ITaskItem[] }) => {
	if (!tasks) return null;

	return (
		<Card component={Paper}>
			<List>
				{tasks.map(({ title, id, point }: ITaskItem) => (
					<TaskItem key={id} title={title} point={point} />
				))}
			</List>
		</Card>
	);
};
