import * as React from 'react';

interface ISaveMembersListButton {
    saveAction: Function;
}

export class SaveMembersListButton extends React.Component<ISaveMembersListButton, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" onClick={(e) => this.props.saveAction(e)}>
                Save
            </button>
        );
    }
}
