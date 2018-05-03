import * as React from 'react';
import { ArrivalTable } from 'src/Components/ArrivalTable/ArrivalTable';
import { IArrival, ArrivalConverter } from 'src/Models/Arrival';
import { HttpService } from 'src/Services/HttpService';
import { IRawArrival } from 'src/Models/RawViewModels';

interface IArrivalsPageContainerState {
    arrivalLog: IArrival[];
}

export class ArrivalsPageContainer extends React.Component<{}, IArrivalsPageContainerState> {
    constructor(props: any) {
        super(props);

        this.state = {
            arrivalLog: []
        };
    }

    componentDidMount() {
        this.refresh();
    }

    componentWillUnmount() {
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
        const hasArrivalRecords = this.state.arrivalLog.length > 0;

        return (
            <div>
                <a className="btn btn-secondary" href="/">Home</a>
                <h2>All Arrivals</h2>
                {hasArrivalRecords
                    ? <ArrivalTable arrivalLog={this.state.arrivalLog} />
                    :   <div>
                            <h2>There are no arrivals.</h2>
                        </div>
                }
            </div>);
    }
}