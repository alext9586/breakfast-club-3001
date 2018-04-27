import * as React from 'react';
import { HttpService } from '../Services/HttpService';
import { IArrival, Arrival } from '../Models/Arrival';
import { ArrivalTable } from './ArrivalTable';

interface IArrivalTableContainerState {
    arrivalLog: IArrival[];
}

export class ArrivalTableContainer extends React.Component<{}, IArrivalTableContainerState> {
    constructor(props: any){
        super(props);

        this.state = {
            arrivalLog: []
        };
    }

    componentDidMount() {
        // window.addEventListener("refresh", () => this.refresh());
        // this.refresh();
    }

    componentWillUnmount() {
        // window.removeEventListener("refresh", () => this.refresh());
    }

    render() {
        return (<ArrivalTable arrivalLog={this.state.arrivalLog} />);
    }
}