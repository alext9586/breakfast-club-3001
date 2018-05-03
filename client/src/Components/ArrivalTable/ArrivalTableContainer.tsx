import * as React from 'react';
import { ArrivalTable } from '../ArrivalTable/ArrivalTable';
import { ShowAllArrivalsButton } from '../ArrivalTable/ShowAllArrivalsButton';
import { IArrival } from '../../Models/Arrival';

interface IArrivalTableContainerProps {
    arrivalLog: IArrival[];
}

export class ArrivalTableContainer extends React.Component<IArrivalTableContainerProps, {}> {
    constructor(props: IArrivalTableContainerProps) {
        super(props);
    }

    render(): JSX.Element {
        const arrivalLog = this.props.arrivalLog;
        const showButton = arrivalLog.length === 10;

        return (
            <div>
                <ArrivalTable arrivalLog={arrivalLog} />
                {showButton ? <ShowAllArrivalsButton /> : null}
            </div>
        );
    }
}