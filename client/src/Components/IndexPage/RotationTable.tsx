import * as React from 'react';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ISimpleMember, SimpleMember } from 'src/Models/SimpleMember';
import { FridayService } from 'src/Services/FridayService';
import './RotationTable.css';

interface IRotationTableProps {
    membersList: ISimpleMember[];
    absentClick: Function;
}

interface IRotationTableState {
    membersList: ISimpleMember[];
}

export class RotationTable extends React.Component<IRotationTableProps, IRotationTableState> {
    constructor(props: IRotationTableProps) {
        super(props);

        this.state = {
            membersList: this.props.membersList
        };
    }

    static getDerivedStateFromProps(nextProps: IRotationTableProps, prevState: IRotationTableState) {
        if(nextProps.membersList !== prevState.membersList) {
            return {
                membersList: nextProps.membersList
            }
        }

        return null;
    }

    private absentClick(member: ISimpleMember): void {
        const absentDate = member.isAbsent ? FridayService.getOutOfBoundsFriday() : moment();
        const updatedMember = new SimpleMember(member.id, member.fullname, member.rotationOrder, absentDate);

        const newMemberList = this.state.membersList.map(m => {
            if(m.id === member.id) {
                return updatedMember;
            } else {
                return m;
            }
        });

        this.setState({membersList: newMemberList});
        this.props.absentClick(updatedMember);
    }

    render(): JSX.Element {
        const membersList = this.state.membersList;
        const rows = membersList.map(member => {
            const buttonClassName = `btn btn-sm ${member.isAbsent ? "btn-success" : "btn-default"}`;
            return (
                <tr key={member.id}>
                    <td>{member.rotationOrder}</td>
                    <td className={member.isAbsent ? "member-absent" : ""}>
                        {member.fullname}
                    </td>
                    <td>
                        <button
                            className={buttonClassName}
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