import React from "react";
import { Input } from "mdui-in-react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'prompt'.
import { prompt as Prompt } from "mdui";

//输入框&清空按钮
const InputFiled = ({ onItemChange, items }: any) => {
	return (
		<>
			<button
				className="mdui-float-right mdui-btn mdui-btn-icon"
				onClick={() => {
					onItemChange("");
				}}
				mdui-tooltip="{content: '清空'}"
			>
				<i className="mdui-icon material-icons">close</i>
			</button>

			<div className="mdui-clearfix"></div>

			<Input
				onValueChange={(newText) => {
					onItemChange(newText);
				}}
				// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
				rows="4"
				value={items}
				helper="输入待选物品，空格间隔"
			/>
		</>
	);
};

//读取本地列表
const ReadLocal = ({ local, edit, onClickLi }: any) => {
	return local.map((cache: any, i: any) => (
		<li
			onClick={() => {
				onClickLi(i);
			}}
			key={i}
			className="mdui-col mdui-list-item mdui-ripple"
		>
			<div className="mdui-list-item-content">
				<span className="mdui-text-color-theme">{cache}</span>
			</div>

			<i
				onClick={() => {
					edit(i);
				}}
				className="mdui-list-item-icon mdui-icon material-icons"
			>
				edit
			</i>
		</li>
	));
};

//添加组合组件
const AddLocal = ({ onLocalChange }: any) => {
	return (
		<li
			onClick={() => {
				if (!localStorage.getItem("decision")) {
					localStorage.setItem("decision", JSON.stringify([]));
				}
				const cache = JSON.parse(localStorage.decision);
				Prompt(
					"使用空格分隔",
					(value: any) => {
						cache.push(value);
						localStorage.setItem("decision", JSON.stringify(cache));
						onLocalChange();
					},
					() => {
						/*取消事件*/
					},
					{
						type: "textarea",
						confirmText: "保存",
						cancelText: "取消",
						history: false,
					}
				);
			}}
			className="mdui-col mdui-list-item mdui-ripple"
		>
			<div className="mdui-list-item-content">
				<span className="mdui-text-color-theme">新增一个组合</span>
			</div>

			<i className="mdui-list-item-icon mdui-icon material-icons">add</i>
		</li>
	);
};

type StartState = any;

//开始随机组件
class Start extends React.Component<{}, StartState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'statu' does not exist on type '{}'.
			statu: props.statu,
			onetime: "点我开始！",
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type '{}'.
			items: props.items,
			timer: null,
		};
	}
	componentWillReceiveProps(nextProps: {}) {
		this.setState({
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'statu' does not exist on type '{}'.
			statu: nextProps.statu,
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type '{}'.
			items: nextProps.items,
		});
	}
	componentDidMount() {
		// @ts-expect-error ts-migrate(2542) FIXME: Index signature in type 'Readonly<any>' only permi... Remove this comment to see the full error message
		this.state.timer = setInterval(() => {
			var arr = this.state.items.split(" "); //将待选项目拆分成数组
			var maxNum = arr.length - 1; //设定随机数最大值
			// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
			var index = parseInt(Math.random() * (maxNum - 0 + 1) + 0, 10); //随机选取0到最大值之间的整数
			var onetime = arr[index];
			if (this.state.statu == "start") {
				this.setState({
					onetime: onetime,
				});
			}
		}, 100);
	}
	render() {
		return (
			<div className="mdui-text-center">
				<h1>{this.state.onetime}</h1>
			</div>
		);
	}
}

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			// @ts-expect-error ts-migrate(2345) FIXME: Type 'null' is not assignable to type 'string'.
			local: JSON.parse(localStorage.getItem("decision")) || [],
			statu: "stop",
			items:
				"糖醋排骨 红烧肉 酸菜鱼 坤徐菜 酸豇豆 炸鸡 烧仙草 汉堡 薯条 可乐 牛肉面 作者",
		};
	}
	componentDidMount() {
		window.location.hash &&
			this.setState({
				items: decodeURI(window.location.hash.substring(1)),
			});
	}
	render() {
		const { statu, local, items } = this.state;

		return (
			<>
				<div className=" mdui-p-a-1">
					<InputFiled
						items={items}
						onItemChange={(newItems: any) => {
							this.setState({ items: newItems });
						}}
					/>

					<ul className="mdui-list mdui-row-md-2">
						<ReadLocal
							local={local}
							onClickLi={(key: any) => {
								this.setState({ items: local[key] });
							}}
							edit={(key: any) => {
								Prompt(
									"使用空格分隔",
									(value: any) => {
										var local = this.state.local;
										local.splice(key, 1, value);
										localStorage.setItem(
											"decision",
											JSON.stringify(local)
										);
									},
									() => {
										//删除组合
										var local = this.state.local;
										local.splice(key, 1);
										localStorage.setItem(
											"decision",
											JSON.stringify(local)
										);
									},
									{
										type: "textarea",
										defaultValue: local[key],
										confirmText: "保存",
										cancelText: "删除",
									}
								);
							}}
						/>

						<AddLocal
							onLocalChange={() => {
								this.setState({ local: localStorage.item });
							}}
						/>
					</ul>
				</div>

				<br></br>

				<div
					className="mdui-ripple  mdui-p-a-1"
					onClick={() => {
						window.history.pushState(
							null,
							"",
							`#${encodeURI(items)}`
						);
						this.setState({ statu: "start" });
						setTimeout(
							() => this.setState({ statu: "stop" }),
							3000
						);
					}}
				>
					<Start
						// @ts-expect-error ts-migrate(2322) FIXME: Property 'statu' does not exist on type 'Intrinsic... Remove this comment to see the full error message
						statu={statu}
						items={items}
					/>
				</div>
			</>
		);
	}
}
