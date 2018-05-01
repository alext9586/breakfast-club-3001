import * as React from 'react';
import { ArrivalTable } from './ArrivalTable';
import { IArrival, ArrivalConverter } from 'src/Models/Arrival';
import { HttpService } from 'src/Services/HttpService';
import { IRawArrival } from 'src/Models/RawViewModels';

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

    private refresh(): void {
        HttpService.getAllArrivals()
            .then((res: IRawArrival[]) => {
                let arrivalLog = res.map(arrival => ArrivalConverter.fromRawArrival(arrival));
                this.setState({
                    arrivalLog: arrivalLog
                });
            })
            .catch(err => console.log(err));
    }

    render(): JSX.Element {
        const hasRecords = this.state.arrivalLog.length > 0;

        return (
            <div>
                {hasRecords
                    ? <ArrivalTable arrivalLog={this.state.arrivalLog} />
                    :   <div>
                            <h2>There are no arrivals.</h2>
                        </div>
                }
            </div>);
    }
}