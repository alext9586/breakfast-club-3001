import * as React from 'react';
import { DeleteMemberButton } from './DeleteMemberButton';
import { IMember } from '../Models/Member';
import { MemberActiveToggle } from './MemberActiveToggle';

interface IMemberTableRowProps {
    member: IMember;
    updateAction: Function;
    deleteAction: Function;
}

export class MemberTableRow extends React.Component<IMemberTableRowProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const member = this.props.member;
        const updateAction = this.props.updateAction;
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
                    <MemberActiveToggle member={member} updateAction={updateAction} />
                </td>
                <td>
                    <DeleteMemberButton memberId={member.id} deleteAction={deleteAction} />
                </td>
            </tr>
        );
    }
}