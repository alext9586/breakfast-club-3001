import * as React from 'react';
import { DeleteMemberButton } from './DeleteMemberButton';
import { IMember } from '../Models/Member';

interface IMemberTableRowProps {
    member: IMember;
    deleteAction: Function;
}

export class MemberTableRow extends React.Component<IMemberTableRowProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const member = this.props.member;
        const deleteAction = this.props.deleteAction;
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
                    <DeleteMemberButton memberId={member.id} deleteAction={deleteAction} />
                </td>
            </tr>
        );
    }
}