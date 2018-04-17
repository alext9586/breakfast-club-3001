import React, { Component } from 'react';

class MemberTableRow extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            member: props.member
        };

        this.removeClick = this.removeClick.bind(this);
    }

    deleteMember = async (userId) => {
        var data = {
            userId: userId
        };
        
        const response = await fetch('/api/users/delete', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    removeClick(e, userId) {
        this.deleteMember(userId).then(response => {console.log(response)});
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
                    <button type="button" onClick={(e) => this.removeClick(e, member.id)}>
                        Remove
                    </button>
                </td>
            </tr>
        );
    }
}

export default MemberTableRow;