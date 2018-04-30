import * as React from 'react';

interface IRotateButtonProps {
    rotateAction: Function;
}

export class RotateButton extends React.Component<IRotateButtonProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" className="btn btn-primary" onClick={e => this.props.rotateAction()}>
                Rotate
            </button>
        );
    }
}
