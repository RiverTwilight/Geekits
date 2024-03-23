import type { Dispatch, FC, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface Action {
	action: FC;
	setAction: Dispatch<SetStateAction<FC>>;
}

const ActionContext = createContext<Action>({
	action: null,
	setAction: () => null,
});

export const useAction = () => useContext(ActionContext);

export const ActionProvider = ActionContext.Provider;
