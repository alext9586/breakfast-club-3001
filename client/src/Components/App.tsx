import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import logo from "./toast.png";
import { AdminPageContainer } from "./AdminPage/AdminPageContainer";
import IndexPageContainer from "./IndexPage/IndexPageContainer";
import { ArrivalsPageContainer } from "./ArrivalsPage/ArrivalsPageContainer";
import { AboutPageContainer } from "./AboutPage/AboutPageContainer";

class App extends React.Component {
	public render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Breakfast Club</h1>
				</header>
				<div className="container">
					<Router>
						<div>
							<Route
								exact
								path="/"
								component={IndexPageContainer}
							/>
							<Route
								path="/admin"
								component={AdminPageContainer}
							/>
							<Route
								path="/arrivals"
								component={ArrivalsPageContainer}
							/>
							<Route
								path="/about"
								component={AboutPageContainer}
							/>
						</div>
					</Router>
				</div>
			</div>
		);
	}
}

export default App;
