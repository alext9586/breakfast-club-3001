import * as React from 'react';
import { Form, Text, FormFunctionProps } from 'react-form';
import { IMember, Member } from 'src/Models/Member';

interface IMemberFormProps {
    formId: string;
    member: IMember;
    submitAction: Function;
    cancelAction: Function;
}

interface IMemberFormState {
    member: IMember;
}

export class MemberForm extends React.Component<IMemberFormProps, IMemberFormState> {
    constructor(props: IMemberFormProps) {
        super(props);
        this.state = {
            member: props.member
        }        
    }

    static getDerivedStateFromProps(nextProps: IMemberFormProps, prevState: IMemberFormState): IMemberFormState | null {
        if(nextProps.member !== prevState.member) {
            return {
                member: nextProps.member
            }
        }

        return null;
    }

    private formSubmit(e: React.FormEvent<HTMLButtonElement>, formApi: FormFunctionProps): void {
        formApi.submitForm(e);
        const formValues = formApi.values;        
        const newMember = this.props.member;
        newMember.firstName = formValues.firstName;
        newMember.lastName = formValues.lastName;
        newMember.slackUsername = formValues.slackUsername;

        this.props.submitAction(newMember);
        formApi.resetAll();
    }

    private cancelClick(e: React.MouseEvent<HTMLButtonElement>, formApi: FormFunctionProps): void {
        formApi.resetAll();
        this.props.cancelAction();
    }

    render(): JSX.Element {
        const {formId} = this.props;
        const {member} = this.state;

        const defaultValues = {
            firstName: member.firstName,
            lastName: member.lastName,
            slackUsername: member.slackUsername
        };

        return (
            <Form defaultValues={defaultValues}>
                {formApi => (
                    <form id={formId}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName">First Name</label>
                                <Text field="firstName" id="firstName" className="form-control" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName">Last Name</label>
                                <Text field="lastName" id="lastName" className="form-control" />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="slackUsername">Slack Username</label>
                            <Text field="slackUsername" id="slackUsername" className="form-control" />
                        </div>

                        <div className="form-group text-right">
                            <button type="button" className="btn btn-outline-secondary" onClick={(e)=>{ this.cancelClick(e, formApi) }}>
                                Canel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={(e)=>{ this.formSubmit(e, formApi) }}>
                                Save
                            </button>
                        </div>
                    </form>
                )}
                </Form>
        );
    }
}