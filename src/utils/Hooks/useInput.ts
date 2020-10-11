import * as React from "react";

/**
 * Input表单
 * @param defaultValue 初始值
 */
export default function useInput(defaultValue: string | number): [any, any] {
	const [value, setValue] = React.useState(defaultValue);
	function handleInput(event: any) {
		setValue(event.target.value);
	}
	return [value, handleInput];
}
