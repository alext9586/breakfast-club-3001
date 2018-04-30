import * as React from 'react';
import { MemberTable } from './MemberTable';
import { IMember, Member } from 'src/Models/Member';
import { IRawMember } from 'src/Models/RawViewModels';
import { HttpService } from 'src/Services/HttpService';
import { IMemberTableActions, MemberTableActions } from './MemberTableActions';
import { SaveMembersListButton } from './SaveMembersListButton';

interface IMemberTableContainerProps {
    membersList: IMember[];
}

interface IMemberTableContainerState {
    membersList: IMember[];
}

export class MemberTableContainer extends React.Component<IMemberTableContainerProps, IMemberTableContainerState> {
    constructor(props: any){
        super(props);

        this.state = {
            membersList: this.props.membersList
        };
    }

    static getDerivedStateFromProps(nextProps: IMemberTableContainerProps, prevState: IMemberTableContainerState) {
        if(nextProps.membersList !== prevState.membersList) {
            return {
                membersList: nextProps.membersList
            }
        }

        return null;
    }
    
    // Fire a global event notifying refresh of data
    private publishRefresh(): void {
        var event = document.createEvent("Event");
        event.initEvent("refresh", false, true); 
        window.dispatchEvent(event);
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
            this.publishRefresh();
        });
    }

    private memberUpAction(e: React.MouseEvent<HTMLButtonElement>, memberId: string): void {
        this.moveMember(memberId, (membersList: IMember[], foundMember: IMember, foundIndex) => {
            if(foundIndex === 0) {
                membersList.push(foundMember);
            } else {
                membersList.splice(foundIndex - 1, 0, foundMember);
            }
        });
    }

    private memberDownAction(e: React.MouseEvent<HTMLButtonElement>, memberId: string): void {
        this.moveMember(memberId, (membersList: IMember[], foundMember: IMember, foundIndex) => {
            if(foundIndex === membersList.length) {
                membersList.unshift(foundMember);
            } else {
                membersList.splice(foundIndex + 1, 0, foundMember);
            }
        });
    }

    private updateMemberAction(e: React.MouseEvent<HTMLButtonElement>, member: IMember): void {
        HttpService.updateMember(member).then(response => {
            console.log(response);
            this.publishRefresh();
        });
    }

    private toggleActiveAction(e: React.MouseEvent<HTMLButtonElement>, member: IMember): void {
        HttpService.changeActive(member).then(response => {
            console.log(response);
            this.publishRefresh();
        });
    }

    private deleteAction(e: React.MouseEvent<HTMLButtonElement>, memberId: string): void {
        HttpService.deleteMember(memberId).then(response => {
            console.log(response);
            this.publishRefresh();
        });
    }

    private addArrivalEntry(e: React.MouseEvent<HTMLButtonElement>, memberId: string): void {
        HttpService.addArrival(memberId).then(response => {
            console.log(response);
        });
    }

    render(): JSX.Element {
        const actions = MemberTableActions.create(
            this.memberUpAction.bind(this),
            this.memberDownAction.bind(this),
            this.toggleActiveAction.bind(this),
            this.updateMemberAction.bind(this),
            this.deleteAction.bind(this),
            this.addArrivalEntry.bind(this));

        return (
            <MemberTable
                        membersList={this.state.membersList}
                        actions={actions} />);
    }
}