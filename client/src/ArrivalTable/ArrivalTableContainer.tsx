import * as React from 'react';
import { HttpService } from '../Services/HttpService';
import { IArrival, Arrival, ArrivalConverter } from '../Models/Arrival';
import { ArrivalTable } from './ArrivalTable';
import { IRawArrival } from '../Models/RawViewModels';

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
        this.refresh();
    }

    componentWillUnmount() {
        // window.removeEventListener("refresh", () => this.refresh());
    }

    private refresh() {
        HttpService.getAllArrivals()
            .then((res: IRawArrival[]) => {
                let arrivalLog = res.map(arrival => ArrivalConverter.fromRawArrival(arrival));
                this.setState({
                    arrivalLog: arrivalLog
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="row">
                <ArrivalTable arrivalLog={this.state.arrivalLog} />
            </div>);
    }
}