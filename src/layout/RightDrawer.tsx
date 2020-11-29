import React from "react";
import { Drawer } from "mdui";

// FIXME 设置界面右侧栏不消失
class DrawerMenu extends React.PureComponent<
	{
		content: React.ReactComponentElement<"div">;
	},
	{}
> {
	componentDidMount() {
		window.RightDrawer = new Drawer("#right-drawer");
	}
	render() {
		const { content } = this.props;
		return (
			<div id="right-drawer" className="mdui-drawer mdui-drawer-right">
				{content}
			</div>
		);
	}
}

export default DrawerMenu;
