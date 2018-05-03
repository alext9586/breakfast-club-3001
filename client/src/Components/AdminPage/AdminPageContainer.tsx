import * as React from 'react';
import { ReminderPanelContainer } from '../ReminderPanel/ReminderPanelContainer';
import { MemberTableContainer } from 'src/Components/MemberTable/MemberTableContainer';
import { MemberFormContainer } from 'src/Components/MemberForm/MemberFormContainer';
import { Member, IMember } from 'src/Models/Member';
import { HttpService } from 'src/Services/HttpService';
import { IRawMember, IArrivalSend, IRawArrival } from 'src/Models/RawViewModels';
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

                arrivalCall((arrivals)=>{
                    this.setState({
                        activeMember: new Member(),
                        displayState: State.DisplayMembers,
                        membersList: membersList,
                        arrivalLog: arrivals
                    });
                });
            })
            .catch(err => console.log(err));
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
            console.log(response);
            this.refresh();
        });
    }

    render(): JSX.Element {
        const {activeMember, displayState, membersList, arrivalLog} = this.state;
        const rotateAction = this.rotateAction.bind(this);
        
        const showAddMemberFormAction = this.showAddMemberFormAction.bind(this);
        const showEditMemberFormAction = this.showEditMemberFormAction.bind(this);
        const showMemberArrivalFormAction = this.showMemberArrivalFormAction.bind(this);

        const addArrivalAction = this.addArrivalAction.bind(this);
        const closeFormAction = this.closeFormAction.bind(this);
        
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
                <a className="btn btn-secondary" href="/">Home</a>
                <h1>Admin Page</h1>
                {hasMembers
                    ? <ReminderPanelContainer membersList={membersList} />
                    : null
                }
                {showMemberForm
                    ? <MemberFormContainer
                        formId="showMemberFormForm"
                        member={activeMember}
                        submitAction={memberFormSubmitAction}
                        cancelAction={closeFormAction} />
                    : null
                }
                {showMemberTable
                    ? <div>
                        <AdminMenuBar
                            canRotate={canRotate}
                            rotateAction={rotateAction}
                            addMemberAction={showAddMemberFormAction} />
                        {hasMembers
                            ?   <div>
                                    <h3>Members</h3>
                                    <MemberTableContainer
                                        membersList={membersList}
                                        arrivalAction={showMemberArrivalFormAction}
                                        editMemberAction={showEditMemberFormAction} />
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
                        cancelAction={closeFormAction}
                        saveAction={addArrivalAction} />
                    : null
                }                
            </div>
        );
    }
}