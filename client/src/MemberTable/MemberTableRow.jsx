import React, { Component } from 'react';
import DeleteMemberButton from './DeleteMemberButton';

class MemberTableRow extends Component {
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
                    {member.firstname}
                </td>
                <td>
                    {member.lastname}
                </td>
                <td>
                    {member.slackusername}
                </td>
                <td>
                    {member.isactive.toString()}
                </td>
                <td>
                    <DeleteMemberButton memberId={member.id} />
                </td>
            </tr>
        );
    }
}

export default MemberTableRow;