import * as React from 'react';
import { IMember } from '../Models/Member';

interface IReminderPanelContainerProps {
    membersList: IMember[];
}

interface IReminderPanelContainerState {
    membersList: IMember[];
}

export class ReminderPanelContainer extends React.Component<IReminderPanelContainerProps, IReminderPanelContainerState> {
    constructor(props: any){
        super(props);

        this.state = {
            membersList: []
        };
    }

    static getDerivedStateFromProps(nextProps: IReminderPanelContainerProps, prevState: IReminderPanelContainerState) {
        if(nextProps.membersList !== prevState.membersList) {
            return {
                membersList: nextProps.membersList
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

    private renderCard(title: string, panel: JSX.Element) {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <div className="card-text">
                        {panel}
                    </div>
                </div>
            </div>
        );
    }

    private renderMemberReminder(): JSX.Element {
        let reminder = "";
        if(this.state.membersList && this.state.membersList[0]) {
            let slackUsername = this.state.membersList[0].slackUsername;
            let reminderText = this.getMemberReminderText();
            reminder = `\\remind @${slackUsername} "${reminderText}" next Thursday at noon`;
        }

        let element = (<span>{reminder}</span>);
        return this.renderCard("Member Reminder", element);
    }

    private renderChannelReminder(): JSX.Element {
        let rows = [<div key="dummy"></div>];
        
        if(this.state.membersList && this.state.membersList[0]) {
            rows = this.state.membersList.map(member => {
                return (<div key={member.id}>{member.slackUsername}</div>);
            });

            rows.splice(0,0, (<div key="memberReminder">\remind @here "{this.getMemberReminderText()}</div>) );
            rows.push((<div key="reminderTime">" next Thursday at noon</div>))
        }

        let element = (<span>{rows}</span>);
        return this.renderCard("Channel Reminder", element);
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