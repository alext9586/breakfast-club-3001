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

    private formSubmit(e: React.FormEvent<HTMLFormElement>, formApi: FormFunctionProps): void {
        formApi.submitForm(e);
        this.props.submitAction(formApi.values);
        formApi.resetAll();
    }

    private cancelClick(e: React.MouseEvent<HTMLButtonElement>, formApi: FormFunctionProps): void {
        formApi.resetAll();
        this.props.cancelAction();
    }

    render(): JSX.Element {
        const {formId, member} = this.props;

        return (
            <Form>
                {formApi => (
                    <form onSubmit={(e)=>{ this.formSubmit(e, formApi) }} id={formId}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName">First Name</label>
                                <Text field="firstName" id="firstName" className="form-control" value={member.firstName} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName">Last Name</label>
                                <Text field="lastName" id="lastName" className="form-control" value={member.lastName} />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="slackUsername">Slack Username</label>
                            <Text field="slackUsername" id="slackUsername" className="form-control" value={member.slackUsername} />
                        </div>

                        <div className="form-group text-right">
                            <button type="button" className="btn btn-outline-secondary" onClick={(e)=>{ this.cancelClick(e, formApi) }}>
                                Canel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                )}
                </Form>
        );
    }
}