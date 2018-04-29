import * as React from 'react';
import { IMember } from 'src/Models/Member';
import { ReminderCard } from './ReminderCard';

interface IReminderPanelContainerProps {
    membersList: IMember[];
}

interface IReminderPanelContainerState {
    membersList: IMember[];
}

export class ReminderPanelContainer extends React.Component<IReminderPanelContainerProps, IReminderPanelContainerState> {
    constructor(props: IReminderPanelContainerProps){
        super(props);

        this.state = {
            membersList: []
        };
    }

    static getDerivedStateFromProps(nextProps: IReminderPanelContainerProps, prevState: IReminderPanelContainerState) {
        if(nextProps.membersList !== prevState.membersList) {
            return {
                membersList: nextProps.membersList.filter(member => member.isActive)
            }
        }

        return null;
    }

    private getMemberReminderText(): string {
        let reminder = "";

        if(this.state.membersList && this.state.membersList[0]) {
            const numMembers = this.setState.length;
            const currentMember = this.state.membersList[0];
            const fullName = `${currentMember.firstName} ${currentMember.lastName}`;
            reminder = `${fullName} is up for Breakfast Club with ${numMembers} mouths to feed.`;
        }

        return reminder;
    }

    private renderMemberReminder(): JSX.Element {
        let reminder = "";
        if(this.state.membersList && this.state.membersList[0]) {
            let slackUsername = this.state.membersList[0].slackUsername;
            let reminderText = this.getMemberReminderText();
            reminder = `\\remind @${slackUsername} "${reminderText}" next Thursday at noon`;
        }

        let element = (<span>{reminder}</span>);
        return (<ReminderCard cardId="memberReminder" title="Member Reminder" panel={element} />);
    }

    private renderChannelReminder(): JSX.Element {
        let rows = [<div key="dummy"></div>];
        
        if(this.state.membersList && this.state.membersList[0]) {
            rows = this.state.membersList.map(member => {
                return (<div key={member.id}>{member.firstName} {member.lastName}</div>);
            });

            rows.splice(0,0, (<div key="memberReminder">\remind @here "{this.getMemberReminderText()}</div>) );
            rows.push((<div key="reminderTime">" next Thursday at noon</div>))
        }

        let element = (<span>{rows}</span>);
        return (<ReminderCard cardId="channelReminder" title="Channel Reminder" panel={element} />);
    }

    render() {
        return(
            <div className="row">
                <div className="col">
                    {this.renderMemberReminder()}
                    {this.renderChannelReminder()}
                </div>
            </div>);
    }
}