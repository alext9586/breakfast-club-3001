import * as React from 'react';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ArrivalTable } from 'src/Components/ArrivalTable/ArrivalTable';
import { IArrival, ArrivalConverter } from 'src/Models/Arrival';
import { HttpService } from 'src/Services/HttpService';
import { IRawArrival, IRawSimpleMember } from 'src/Models/RawViewModels';
import { ISimpleMember, SimpleMemberConverter, SimpleMember } from '../../Models/SimpleMember';
import { ShowAllArrivalsButton } from '../ArrivalTable/ShowAllArrivalsButton';
import { ArrivalTableContainer } from '../ArrivalTable/ArrivalTableContainer';
import { RotationTable } from './RotationTable';
import { FridayService } from 'src/Services/FridayService';

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

        this.absentClick = this.absentClick.bind(this);
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
                .catch(err => console.error(err));
        }).catch(err => console.error(err));
    }

    private absentClick(member: ISimpleMember): void {
        const absentDate = member.isAbsent ? FridayService.getOutOfBoundsFriday() : moment();
        const updatedMember = new SimpleMember(member.id, member.fullname, member.rotationOrder, absentDate);

        const newMemberList = this.state.membersList.map(m => {
            if(m.id === member.id) {
                return updatedMember;
            } else {
                return m;
            }
        });

        this.setState({
            membersList: newMemberList,
            arrivalLog: this.state.arrivalLog
        });

        HttpService.setAbsent(updatedMember);
    }

    render(): JSX.Element {
        const numToFeed = this.state.membersList.filter(m => !m.isAbsent).length;
        const hasMembers = this.state.membersList.length > 0;
        const hasArrivalRecords = this.state.arrivalLog.length > 0;
        const arrivalLog = this.state.arrivalLog;

        return (
            <div className="row">
                <div className="col-12 text-right">
                    <a className="btn btn-secondary" href="/about">About</a>
                </div>
                <div className="col-md-4">
                    {numToFeed > 0
                        ? <h2>Rotation ({numToFeed} Mouths)</h2>
                        : <h2>Rotation</h2>
                    }
                    {hasMembers
                        ?   <RotationTable membersList={this.state.membersList} absentClick={this.absentClick} />
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