import * as React from "react";

/**
 * Input表单
 * @param defaultValue 初始值
 */
export default function useInput<S>(defaultValue: (() => S) | S): [any, any] {
	const [value, setValue] = React.useState<String>(defaultValue);
	function handleInput(event: any) {
		if (typeof event === "string") {
			setValue(event);
		} else {
			setValue(event.target.value);
		}
	}
	return [value, handleInput];
}
