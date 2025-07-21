import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface Action {
	action: React.ReactNode;
	/**
	 * Set the action to null to hide it from the action bar
	 *
	 * ## Example
	 * ```tsx
	 * const { setAction } = useAction();
	 * setAction(null);
	 * ```
	 */
	setAction: Dispatch<SetStateAction<React.ReactNode>>;
}

const ActionContext = createContext<Action>({
	action: null,
	setAction: () => null,
});

export const useAction = () => useContext(ActionContext);

export const ActionProvider = ActionContext.Provider;
