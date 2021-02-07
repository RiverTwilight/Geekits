import React, { useState } from "react";
import { Link } from "react-router-dom";
import fiv from "../../utils/Services/fiv";
import List from "@material-ui/core/List";
import { AppListItem } from "./AppList";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";

/**
 * 收藏列表
 * */
const FivList = () => {
	const [edit, setEdit] = useState(false);
	const [list, ,] = useState(fiv.getAll());
	return (
		<>
			<Paper>
				<List
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader
							component="div"
							id="nested-list-subheader"
						>
							收藏
						</ListSubheader>
					}
				></List>
			</Paper>
			<br></br>
		</>
		// 	<li className="mdui-subheader">
		// 		收藏&nbsp;
		// 		<span
		// 			onClick={() => {
		// 				setEdit(!edit);
		// 			}}
		// 			style={{
		// 				display: list.length > 0 ? "block" : "none",
		// 			}}
		// 			className="mdui-text-color-theme mdui-float-right"
		// 		>
		// 			{edit ? "保存" : "编辑"}
		// 		</span>
		// 	</li>
		// 	{!list.length ? (
		// 		<div className="mdui-text-center mdui-typo-body-1-opacity">
		// 			点击工具菜单中的星型按钮收藏
		// 		</div>
		// 	) : (
		// 		list.map((a, i) => (
		// 			<Link
		// 				key={a.link + a.icon}
		// 				to={edit ? "#" : "/app/" + a.link}
		// 				// @ts-expect-error ts-migrate(2322) FIXME: Property 'disabled' does not exist on type 'Intrin... Remove this comment to see the full error message
		// 				disabled={edit}
		// 				className="mdui-col mdui-list-item mdui-ripple"
		// 			>
		// 				<i className="mdui-list-item-icon mdui-icon material-icons">
		// 					star_border
		// 				</i>

		// 				<div className="mdui-list-item-content">{a.name}</div>
		// 				{edit && (
		// 					<button
		// 						onClick={() => fiv.delete(i)}
		// 						className="mdui-btn mdui-list-item-icon mdui-btn-icon"
		// 					>
		// 						<i className="mdui-icon material-icons mdui-text-color-red">
		// 							delete
		// 						</i>
		// 					</button>
		// 				)}
		// 			</Link>
		// 		))
		// 	)}
		// </ul>
	);
};

export default FivList;
