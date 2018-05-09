import * as React from 'react';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ISimpleMember, SimpleMember } from 'src/Models/SimpleMember';
import './RotationTable.css';

interface IRotationTableProps {
    membersList: ISimpleMember[];
}

export class RotationTable extends React.Component<IRotationTableProps, IRotationTableProps> {
    constructor(props: IRotationTableProps) {
        super(props);

        this.state = props;
    }

    private getUpcomingFriday(): Moment {
        const friday = 5;

        const resetTime = (fridayDate: Moment) => {
            return fridayDate.set({hour: 12, minute: 0, second: 0, millisecond: 0});
        }

        if(moment().isoWeekday() <= friday) {
            return resetTime(moment().isoWeekday(friday));
        } else {
            return resetTime(moment().add(1, 'weeks').isoWeekday(5));
        }
    }

    private absentClick(member: ISimpleMember): void {
        const friday = this.getUpcomingFriday();
        console.log(friday);

        const newMemberList = this.state.membersList.map(m => {
            if(m.id === member.id) {
                return new SimpleMember(member.id, member.fullname, member.rotationOrder, !member.isAbsent);
            } else {
                return m;
            }
        });

        this.setState({membersList: newMemberList});
    }

    render(): JSX.Element {
        const membersList = this.state.membersList;
        const rows = membersList.map(member => {
            return (
                <tr key={member.id}>
                    <td>{member.rotationOrder}</td>
                    <td className={member.isAbsent ? "member-absent" : ""}>
                        {member.fullname}
                    </td>
                    <td>
                        <button
                            className="btn btn-default btn-sm"
                            onClick={e => this.absentClick(member)}>
                            Out
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <table className="table">
                <thead>
                    <tr>
                        <td>Order</td>
                        <td>Name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}