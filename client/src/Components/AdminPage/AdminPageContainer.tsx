import * as React from 'react';
import { ReminderPanelContainer } from '../ReminderPanel/ReminderPanelContainer';
import { MemberTableContainer } from '../MemberTable/MemberTableContainer';
import { MemberFormContainer } from '../MemberForm/MemberFormContainer';
import { Member, IMember } from '../../Models/Member';
import { HttpService } from '../../Services/HttpService';
import { IRawMember, IArrivalSend, IRawArrival } from '../../Models/RawViewModels';
import { AdminMenuBar } from './AdminMenuBar';
import { ArrivalFormContainer } from '../ArrivalForm/ArrivalFormContainer';
import { IArrival, ArrivalConverter } from '../../Models/Arrival';
import { ArrivalTableContainer } from '../ArrivalTable/ArrivalTableContainer';

interface IAdminPageContainerState {
    activeMember: IMember;
    displayState: State;
    membersList: IMember[];
    arrivalLog: IArrival[];
}

enum State {
    DisplayMembers,
    AddMember,
    EditMember,
    MemberArrival
}

export class AdminPageContainer extends React.Component<{}, IAdminPageContainerState> {
    constructor(props: any) {
        super(props);        
        this.state = {
            activeMember: new Member(),
            displayState: State.DisplayMembers,
            membersList: [],
            arrivalLog: []
        };

        this.refresh = this.refresh.bind(this);
        this.rotateAction = this.rotateAction.bind(this);
        
        this.showAddMemberFormAction = this.showAddMemberFormAction.bind(this);
        this.showEditMemberFormAction = this.showEditMemberFormAction.bind(this);
        this.showMemberArrivalFormAction = this.showMemberArrivalFormAction.bind(this);

        this.addArrivalAction = this.addArrivalAction.bind(this);
        this.closeFormAction = this.closeFormAction.bind(this);
    }

    componentDidMount() {
        window.addEventListener("refresh", () => this.refresh());
        this.refresh();
    }

    componentWillUnmount() {
        window.removeEventListener("refresh", () => this.refresh());
    }

    private refresh() {
        const arrivalCall = (callback: Function) => {
            HttpService.getLastTenArrivals()
                .then((res: IRawArrival[]) => {
                    let arrivalLog = res.map(arrival => ArrivalConverter.fromRawArrival(arrival));
                    callback(arrivalLog);
                });
        };

        HttpService.getAllMembers()
            .then((res: IRawMember[]) => {
                var membersList = res.map(member => {
                    return new Member(
                        member.id,
                        member.firstname,
                        member.lastname,
                        member.slackusername,
                        member.rotationorder,
                        member.isactive);
                });

                arrivalCall((arrivals: IArrival[])=>{
                    this.setState({
                        activeMember: new Member(),
                        displayState: State.DisplayMembers,
                        membersList: membersList,
                        arrivalLog: arrivals
                    });
                });
            })
            .catch(err => console.error(err));
    }

    private showAddMemberFormAction(): void {
        this.setState({
            activeMember: new Member(),
            displayState: State.AddMember,
            membersList: this.state.membersList,
            arrivalLog: this.state.arrivalLog
        });
    }

    private showEditMemberFormAction(member: IMember): void {
        this.setState({
            activeMember: member,
            displayState: State.EditMember,
            membersList: this.state.membersList,
            arrivalLog: this.state.arrivalLog
        });
    }

    private showMemberArrivalFormAction(): void {
        this.setState({
            activeMember: this.state.activeMember,
            displayState: State.MemberArrival,
            membersList: this.state.membersList,
            arrivalLog: this.state.arrivalLog
        });
    }

    private closeFormAction(): void {
        this.setState({
            activeMember: new Member(),
            displayState: State.DisplayMembers,
            membersList: this.state.membersList,
            arrivalLog: this.state.arrivalLog
        });
    }

    private addMemberSubmitAction(member: IMember): void {
        HttpService.addMember(member).then(() => {
            this.refresh();
        });
    }

    private editMemberSubmitAction(member: IMember): void {
        HttpService.updateMember(member).then(() => {
            this.refresh();
        });
    }

    private addArrivalAction(arrival: IArrivalSend): void {        
        HttpService.addArrival(arrival).then(response => {
            this.rotateAction();
        });
    }

    private rotateAction(): void {
        HttpService.rotate().then(response => {
            this.refresh();
        });
    }

    render(): JSX.Element {
        const {activeMember, displayState, membersList, arrivalLog} = this.state;
                
        const hasMembers = membersList.length > 0;
        const canRotate = membersList.length > 1;

        const showMemberTable = displayState === State.DisplayMembers;
        const showArrivalForm = displayState === State.MemberArrival;
        const showMemberForm = (displayState === State.AddMember || displayState === State.EditMember);
        
        const memberFormSubmitAction = displayState === State.AddMember
            ? this.addMemberSubmitAction.bind(this)
            : this.editMemberSubmitAction.bind(this);

        const currentMember = hasMembers ? membersList[0] : new Member();

        return (
            <div>
                {showMemberForm || showArrivalForm
                    ?   <button type="button" className="btn btn-secondary" onClick={this.closeFormAction}>
                            Back
                        </button>
                    :   <div>
                            <a className="btn btn-secondary" href="/">Home</a>
                            <h1>Admin Page</h1>
                        </div>
                }
                {showMemberForm
                    ?   <div>
                            <h1>Add Member</h1>
                            <MemberFormContainer
                                formId="showMemberFormForm"
                                member={activeMember}
                                submitAction={memberFormSubmitAction}
                                cancelAction={this.closeFormAction} />
                        </div>
                    : null
                }
                {showMemberTable
                    ? <div>
                        <AdminMenuBar
                            canRotate={canRotate}
                            rotateAction={this.rotateAction}
                            addMemberAction={this.showAddMemberFormAction} />
                        {hasMembers
                            ?   <div>
                                    <ReminderPanelContainer membersList={membersList} />
                                    <h3>Members</h3>
                                    <MemberTableContainer
                                        membersList={membersList}
                                        arrivalAction={this.showMemberArrivalFormAction}
                                        editMemberAction={this.showEditMemberFormAction}
                                        refreshAction={this.refresh} />
                                    <h3>Arrivals</h3>
                                    <ArrivalTableContainer arrivalLog={arrivalLog} />
                                </div>
                            :   <div>
                                    <h2>There are no members.</h2>
                                    <p>Please add members</p>
                                </div>
                        }
                        </div>
                    : null
                }
                {showArrivalForm
                    ? <ArrivalFormContainer
                        formId="arrivalForm"
                        member={currentMember}
                        cancelAction={this.closeFormAction}
                        saveAction={this.addArrivalAction} />
                    : null
                }                
            </div>
        );
    }
}