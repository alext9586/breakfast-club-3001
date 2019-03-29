import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./Components/App";
import "./index.css";
import { unregister as unregisterServiceWorker } from "./registerServiceWorker";
import configureStore from "./Store";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root") as HTMLElement
);
unregisterServiceWorker();
