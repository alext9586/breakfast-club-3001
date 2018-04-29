import * as React from 'react';
import { MemberTable } from './MemberTable';
import { IMember, Member } from 'src/Models/Member';
import { IRawMember } from 'src/Models/RawViewModels';
import { HttpService } from 'src/Services/HttpService';
import { RotateButton } from './RotateButton';
import { IMemberTableActions, MemberTableActions } from './MemberTableActions';
import { SaveMembersListButton } from './SaveMembersListButton';
import { ReminderPanelContainer } from '../ReminderPanel/ReminderPanelContainer';

interface IMemberTableContainerState {
    response: object;
    membersList: IMember[];
}

export class MemberTableContainer extends React.Component<{}, IMemberTableContainerState> {
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

        HttpService.saveList(membersList).then(response => {
            console.log(response);
            this.refresh();
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

    private addArrivalEntry(e: React.MouseEvent<HTMLButtonElement>, memberId: string) {
        HttpService.addArrival(memberId).then(response => {
            console.log(response);
        });
    }

    render() {
        const actions = MemberTableActions.create(
            this.memberUpAction.bind(this),
            this.memberDownAction.bind(this),
            this.updateMemberAction.bind(this),
            this.deleteAction.bind(this),
            this.addArrivalEntry.bind(this));

        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <RotateButton rotateAction={this.rotateAction.bind(this)} />
                    </div>
                    <div className="col-md-10">
                        <ReminderPanelContainer membersList={this.state.membersList} />
                    </div>
                </div>
                <div className="row">
                    <MemberTable
                        membersList={this.state.membersList}
                        actions={actions} />
                </div>
            </div>);
    }
}