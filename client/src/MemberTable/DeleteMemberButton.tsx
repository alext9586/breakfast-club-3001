import * as React from 'react';

interface IDeleteMemberButtonProps {
    memberId: string;
}

interface IDeleteMemberButtonState {
    memberId: string;
}

export class DeleteMemberButton extends React.Component<IDeleteMemberButtonProps, IDeleteMemberButtonState> {
    constructor(props) {
        super(props);
        
        this.state = {
            memberId: props.memberId
        };

        this.removeClick = this.removeClick.bind(this);
    }

    // Fire a global event notifying refresh of data
    private publishRefresh() {
        var event = document.createEvent("Event");
        event.initEvent("refresh", false, true); 
        window.dispatchEvent(event);
    }

    private async deleteMember(memberId: string) {
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
    }

    private removeClick(e: React.MouseEvent<HTMLButtonElement>, memberId: string) {
        this.deleteMember(memberId).then(response => { console.log(response); this.publishRefresh(); });
    }

    render() {
        return (
            <button type="button" onClick={(e) => this.removeClick(e, this.state.memberId)}>
                Remove
            </button>
        );
    }
}
