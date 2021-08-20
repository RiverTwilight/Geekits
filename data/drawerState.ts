import { createStore } from "redux";

function drawerReducer(state = { value: false }, action: { type: any }) {
	switch (action.type) {
		case "drawer/opened":
			return { value: true };
		case "drawer/closed":
			return { value: false };
		default:
			return state;
	}
}

let store = createStore(drawerReducer);

// const switchDrawer = (state: boolean) => {
// 	return {
// 		type: state ? "drawer/opened" : "drawer/closed",
// 	};
// };

// const openDrawer = () => store.dispatch(switchDrawer(true));
// const closeDrawer = () => store.dispatch(switchDrawer(false));
// const drawerState = store.getState();

export { store };
