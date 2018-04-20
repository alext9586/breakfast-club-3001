import * as React from 'react';

interface IDeleteMemberButtonProps {
    memberId: string;
    deleteAction: Function;
}

export class DeleteMemberButton extends React.Component<IDeleteMemberButtonProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" onClick={(e) => this.props.deleteAction(e, this.props.memberId)}>
                Remove
            </button>
        );
    }
}
