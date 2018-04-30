import * as React from 'react';
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

    render(): JSX.Element {
        const {activeMember, membersList} = this.state;

        return (
            <div>
                <MemberTableContainer
                    membersList={membersList} />
                <MemberFormContainer
                    formId="addMemberForm"
                    member={activeMember} />
            </div>
        );
    }
}