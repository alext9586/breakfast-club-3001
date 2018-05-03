import * as React from 'react';
import { ArrivalTable } from 'src/Components/ArrivalTable/ArrivalTable';
import { IArrival, ArrivalConverter } from 'src/Models/Arrival';
import { HttpService } from 'src/Services/HttpService';
import { IRawArrival, IRawSimpleMember } from 'src/Models/RawViewModels';
import { ISimpleMember, SimpleMemberConverter } from '../../Models/SimpleMember';
import { ShowAllArrivalsButton } from '../ArrivalTable/ShowAllArrivalsButton';
import { ArrivalTableContainer } from '../ArrivalTable/ArrivalTableContainer';

interface IIndexPageContainerState {
    membersList: ISimpleMember[];
    arrivalLog: IArrival[];
}

export class IndexPageContainer extends React.Component<{}, IIndexPageContainerState> {
    constructor(props: any){
        super(props);

        this.state = {
            membersList: [],
            arrivalLog: []
        };
    }

    componentDidMount() {
        this.refresh();
    }

    componentWillUnmount() {
    }

    private refresh(): void {
        HttpService.getAllSimpleMembers().then((rawSimpleMembers: IRawSimpleMember[])=>{
            let membersList = rawSimpleMembers.map(member => SimpleMemberConverter.fromRawMember(member));

            HttpService.getLastTenArrivals()
                .then((res: IRawArrival[]) => {
                    let arrivalLog = res.map(arrival => ArrivalConverter.fromRawArrival(arrival));
                    this.setState({
                        membersList: membersList,
                        arrivalLog: arrivalLog
                    });
                })
                .catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    private renderMembersTable(): JSX.Element {
        const membersList = this.state.membersList;
        const rows = membersList.map(member => {
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
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    render(): JSX.Element {
        const hasMembers = this.state.membersList.length > 0;
        const hasArrivalRecords = this.state.arrivalLog.length > 0;
        const arrivalLog = this.state.arrivalLog;

        return (
            <div className="row">
                <div className="col-12 text-right">
                    <a className="btn btn-secondary" href="/about">About</a>
                </div>
                <div className="col-md-4">
                    <h2>Rotation</h2>
                    {hasMembers
                        ?   this.renderMembersTable()
                        :   <div>
                                <h2>There are no members.</h2>
                            </div>
                    }
                </div>
                <div className="col-md-8">
                    <h2>Arrivals</h2>
                    {hasArrivalRecords
                        ? <ArrivalTableContainer arrivalLog={arrivalLog} />
                        :   <div>
                                <h2>There are no arrivals.</h2>
                            </div>
                    }
                </div>
            </div>);
    }
}