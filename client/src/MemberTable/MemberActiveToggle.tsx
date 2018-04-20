import * as React from 'react';
import { IMember, Member } from '../Models/Member';

interface IMemberActiveToggleProps {
    member: IMember;
    updateAction: Function;
}

interface IMemberActiveToggleState {
    isActive: boolean;
}

export class MemberActiveToggle extends React.Component<IMemberActiveToggleProps, IMemberActiveToggleState> {
    constructor(props) {
        super(props);

        this.state = {
            isActive: this.props.member.isActive
        };

        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    private handleCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.checked;
        const updatedMember = new Member(
            this.props.member.id,
            this.props.member.firstName,
            this.props.member.lastName,
            this.props.member.slackUsername,
            value
        );
        
        this.props.updateAction(event, updatedMember);
        this.setState({ isActive: value });
    }

    render() {
        var elementId = `${this.props.member.id}_IsActive`;
        return (
            <input type="checkbox"
                id={elementId}
                name={elementId}
                checked={this.state.isActive}
                onChange={this.handleCheckChange} />
        );
    }
}
