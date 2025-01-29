import type { Dispatch, FC, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface Action {
	action: FC | Element;
	/**
	 * Set the action to null to hide it from the action bar
	 *
	 * ## Example
	 * ```tsx
	 * const { setAction } = useAction();
	 * setAction(null);
	 * ```
	 */
	setAction: Dispatch<SetStateAction<FC | Element>>;
}

const ActionContext = createContext<Action>({
	action: null,
	setAction: () => null,
});

export const useAction = () => useContext(ActionContext);

export const ActionProvider = ActionContext.Provider;
