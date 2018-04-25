import * as React from 'react';
import { DeleteMemberButton } from './DeleteMemberButton';
import { IMember } from '../Models/Member';
import { MemberActiveToggle } from './MemberActiveToggle';
import { UpDownButtons } from './UpDownButtons';

interface IMemberTableRowProps {
    member: IMember;
    upAction: Function;
    downAction: Function;
    updateAction: Function;
    deleteAction: Function;
}

export class MemberTableRow extends React.Component<IMemberTableRowProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const member = this.props.member;
        const upAction = this.props.upAction;
        const downAction = this.props.downAction;
        const updateAction = this.props.updateAction;
        const deleteAction = this.props.deleteAction;
        return (
            <tr>
                <td>
                    <UpDownButtons upAction={upAction} downAction={downAction} memberId={member.id} />
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
                    <MemberActiveToggle member={member} updateAction={updateAction} />
                </td>
                <td>
                    <DeleteMemberButton memberId={member.id} deleteAction={deleteAction} />
                </td>
            </tr>
        );
    }
}