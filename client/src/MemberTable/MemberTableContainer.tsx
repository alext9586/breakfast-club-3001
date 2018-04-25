import * as React from 'react';
import { MemberTable } from './MemberTable';
import { IMember, Member } from '../Models/Member';
import { IRawMember } from '../Models/RawViewModels';
import { HttpService } from '../Services/HttpService';
import { RotateButton } from './RotateButton';
import { IMemberTableActions, MemberTableActions } from './MemberTableActions';

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
                    response: res,
                    membersList: membersList
                });
            })
            .catch(err => console.log(err));
    }

    private memberUpAction(e: React.MouseEvent<HTMLButtonElement>, memberId: string) {
        console.info("Up Pressed", memberId);
    }

    private memberDownAction(e: React.MouseEvent<HTMLButtonElement>, memberId: string) {
        console.info("Down Pressed", memberId);
    }

    private updateMemberAction(e: React.MouseEvent<HTMLButtonElement>, member: IMember) {
        HttpService.updateMember(member).then(response => {
            console.log(response);
            this.refresh();
        });
    }

    private deleteAction(e: React.MouseEvent<HTMLButtonElement>, memberId: string) {
        HttpService.deleteMember(memberId).then(response => {
            console.log(response);
            this.refresh();
        });
    }

    private rotateAction(e: React.MouseEvent<HTMLButtonElement>, memberId: string) {
        HttpService.rotate().then(response => {
            console.log(response);
            this.refresh();
        });
    }

    render() {
        const actions = MemberTableActions.create(
            this.memberUpAction.bind(this),
            this.memberDownAction.bind(this),
            this.updateMemberAction.bind(this),
            this.deleteAction.bind(this));

        return (
            <div>
                <RotateButton rotateAction={this.rotateAction.bind(this)} />
                <MemberTable
                    membersList={this.state.membersList}
                    actions={actions} />
            </div>);
    }
}