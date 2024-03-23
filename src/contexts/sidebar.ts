import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface Sidebar {
	sidebar: boolean;
	setSidebar: Dispatch<SetStateAction<boolean>>;
}

// Share a React state via context
const SidebarContext = createContext<Sidebar>({
	sidebar: true,
	setSidebar: () => true,
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = SidebarContext.Provider;
