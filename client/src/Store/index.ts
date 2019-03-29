import { createStore } from "redux";
import { bcReducer } from "../Reducers";

export type AppState = ReturnType<typeof bcReducer>;

export default function configureStore() {
	const store = createStore(bcReducer);

	return store;
}
