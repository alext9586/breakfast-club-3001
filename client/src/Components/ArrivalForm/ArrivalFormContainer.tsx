import * as React from 'react';
import { IMember } from 'src/Models/Member';

interface IArrivalFormContainerProps {
    member: IMember;
    formId: string;
}

interface IArrivalFormContainerStates {
    arrivalTime: Date;
    notes: string;
}

export class ArrivalFormContainer extends React.Component<IArrivalFormContainerProps, IArrivalFormContainerStates> {
    constructor(props: IArrivalFormContainerProps) {
        super(props);

        this.state = {
            arrivalTime: new Date(),
            notes: ""
        }
    }

    private handleNotesChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            arrivalTime: this.state.arrivalTime,
            notes: event.target.value
        });
    }

    render(): JSX.Element {
        const fullname = `${this.props.member.firstName} ${this.props.member.lastName}`;
        const handleNotesChange = this.handleNotesChange.bind(this);

        return (
            <form>
                <h1>{fullname}</h1>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <h2>Reserved</h2>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="form-group">
                            <label htmlFor="arrivalNotes">Notes</label>
                            <input type="text"
                                className="form-control"
                                name="arrivalNotes"
                                value={this.state.notes}
                                onChange={handleNotesChange} />
                        </div>
                    </div>
                </div>
                <div className="form-group text-right">
                    <button type="button" className="btn btn-outline-secondary">
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        );
    }
}