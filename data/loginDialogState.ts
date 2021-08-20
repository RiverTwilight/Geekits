import { createStore } from "redux";

function drawerReducer(state = { value: false }, action: { type: any }) {
	switch (action.type) {
		case "loginDialog/opened":
			return { value: true };
		case "loginDialog/closed":
			return { value: false };
		default:
			return state;
	}
}

let store = createStore(drawerReducer);

export { store };
