import { createStore } from "redux";

function frameReducer(state = { value: false }, action: { type: any }) {
	switch (action.type) {
		case "frame/enabled":
			return { value: true };
		case "frame/disabled":
			return { value: false };
		default:
			return state;
	}
}

let store = createStore(frameReducer);

export { store };
