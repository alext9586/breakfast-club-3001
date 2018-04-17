import * as React from 'react';
import { DeleteMemberButton } from './DeleteMemberButton';
import { IMember } from '../Models/Member';

interface IMemberTableRowProps {
    member: IMember;
}

interface IMemberTableRowState {
    member: IMember;
}

export class MemberTableRow extends React.Component<IMemberTableRowProps, IMemberTableRowState> {
    constructor(props) {
        super(props);
        
        this.state = {
            member: props.member
        };
    }

    render() {
        const member = this.state.member;
        return (
            <tr>
                <td>
                    {member.firstName}
                </td>
                <td>
                    {member.lastName}
                </td>
                <td>
                    {member.slackUsername}
                </td>
                <td>
                    {member.isActive.toString()}
                </td>
                <td>
                    <DeleteMemberButton memberId={member.id} />
                </td>
            </tr>
        );
    }
}