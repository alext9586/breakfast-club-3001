import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import logo from "./toast.png";
import { AdminPageContainer } from "./AdminPage/AdminPageContainer";
import IndexPageContainer from "./IndexPage/IndexPageContainer";
import { ArrivalsPageContainer } from "./ArrivalsPage/ArrivalsPageContainer";
import { AboutPageContainer } from "./AboutPage/AboutPageContainer";
import { viewMain } from "../Actions";
import { connect } from "react-redux";
import { AppState } from "../Store";
import { ISimpleMember, SimpleMemberConverter } from "../Models/SimpleMember";
import { IArrival, ArrivalConverter } from "../Models/Arrival";
import { HttpService } from "../Services/HttpService";
import { IRawSimpleMember, IRawArrival } from "../Models/RawViewModels";

interface IAppProps {
	membersList: ISimpleMember[];
	arrivalLog: IArrival[];
	viewMain: typeof viewMain;
}

class App extends Component<IAppProps> {
	componentDidMount() {
		this.refresh();
	}

	private refresh(): void {
		Promise.all([this.getAllSimpleMembers(), this.getLastTenArrivals()])
			.then(([membersList, arrivalLog]) => {
				this.props.viewMain(membersList, arrivalLog);
			})
			.catch(err => console.error(err));
	}

	private getAllSimpleMembers(): Promise<ISimpleMember[]> {
		return HttpService.getAllSimpleMembers().then(
			(rawSimpleMembers: IRawSimpleMember[]) => {
				return rawSimpleMembers.map(member =>
					SimpleMemberConverter.fromRawMember(member)
				);
			}
		);
	}

	private getLastTenArrivals(): Promise<IArrival[]> {
		return HttpService.getLastTenArrivals().then((res: IRawArrival[]) => {
			return res.map(arrival => ArrivalConverter.fromRawArrival(arrival));
		});
	}

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

const mapStateToProps = (state: AppState) => ({
	membersList: state.membersList,
	arrivalLog: state.arrivalLog
});

export default connect(
	mapStateToProps,
	{ viewMain }
)(App);
