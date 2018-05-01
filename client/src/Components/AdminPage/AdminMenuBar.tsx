import * as React from 'react';

interface IAdminMenuBarProps {
    rotateAction: Function;
    addMemberAction: Function;
}

export class AdminMenuBar extends React.Component<IAdminMenuBarProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-primary" onClick={e => this.props.rotateAction()}>
                        Rotate
                    </button>
                    <button type="button" className="btn btn-primary" onClick={e =>  this.props.addMemberAction()}>
                        Add Member
                    </button>
                </div>
            </div>
        );
    }
}
