import * as React from 'react';
import { MemberTable } from './MemberTable';
import { IMember, Member } from 'src/Models/Member';
import { IRawMember } from 'src/Models/RawViewModels';
import { HttpService } from 'src/Services/HttpService';
import { IMemberTableActions, MemberTableActions } from './MemberTableActions';
import { SaveMembersListButton } from './SaveMembersListButton';

interface IMemberTableContainerProps {
    membersList: IMember[];
    editMemberAction: Function;
    arrivalAction: Function;
    refreshAction: Function;
}

interface IMemberTableContainerState {
    membersList: IMember[];
}

export class MemberTableContainer extends React.Component<IMemberTableContainerProps, IMemberTableContainerState> {
    private actions: IMemberTableActions;

    constructor(props: any){
        super(props);

        this.state = {
            membersList: this.props.membersList
        };

        this.actions = MemberTableActions.create(
            this.memberUpAction.bind(this),
            this.memberDownAction.bind(this),
            this.toggleActiveAction.bind(this),
            this.editMemberAction.bind(this),
            this.updateMemberAction.bind(this),
            this.deleteAction.bind(this),
            this.addArrivalEntry.bind(this));
    }

    static getDerivedStateFromProps(nextProps: IMemberTableContainerProps, prevState: IMemberTableContainerState): IMemberTableContainerState | null {
        if(nextProps.membersList !== prevState.membersList) {
            return {
                membersList: nextProps.membersList
            }
        }

        return null;
    }
    
    private sortByRotationOrder(a: IMember, b: IMember): number {
        if (a.rotationOrder < b.rotationOrder) {
            return -1;
        }
        
        if (a.rotationOrder > b.rotationOrder) {
            return 1;
        }
        
        return 0;
    }

    private moveMember(memberId: string, reinsert: Function): void {
        let membersList = this.state.membersList.filter(i => i.isActive);
        membersList.sort(this.sortByRotationOrder);

        let foundMember: IMember = new Member();
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
            this.props.refreshAction();
        });
    }

    private memberUpAction(memberId: string): void {
        this.moveMember(memberId, (membersList: IMember[], foundMember: IMember, foundIndex) => {
            if(foundIndex === 0) {
                membersList.push(foundMember);
            } else {
                membersList.splice(foundIndex - 1, 0, foundMember);
            }
        });
    }

    private memberDownAction(memberId: string): void {
        this.moveMember(memberId, (membersList: IMember[], foundMember: IMember, foundIndex) => {
            if(foundIndex === membersList.length) {
                membersList.unshift(foundMember);
            } else {
                membersList.splice(foundIndex + 1, 0, foundMember);
            }
        });
    }

    private editMemberAction(member: IMember): void {
        this.props.editMemberAction(member);
    }

    private updateMemberAction(member: IMember): void {
        HttpService.updateMember(member).then(response => {
            this.props.refreshAction();
        });
    }

    private toggleActiveAction(member: IMember): void {
        HttpService.changeActive(member).then(response => {
            this.props.refreshAction();
        });
    }

    private deleteAction(memberId: string): void {
        HttpService.deleteMember(memberId).then(response => {
            this.props.refreshAction();
        });
    }

    private addArrivalEntry(): void {
        this.props.arrivalAction();
    }

    render(): JSX.Element {
        return (
            <MemberTable
                        membersList={this.state.membersList}
                        actions={this.actions} />);
    }
}