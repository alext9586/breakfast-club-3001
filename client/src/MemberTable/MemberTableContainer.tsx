import * as React from 'react';
import { MemberTable } from './MemberTable';
import { IMember, Member } from '../Models/Member';
import { IRawMember } from '../Models/RawViewModels';
import { MemberTableHttpService } from './MemberTableHttpService';

interface IMemberTableState {
    response: object;
    membersList: IMember[];
}

export class MemberTableContainer extends React.Component<{}, IMemberTableState> {
    constructor(props: any){
        super(props);

        this.state = {
            response: [],
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
        MemberTableHttpService.getAllMembers()
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
                    response: res,
                    membersList: membersList
                });
            })
            .catch(err => console.log(err));
    }

    private updateMemberAction(e: React.MouseEvent<HTMLButtonElement>, member: IMember) {
        MemberTableHttpService.updateMember(member).then(response => {
            console.log(response);
            this.refresh();
        });
    }

    private deleteAction(e: React.MouseEvent<HTMLButtonElement>, memberId: string) {
        MemberTableHttpService.deleteMember(memberId).then(response => {
            console.log(response);
            this.refresh();
        });
    }

    render() {
        return (<MemberTable
                    membersList={this.state.membersList}
                    updateAction={this.updateMemberAction.bind(this)}
                    deleteAction={this.deleteAction.bind(this)} />);
    }
}