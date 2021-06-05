import React from "react";
import loadable from "../../utils/loading";
import { store as loginDialogStore } from "../../data/loginDialogState";

export default class extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			Comp: null,
		};
	}
	componentDidMount = () => {
		loginDialogStore.subscribe(() => {
			if (loginDialogStore.getState().value && !!!this.state.Comp) {
				this.setState({
					Comp: loadable(() => import("./LoginDialog")),
				});
			}
		});
	};
	render() {
		const { Comp } = this.state;
		if (Comp) {
			return <Comp />;
		}
		return null;
	}
}
