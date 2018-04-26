import * as React from 'react';
import { MemberTable } from './MemberTable';
import { IMember, Member } from '../Models/Member';
import { IRawMember } from '../Models/RawViewModels';
import { HttpService } from '../Services/HttpService';
import { RotateButton } from './RotateButton';
import { IMemberTableActions, MemberTableActions } from './MemberTableActions';
import { SaveMembersListButton } from './SaveMembersListButton';

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

    private sortByRotationOrder(a: IMember, b: IMember) {
        if (a.rotationOrder < b.rotationOrder) {
            return -1;
        }
        
        if (a.rotationOrder > b.rotationOrder) {
            return 1;
        }
        
        return 0;
    }

    private moveMember(memberId: string, reinsert: Function) {
        let membersList = this.state.membersList.map(i => i);
        membersList.sort(this.sortByRotationOrder);

        let foundMember = new Member();
        let foundIndex = -1;

        membersList.some((member, index) => {
            if(member.id === memberId) {
                foundMember = member;
                foundIndex = index;
                return true;
            }

            return false;
        });

        membersList.splice(foundIndex, 1);

        reinsert(membersList, foundMember, foundIndex);

        membersList.forEach((member, index) => {
            member.rotationOrder = index + 1;
        });

        membersList.sort(this.sortByRotationOrder);
        
        this.setState((prevState) => {
            return {
                response: prevState.response,
                membersList: membersList
            }
        });
    }

    private memberUpAction(e: React.MouseEvent<HTMLButtonElement>, memberId: string) {
        this.moveMember(memberId, (membersList: IMember[], foundMember: IMember, foundIndex) => {
            if(foundIndex === 0) {
                membersList.push(foundMember);
            } else {
                membersList.splice(foundIndex - 1, 0, foundMember);
            }
        });
    }

    private memberDownAction(e: React.MouseEvent<HTMLButtonElement>, memberId: string) {
        this.moveMember(memberId, (membersList: IMember[], foundMember: IMember, foundIndex) => {
            if(foundIndex === membersList.length) {
                membersList.unshift(foundMember);
            } else {
                membersList.splice(foundIndex + 1, 0, foundMember);
            }
        });
    }

    private saveAction(e: React.MouseEvent<HTMLButtonElement>) {
        HttpService.saveList(this.state.membersList).then(response => {
            console.log(response);
            this.refresh();
        });
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
                <SaveMembersListButton saveAction={this.saveAction.bind(this)} />
                <RotateButton rotateAction={this.rotateAction.bind(this)} />
                <MemberTable
                    membersList={this.state.membersList}
                    actions={actions} />
            </div>);
    }
}