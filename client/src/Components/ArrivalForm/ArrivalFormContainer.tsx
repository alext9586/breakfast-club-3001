import * as React from 'react';
import DateTimePicker from 'react-datetime-picker';
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
    private formStyle = {
        height: "500px"
    };

    constructor(props: IArrivalFormContainerProps) {
        super(props);

        this.state = {
            arrivalTime: new Date(),
            notes: ""
        }
    }

    private handleTimeChange(date: Date): void {
        this.setState({
            arrivalTime: date,
            notes: this.state.notes
        });
    }

    private handleNotesChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            arrivalTime: this.state.arrivalTime,
            notes: event.target.value
        });
    }

    render(): JSX.Element {
        const fullname = `${this.props.member.firstName} ${this.props.member.lastName}`;
        const handleTimeChange = this.handleTimeChange.bind(this);
        const handleNotesChange = this.handleNotesChange.bind(this);

        return (
            <form style={this.formStyle}>
                <h1>{fullname}</h1>
                <div className="form-group">
                    <label>Arrival Time</label>
                    <div>
                        <DateTimePicker
                            onChange={handleTimeChange}
                            value={this.state.arrivalTime} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-group">
                        <label htmlFor="arrivalNotes">Notes</label>
                        <input type="text"
                            className="form-control"
                            name="arrivalNotes"
                            value={this.state.notes}
                            onChange={handleNotesChange} />
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