import * as React from 'react';

interface IUpDownButtonsProps {
    memberId: string;
    upAction: Function;
    downAction: Function;
}

export class UpDownButtons extends React.Component<IUpDownButtonsProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="btn-group" role="group" aria-label="Member Position">
                <button type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => this.props.upAction(e, this.props.memberId)}>
                    <i className="fas fa-arrow-up"></i>
                </button>
                <button type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => this.props.downAction(e, this.props.memberId)}>
                    <i className="fas fa-arrow-down"></i>
                </button>
            </div>
        );
    }
}
