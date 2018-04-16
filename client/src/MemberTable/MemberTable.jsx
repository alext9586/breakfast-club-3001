import React, { Component } from 'react';
import MemberTableRow from './MemberTableRow';

class MemberTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            membersList: props.membersList
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.membersList !== prevState.membersList) {
            return {
                membersList: nextProps.membersList
            }
        }

        return null;
    }

    render() {
        var membersRows = this.state.membersList.map(function(item) {
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

export default MemberTable;