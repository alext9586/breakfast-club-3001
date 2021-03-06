import * as React from 'react';
import { IMember } from '../../Models/Member';
import { ReminderCard } from './ReminderCard';

interface IReminderPanelContainerProps {
    membersList: IMember[];
}

interface IReminderPanelContainerState {
    membersList: IMember[];
    displayState: State;
}

enum State {
    Show,
    Hide
}

export class ReminderPanelContainer extends React.Component<IReminderPanelContainerProps, IReminderPanelContainerState> {
    constructor(props: IReminderPanelContainerProps){
        super(props);

        this.state = {
            membersList: [],
            displayState: State.Hide
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
    
    private showAction(): void {
        this.setState({
           membersList: this.state.membersList,
           displayState: State.Show 
        });
    }

    private hideAction(): void {
        this.setState({
           membersList: this.state.membersList,
           displayState: State.Hide
        });
    }

    private getMemberReminderText(showMemberName: boolean): string {
        let reminder = "";

        if(this.state.membersList && this.state.membersList[0]) {
            const numMembers = this.state.membersList.length;
            const currentMember = this.state.membersList[0];
            const fullName = `${currentMember.firstName} ${currentMember.lastName}`;
            const whois = showMemberName ? `${fullName} is` : "You're";
            reminder = `${whois} up for Breakfast Club with ${numMembers} mouths to feed.`;
        }

        return reminder;
    }

    private renderMemberReminder(): JSX.Element {
        let reminder = "";
        if(this.state.membersList && this.state.membersList[0]) {
            let slackUsername = this.state.membersList[0].slackUsername;
            let reminderText = this.getMemberReminderText(false);
            reminder = `/remind @${slackUsername} "${reminderText}" next Thursday at noon`;
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

            rows.splice(0,0, (<div key="memberReminder">/remind @here "{this.getMemberReminderText(true)}</div>) );
            rows.push((<div key="reminderTime">" next Thursday at noon</div>))
        }

        let element = (<span>{rows}</span>);
        return (<ReminderCard cardId="channelReminder" title="Channel Reminder" panel={element} />);
    }

    render() {
        const showAction = this.showAction.bind(this);
        const hideAction = this.hideAction.bind(this);
        const displayState = this.state.displayState;

        return(
            <div>
                {displayState === State.Show
                    ?   <div>
                            <button type="button" className="btn btn-primary" onClick={hideAction}>
                                Hide Reminders
                            </button>
                            {this.renderMemberReminder()}
                            {this.renderChannelReminder()}
                        </div>
                    :   <button type="button" className="btn btn-primary" onClick={showAction}>
                            Show Reminders
                        </button>
                }
            </div>);
    }
}