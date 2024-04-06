import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface Locale {
	locale: string;
	setLocale: Dispatch<SetStateAction<string>>;
}

const LocaleContext = createContext<Locale>({
	locale: null,
	setLocale: () => null,
});

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider = LocaleContext.Provider;
