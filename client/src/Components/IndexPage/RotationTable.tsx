import * as React from 'react';
import { ISimpleMember, SimpleMember } from 'src/Models/SimpleMember';
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
                            onClick={e => this.props.absentClick(member)}>
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