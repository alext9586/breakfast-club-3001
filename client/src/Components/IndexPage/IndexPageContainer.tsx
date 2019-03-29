import * as React from "react";
import { connect } from "react-redux";
import { ArrivalConverter, IArrival } from "../../Models/Arrival";
import { HttpService } from "../../Services/HttpService";
import { IRawArrival, IRawSimpleMember } from "../../Models/RawViewModels";
import {
	ISimpleMember,
	SimpleMemberConverter
} from "../../Models/SimpleMember";
import ArrivalTableContainer from "../ArrivalTable/ArrivalTableContainer";
import { AppState } from "../../Store";
import { viewMain } from "../../Actions";
import { Stages } from "../../Stages";

interface IndexPageContainerProps {
	stage: Stages;
	membersList: ISimpleMember[];
	arrivalLog: IArrival[];
	viewMain: typeof viewMain;
}

class IndexPageContainer extends React.Component<IndexPageContainerProps> {
	componentDidMount() {
		this.refresh();
	}

	private refresh(): void {
		HttpService.getAllSimpleMembers()
			.then((rawSimpleMembers: IRawSimpleMember[]) => {
				let membersList = rawSimpleMembers.map(member =>
					SimpleMemberConverter.fromRawMember(member)
				);

				HttpService.getLastTenArrivals()
					.then((res: IRawArrival[]) => {
						let arrivalLog = res.map(arrival =>
							ArrivalConverter.fromRawArrival(arrival)
						);

						this.props.viewMain(membersList, arrivalLog);
					})
					.catch(err => console.error(err));
			})
			.catch(err => console.error(err));
	}

	private renderMembersTable(): JSX.Element {
		const membersList = this.props.membersList;
		const rows = membersList.map((member: ISimpleMember) => {
			return (
				<tr key={member.id}>
					<td>{member.rotationOrder}</td>
					<td>{member.fullname}</td>
				</tr>
			);
		});

		return (
			<table className="table">
				<thead>
					<tr>
						<td>Order</td>
						<td>Name</td>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}

	render(): JSX.Element {
		const { stage, membersList, arrivalLog } = this.props;

		const hasMembers =
			stage === Stages.Loading ? false : membersList.length > 0;
		const hasArrivalRecords =
			stage === Stages.Loading ? false : arrivalLog.length > 0;

		return (
			<div className="row">
				<div className="col-12 text-right">
					<a className="btn btn-secondary" href="/about">
						About
					</a>
				</div>
				<div className="col-md-4">
					<h2>Rotation</h2>
					{hasMembers ? (
						this.renderMembersTable()
					) : (
						<div>
							<h2>There are no members.</h2>
						</div>
					)}
				</div>
				<div className="col-md-8">
					<h2>Arrivals</h2>
					{hasArrivalRecords ? (
						<ArrivalTableContainer />
					) : (
						<div>
							<h2>There are no arrivals.</h2>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	stage: state.stage,
	membersList: state.membersList,
	arrivalLog: state.arrivalLog
});

export default connect(
	mapStateToProps,
	{ viewMain }
)(IndexPageContainer);
