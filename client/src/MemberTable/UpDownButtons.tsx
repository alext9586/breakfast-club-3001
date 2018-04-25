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
            <div>
                <button type="button" onClick={(e) => this.props.upAction(e, this.props.memberId)}>
                    &uArr;
                </button>
                <button type="button" onClick={(e) => this.props.downAction(e, this.props.memberId)}>
                    &dArr;
                </button>
            </div>
        );
    }
}
