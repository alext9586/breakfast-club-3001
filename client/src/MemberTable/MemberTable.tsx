import * as React from 'react';
import { MemberTableRow } from './MemberTableRow';
import { IMember } from '../Models/Member';

interface IMemberTableProps {
    membersList: IMember[];
}

interface IMemberTableState {
    membersList: IMember[];
}

export class MemberTable extends React.Component<IMemberTableProps, IMemberTableState> {
    constructor(props) {
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
        var membersRows = this.state.membersList.map(function(item: IMember) {
            return (<MemberTableRow key={item.id} member={item} />);
        });

        return (
            <table>
                <thead>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Slack Username</td>
                        <td>Is Active</td>
                    </tr>
                </thead>
                <tbody>
                    {membersRows}
                </tbody>
            </table>
        );
    }
}