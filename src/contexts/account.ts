import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface Account {
	account: null;
	setAccount: Dispatch<SetStateAction<any>>;
}

const AccountContext = createContext<Account>({
	account: null,
	setAccount: () => null,
});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = AccountContext.Provider;
