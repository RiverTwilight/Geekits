import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface AppBar {
	appBar: boolean;
	setAppBar: Dispatch<SetStateAction<boolean>>;
}

const appBarContext = createContext<AppBar>({
	appBar: true,
	setAppBar: () => true,
});

export const useAppBar = () => useContext(appBarContext);

export const AppBarProvider = appBarContext.Provider;
