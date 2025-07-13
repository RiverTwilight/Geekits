import * as React from "react";

interface I18nContextValue {
	dictionary: Record<string, string>;
	language: string;
}

const initialContext: I18nContextValue = {
	dictionary: {},
	language: "zh-CN",
};

// Create a singleton to store the current dictionary
let currentDictionary: Record<string, string> = {};

const I18nContext = React.createContext(initialContext);

// Export the context for external use
export const useI18n = () => React.useContext(I18nContext);

// Function to update the dictionary
export function setDictionary(dictionary: Record<string, string>) {
	currentDictionary = dictionary;
}

// Non-hook translation function
export function t(key: string, params?: (string | number)[]): string {
	if (!currentDictionary[key]) {
		return key; // Return key if translation not found
	}

	if (params && params.length > 0) {
		let templateStr = currentDictionary[key];
		let i = 0;
		while (templateStr.match(/\%s/)) {
			templateStr = templateStr.replace(/\%s/, String(params[i]));
			i++;
		}
		return templateStr;
	}

	return currentDictionary[key];
}

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
	// Update the current dictionary when the provider is rendered
	React.useEffect(() => {
		if (dictionary) {
			setDictionary(dictionary);
		}
	}, [dictionary]);

	if (children) {
		return <I18nContext.Provider value={{ language, dictionary }}>{children}</I18nContext.Provider>;
	}

	return (
        <I18nContext.Consumer>
            {(value) => {
				if (Object.prototype.toString.call(props[k]) === "[object Array]") {
					let templateStr = value.dictionary[k];
					let i = 0;
					while (templateStr.match(/\%s/)) {
						templateStr = templateStr.replace(/\%s/, String(p[i]));
						i++;
					}
					return templateStr;
				}
				return value.dictionary[k];
			}}
        </I18nContext.Consumer>
    );
}
