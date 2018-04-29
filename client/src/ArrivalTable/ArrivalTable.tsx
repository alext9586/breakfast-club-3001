import * as React from 'react';
import { IArrival } from '../Models/Arrival';

interface IArrivalTableProps {
    arrivalLog: IArrival[];
}

interface IArrivalTableState {
    arrivalLog: IArrival[];
}

export class ArrivalTable extends React.Component<IArrivalTableProps, IArrivalTableState> {
    constructor(props) {
        super(props);
        this.state = {
            arrivalLog: props.arrivalLog
        };
    }

    static getDerivedStateFromProps(nextProps: IArrivalTableProps, prevState: IArrivalTableState) {
        if(nextProps.arrivalLog !== prevState.arrivalLog) {
            return {
                arrivalLog: nextProps.arrivalLog
            }
        }

        return null;
    }

    render() {
        const membersRows = this.state.arrivalLog.map((arrivalEntry) => {
            return (<tr key={arrivalEntry.id}>
                <td>{arrivalEntry.memberName}</td>
                <td>{arrivalEntry.arrivalTime}</td>
                <td>{arrivalEntry.notes}</td>
                </tr>);
        });

        return (
            <table className="table">
                <thead>
                    <tr>
                        <td>Person</td>
                        <td>Arrival Time</td>
                        <td>Notes</td>
                    </tr>
                </thead>
                <tbody>
                    {membersRows}
                </tbody>
            </table>
        );
    }
}