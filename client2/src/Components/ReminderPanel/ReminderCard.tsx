import * as React from 'react';
import { CopyButton } from './CopyButton';

interface IReminderCardProps {
    cardId: string;
    title: string;
    panel: JSX.Element;
}

export class ReminderCard extends React.Component<IReminderCardProps, {}> {
    constructor(props: IReminderCardProps){
        super(props);
    }

    render() {
        const {cardId, title, panel} = this.props;
        return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title">{title}</h5>
                        <CopyButton elementId={cardId} />
                    </div>
                    <hr />
                    <div className="card-text" id={cardId}>
                        {panel}
                    </div>
                </div>
            </div>
        );
    }
}