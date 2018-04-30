import * as React from 'react';
import { IMember } from 'src/Models/Member';
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

    private renderEditButton(actions: IMemberTableActions, member: IMember): JSX.Element {
        return (
            <button type="button" className="btn btn-warning btn-sm" onClick={e => actions.editMember(member)}>
                <i className="fas fa-pencil-alt"></i>
            </button>
        );
    }

    private renderRemoveButton(actions: IMemberTableActions, member: IMember): JSX.Element {
        return (
            <button type="button"
                className="btn btn-danger btn-sm"
                onClick={(e) => actions.deleteMember(member.id)}>
                Remove
            </button>
        );
    }

    private renderAddButton(actions: IMemberTableActions, member: IMember): JSX.Element | null {
        if(member.rotationOrder === 1) {
            return (
                <button type="button"
                    className="btn btn-primary btn-sm"
                    onClick={e => actions.addArrivalEntry(member.id)}>Mark as Arrived</button>);
        } else {
            return null;
        }
    }

    render(): JSX.Element {
        const {member, actions} = this.props;

        return (
            <tr>
                <td>
                    {member.rotationOrder > 0
                        ? <UpDownButtons upAction={actions.memberUp} downAction={actions.memberDown} memberId={member.id} />
                        : null}
                </td>
                <td>
                    {member.rotationOrder}
                </td>
                <td>
                    {member.firstName} {member.lastName}
                </td>
                <td>
                    {member.slackUsername}
                </td>
                <td>
                    <MemberActiveToggle member={member} toggleAction={actions.toggleActive} />
                </td>
                <td>
                    { this.renderEditButton(actions, member) }
                    { this.renderRemoveButton(actions, member) }
                    { this.renderAddButton(actions, member) }
                </td>
            </tr>
        );
    }
}