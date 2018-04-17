import React, { Component } from 'react';

class DeleteMemberButton extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            memberId: props.memberId
        };

        this.removeClick = this.removeClick.bind(this);
    }

    deleteMember = async (memberId) => {
        var data = {
            memberId: memberId
        };
        
        const response = await fetch('/api/members/delete', {
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

    removeClick(e, memberId) {
        this.deleteMember(memberId).then(response => {console.log(response)});
    }

    render() {
        return (
            <button type="button" onClick={(e) => this.removeClick(e, this.state.memberId)}>
                Remove
            </button>
        );
    }
}

export default DeleteMemberButton;