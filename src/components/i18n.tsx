import * as React from "react";
/**
 * 多语言组件
 * @author rivertwilight
 * 若props包含子节点作为词典Provider，不包含作为Consumer
 */

const { Provider, Consumer } = React.createContext({
	dictionary: {},
	language: "zh-CN",
});

interface Pro {
	dictionary?: any;
	language?: string;
	children?: JSX.Element | JSX.Element[] | null;
}

interface Con {
	k?: string;
	p?: string[] | number[];
}

export default function Text({
	dictionary,
	language,
	children,
	k,
	p,
	...props
}: Pro & Con): JSX.Element {
	if (children) {
		return <Provider value={{ language, dictionary }}>{children}</Provider>;
	}

	return (
		<Consumer>
			{(value) => {
				// console.log(value.dictionary);
				if (
					Object.prototype.toString.call(props[k]) ===
					"[object Array]"
				) {
					let templateStr = value.dictionary[k];
					let i = 0;
					while (templateStr.match(/\%s/)) {
						templateStr = templateStr.replace(/\%s/, p[i]);
						i++;
					}
					return templateStr;
				}
				return value.dictionary[k];
			}}
		</Consumer>
	);
}
