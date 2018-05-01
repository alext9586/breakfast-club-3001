import * as React from 'react';
import { ReminderPanelContainer } from '../ReminderPanel/ReminderPanelContainer';
import { MemberTableContainer } from 'src/Components/MemberTable/MemberTableContainer';
import { MemberFormContainer } from 'src/Components/MemberForm/MemberFormContainer';
import { Member, IMember, IMemberFormValues } from 'src/Models/Member';
import { HttpService } from 'src/Services/HttpService';
import { IRawMember } from 'src/Models/RawViewModels';
import { AdminMenuBar } from './AdminMenuBar';

interface IAdminPageContainerState {
    activeMember: IMember;
    displayState: State;
    membersList: IMember[];
}

enum State {
    DisplayMembers,
    AddMember,
    EditMember
}

export class AdminPageContainer extends React.Component<{}, IAdminPageContainerState> {
    constructor(props: any) {
        super(props);        
        this.state = {
            activeMember: new Member(),
            displayState: State.DisplayMembers,
            membersList: []
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
                this.setState({
                    activeMember: new Member(),
                    displayState: State.DisplayMembers,
                    membersList: membersList
                });
            })
            .catch(err => console.log(err));
    }

    private showAddMemberFormAction(): void {
        this.setState({
            activeMember: new Member(),
            displayState: State.AddMember,
            membersList: this.state.membersList
        });
    }

    private showEditMemberFormAction(member: IMember): void {
        this.setState({
            activeMember: member,
            displayState: State.EditMember,
            membersList: this.state.membersList
        });
    }

    private closeMemberFormAction(): void {
        this.setState({
            activeMember: new Member(),
            displayState: State.DisplayMembers,
            membersList: this.state.membersList
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

    private rotateAction(): void {
        HttpService.rotate().then(response => {
            console.log(response);
            this.refresh();
        });
    }

    render(): JSX.Element {
        const {activeMember, displayState, membersList} = this.state;
        const rotateAction = this.rotateAction.bind(this);
        
        const showAddMemberFormAction = this.showAddMemberFormAction.bind(this);
        const showEditMemberFormAction = this.showEditMemberFormAction.bind(this);
        const closeMemberFormAction = this.closeMemberFormAction.bind(this);
        
        const showMemberForm = (displayState === State.AddMember || displayState === State.EditMember);
        const memberFormSubmitAction = displayState === State.AddMember
            ? this.addMemberSubmitAction.bind(this)
            : this.editMemberSubmitAction.bind(this);

        return (
            <div>
                <ReminderPanelContainer membersList={membersList} />
                <AdminMenuBar rotateAction={rotateAction}
                    addMemberAction={showAddMemberFormAction} />                
                {showMemberForm
                    ? <MemberFormContainer
                        formId="showMemberFormForm"
                        member={activeMember}
                        submitAction={memberFormSubmitAction}
                        cancelAction={closeMemberFormAction} />
                    : <MemberTableContainer
                        membersList={membersList}
                        editMemberAction={showEditMemberFormAction} />
                }
                
            </div>
        );
    }
}