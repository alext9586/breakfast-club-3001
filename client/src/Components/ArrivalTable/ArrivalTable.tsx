import * as React from 'react';
import moment from 'moment';
import { IArrival } from '../../Models/Arrival';

interface IArrivalTableProps {
    arrivalLog: IArrival[];
}

interface IArrivalTableState {
    arrivalLog: IArrival[];
}

export class ArrivalTable extends React.Component<IArrivalTableProps, IArrivalTableState> {
    constructor(props: Readonly<IArrivalTableProps>) {
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
            let arrivalTime = moment(arrivalEntry.arrivalTime).format('lll');
            return (
                <tr key={arrivalEntry.id}>
                    <td>{arrivalTime}</td>
                    <td>{arrivalEntry.memberName}</td>
                    <td>{arrivalEntry.notes}</td>
                </tr>);
        });

        return (
            <table className="table">
                <thead>
                    <tr>
                        <td>Arrival Time</td>
                        <td>Name</td>
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