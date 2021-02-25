import * as React from "react";
import { Input } from "mdui-in-react";

/**
 * 表单组件，用于生成配置化表单
 * @author 江村暮
 */

interface eleCon
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"webkitdirectory" | "size" | "prefix" | "type"
	> {
	header?: string;
	placeholder?: string;
	id: string;
	block?: boolean;
	type?: "input" | "switch";
}

const Form = ({
	config,
	onValueChange,
	defaultValue = {},
	...props
}: {
	config: eleCon[];
	focus?: number;
	onValueChange?: (updated: { key: any; event: any }) => void;
	defaultValue?: {
		[key: string]: any;
	};
}) => {
	const initialData: {
		[key: string]: any;
	} = {};
	for (let i of config) {
		let { id, type } = i;
		initialData[id] = type ? { switch: true, input: "" }[type] : "";
	}
	const formContent = defaultValue || initialData;
	return (
		<>
			{config.map(({ header, type, placeholder, block, id }, index) => {
				switch (type) {
					case "switch":
						return <React.Fragment key={id}></React.Fragment>;
					default:
						return (
							<Input
								key={id}
								onInput={(e) => {
									onValueChange &&
										onValueChange({
											key: id,
											event: e.target,
										});
								}}
								header={header}
								placeholder={placeholder}
							/>
						);
				}
			})}
		</>
	);
};

export default Form;
