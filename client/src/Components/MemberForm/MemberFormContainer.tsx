import * as React from 'react';
import { IMemberFormValues, IMember, Member } from 'src/Models/Member';
import { MemberForm } from './MemberForm';
import { HttpService } from 'src/Services/HttpService';

interface IMemberFormContainerProps {
    formId: string;
    member: IMember;
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

    // Fire a global event notifying refresh of data
    private publishRefresh(): void {
        var event = document.createEvent("Event");
        event.initEvent("refresh", false, true); 
        window.dispatchEvent(event);
    }

    private addMember(value: IMemberFormValues): void {
        HttpService.addMember(value).then(() => {
            this.publishRefresh();
        });
    }

    private cancelAction(): void {
        // do nothing
    }

    render(): JSX.Element {
        const {formId, member} = this.props;

        return (
            <div className="row">
                <div className="col">
                    <MemberForm
                        formId={formId}
                        member={member}
                        submitAction={this.addMember.bind(this)}
                        cancelAction={this.cancelAction.bind(this)} />
                </div>
            </div>
        );
    }
}
