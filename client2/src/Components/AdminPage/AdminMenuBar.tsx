import * as React from 'react';

interface IAdminMenuBarProps {
    canRotate: boolean;
    rotateAction: Function;
    addMemberAction: Function;
}

export class AdminMenuBar extends React.Component<IAdminMenuBarProps, {}> {
    constructor(props: Readonly<IAdminMenuBarProps>) {
        super(props);
    }

    private renderRotateButton(): JSX.Element | null {
        return (this.props.canRotate
            ? <button type="button" className="btn btn-primary" onClick={e => this.props.rotateAction()}>
                    Rotate
                </button>
            : null
        );
    }

    render(): JSX.Element {
        return (
            <div className="row">
                <div className="col">
                    {this.renderRotateButton()}
                    <button type="button" className="btn btn-primary" onClick={e =>  this.props.addMemberAction()}>
                        Add Member
                    </button>
                </div>
            </div>
        );
    }
}
