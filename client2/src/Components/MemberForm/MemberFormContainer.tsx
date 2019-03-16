import * as React from 'react';
import { IMember, Member } from '../../Models/Member';
import { MemberForm } from './MemberForm';

interface IMemberFormContainerProps {
    formId: string;
    member: IMember;
    submitAction: Function;
    cancelAction: Function;
}

interface IMemberFormContainerState {
    member: IMember;
}

export class MemberFormContainer extends React.Component<IMemberFormContainerProps, IMemberFormContainerState> {
    constructor(props: IMemberFormContainerProps) {
        super(props);
        this.state = {
            member: this.props.member
        };
    }

    static getDerivedStateFromProps(nextProps: IMemberFormContainerProps, prevState: IMemberFormContainerState): IMemberFormContainerState | null {
        if(nextProps.member !== prevState.member) {
            return {
                member: nextProps.member
            }
        }

        return null;
    }

    render(): JSX.Element {
        const {formId, member, submitAction, cancelAction} = this.props;

        return (
            <div className="row">
                <div className="col">
                    <MemberForm
                        formId={formId}
                        member={member}
                        submitAction={submitAction}
                        cancelAction={cancelAction} />
                </div>
            </div>
        );
    }
}
