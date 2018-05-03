import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { IMember } from 'src/Models/Member';
import { Arrival } from 'src/Models/Arrival';
import { IArrivalSend } from 'src/Models/RawViewModels';

import 'react-datepicker/dist/react-datepicker.css';
import './ArrivalForm.css';
import { Moment } from 'moment';

interface IArrivalFormContainerProps {
    member: IMember;
    formId: string;
    saveAction: Function;
    cancelAction: Function;
}

interface IArrivalFormContainerStates {
    arrivalTime: Moment;
    notes: string;
}

export class ArrivalFormContainer extends React.Component<IArrivalFormContainerProps, IArrivalFormContainerStates> {
    constructor(props: IArrivalFormContainerProps) {
        super(props);

        this.state = {
            arrivalTime: moment(),
            notes: ""
        }

        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.saveAction = this.saveAction.bind(this);
    }

    private handleTimeChange(date: Moment): void {
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

    private saveAction(): void {
        const data: IArrivalSend = {
            memberId: this.props.member.id,
            arrivalTime: this.state.arrivalTime.toDate(),
            notes: this.state.notes
        };

        this.props.saveAction(data);
    }

    private renderDatePicker(): JSX.Element {
        return (
            <div className="form-group">
                <label>Arrival Time</label>
                <div>
                    <DatePicker
                        selected={this.state.arrivalTime}
                        onChange={this.handleTimeChange}
                        inline
                        showTimeSelect
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="Time"
                        />
                </div>
            </div>
        );
    }

    private renderNotes(): JSX.Element {
        return (
            <div className="form-group">
                <label htmlFor="arrivalNotes">Notes</label>
                <input type="text"
                    className="form-control"
                    name="arrivalNotes"
                    value={this.state.notes}
                    onChange={this.handleNotesChange} />
            </div>
        );
    }

    render(): JSX.Element {
        const {cancelAction} = this.props;
        const fullname = `${this.props.member.firstName} ${this.props.member.lastName}`;

        return (
            <form>
                <h1>Member Arrival</h1>
                <h2>{fullname}</h2>
                <div className="row">
                    <div className="col-lg-5">
                        { this.renderDatePicker() }
                    </div>
                    <div className="col-lg-7">
                        { this.renderNotes() }
                        <div className="form-group text-right">
                            <button type="button" className="btn btn-outline-secondary" onClick={e => cancelAction()}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={this.saveAction}>
                                Save and Rotate
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}