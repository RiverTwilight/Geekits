import React from "react";
import { snackbar } from "mdui";
import { Input } from "mdui-in-react";
import axios from "../utils/axios";

/**
 * 查询工具模板
 */

class EnquireTemplate extends React.Component<
	{
		Result: any;
		api: string;
		readonly inputOpt?: any;
		readonly btnText?: string;
	},
	{
		input: string;
		data: null | object;
	}
> {
	constructor(props: {
		Result: any;
		readonly api: string;
		readonly inputOpt?: any;
		readonly btnText?: string;
	}) {
		super(props);
		this.state = {
			input: "",
			data: null,
		};
	}
	handleEnterKeydown = (e: {
		ctrlKey: any;
		keyCode: number;
		preventDefault: () => void;
	}) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			this.loadCommentsFromServer();
		}
	};
	componentDidMount() {
		window.addEventListener("keydown", this.handleEnterKeydown);
	}
	componentWillUnmount() {
		window.removeEventListener("keydown", this.handleEnterKeydown);
	}
	loadCommentsFromServer() {
		const { api } = this.props;
		const { input } = this.state;
		window.loadShow();
		axios({
			method: "get",
			url: api + input,
			withCredentials: false,
		})
			.then((response) => {
				var json = JSON.parse(response.request.response);
				this.setState({ data: json });
			})
			.catch((error) => {
				snackbar({ message: error });
			})
			.then(() => {
				window.loadHide();
			});
	}
	render() {
		const { Result, inputOpt, btnText } = this.props;
		const { input } = this.state;
		return (
			<>
				<Input
					onValueChange={(newText: any) => {
						this.setState({ input: newText });
					}}
					{...inputOpt}
					value={input}
				/>
				<button
					onClick={this.loadCommentsFromServer.bind(this)}
					className="loadBtn mdui-ripple mdui-color-theme mdui-float-right mdui-btn-raised mdui-btn"
				>
					{btnText || "查询"}
				</button>
				<div className="mdui-clearfix"></div>
				<br></br>
				<Result data={this.state.data} input={input} />
			</>
		);
	}
}

export default EnquireTemplate;
