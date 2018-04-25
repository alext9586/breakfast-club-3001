import * as React from 'react';
import { DeleteMemberButton } from './DeleteMemberButton';
import { IMember } from '../Models/Member';
import { MemberActiveToggle } from './MemberActiveToggle';
import { UpDownButtons } from './UpDownButtons';
import { IMemberTableActions } from './MemberTableActions';

interface IMemberTableRowProps {
    member: IMember;
    actions: IMemberTableActions;
}

export class MemberTableRow extends React.Component<IMemberTableRowProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const member = this.props.member;
        const actions = this.props.actions;
        return (
            <tr>
                <td>
                    <UpDownButtons upAction={actions.memberUp} downAction={actions.memberDown} memberId={member.id} />
                </td>
                <td>
                    {member.rotationOrder}
                </td>
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
                    <MemberActiveToggle member={member} updateAction={actions.updateMember} />
                </td>
                <td>
                    <DeleteMemberButton memberId={member.id} deleteAction={actions.deleteMember} />
                </td>
            </tr>
        );
    }
}