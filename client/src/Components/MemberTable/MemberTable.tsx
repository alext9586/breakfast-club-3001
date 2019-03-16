import * as React from 'react';
import { MemberTableRow } from './MemberTableRow';
import { IMember } from '../../Models/Member';
import { IMemberTableActions } from './MemberTableActions';

interface IMemberTableProps {
    membersList: IMember[];
    actions: IMemberTableActions;
}

interface IMemberTableState {
    membersList: IMember[];
}

export class MemberTable extends React.Component<IMemberTableProps, IMemberTableState> {
    constructor(props: Readonly<IMemberTableProps>) {
        super(props);
        this.state = {
            membersList: props.membersList
        };
    }

    static getDerivedStateFromProps(nextProps: IMemberTableProps, prevState: IMemberTableState) {
        if(nextProps.membersList !== prevState.membersList) {
            return {
                membersList: nextProps.membersList
            }
        }

        return null;
    }

    render() {
        const membersRows = this.state.membersList.map(item => {
            return (<MemberTableRow
                key={item.id}
                member={item}
                actions={this.props.actions} />);
        });

        return (
            <table className="table">
                <thead>
                    <tr>
                        <td></td>
                        <td>Order</td>
                        <td>Name</td>
                        <td>Slack Username</td>
                        <td>Edit</td>
                        <td>Active</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {membersRows}
                </tbody>
            </table>
        );
    }
}