import * as React from 'react';
import { RotateButton } from './RotateButton';
import { ReminderPanelContainer } from '../ReminderPanel/ReminderPanelContainer';
import { MemberTableContainer } from 'src/Components/MemberTable/MemberTableContainer';
import { MemberFormContainer } from 'src/Components/MemberForm/MemberFormContainer';
import { Member, IMember } from 'src/Models/Member';
import { HttpService } from 'src/Services/HttpService';
import { IRawMember } from 'src/Models/RawViewModels';

interface IAdminPageContainerState {
    activeMember: IMember;
    membersList: IMember[];
}

export class AdminPageContainer extends React.Component<{}, IAdminPageContainerState> {
    constructor(props: any) {
        super(props);        
        this.state = {
            activeMember: new Member(),
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
                    membersList: membersList
                });
            })
            .catch(err => console.log(err));
    }

    private editMemberAction(member: IMember): void {
        const newState = {
            activeMember: member,
            membersList: this.state.membersList
        };

        this.setState(newState);

        console.log("member:", member);
        console.log(JSON.stringify(this.state.activeMember, null, "  "));
    }

    private rotateAction(): void {
        HttpService.rotate().then(response => {
            console.log(response);
            this.refresh();
        });
    }

    render(): JSX.Element {
        const {activeMember, membersList} = this.state;
        const rotateAction = this.rotateAction.bind(this);
        const editMemberAction = this.editMemberAction.bind(this);

        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <RotateButton rotateAction={rotateAction} />
                    </div>
                    <div className="col-md-10">
                        <ReminderPanelContainer membersList={membersList} />
                    </div>
                </div>
                <MemberTableContainer
                        membersList={membersList}
                        editMemberAction={editMemberAction} />
                <MemberFormContainer
                    formId="addMemberForm"
                    member={activeMember} />
            </div>
        );
    }
}