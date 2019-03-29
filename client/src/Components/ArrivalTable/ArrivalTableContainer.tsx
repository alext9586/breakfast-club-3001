import React, { Component } from "react";
import { ArrivalTable } from "../ArrivalTable/ArrivalTable";
import { ShowAllArrivalsButton } from "../ArrivalTable/ShowAllArrivalsButton";
import { IArrival } from "../../Models/Arrival";
import { connect } from "react-redux";
import { AppState } from "../../Store";

interface IArrivalTableContainerProps {
	arrivalLog: IArrival[];
}

class ArrivalTableContainer extends Component<IArrivalTableContainerProps> {
	render(): JSX.Element {
		const arrivalLog = this.props.arrivalLog;
		const showButton = arrivalLog.length >= 10;

		return (
			<div>
				<ArrivalTable arrivalLog={arrivalLog} />
				{showButton ? <ShowAllArrivalsButton /> : null}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	arrivalLog: state.arrivalLog
});

export default connect(mapStateToProps)(ArrivalTableContainer);
