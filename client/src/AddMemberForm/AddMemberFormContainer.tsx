import * as React from 'react';
import { Form, Text, FormFunctionProps } from 'react-form';
import { Member } from '../Models/Member';

interface IAddMemberFormContainerProps {
    formId: string;
}

interface IAddMemberFormContainerState {
    formId: string;
}

export class AddMemberFormContainer extends React.Component<IAddMemberFormContainerProps, IAddMemberFormContainerState> {
    constructor(props: IAddMemberFormContainerProps) {
        super(props);
        this.state = {
            formId: props.formId
        };
    }

    // Fire a global event notifying refresh of data
    private publishRefresh() {
        var event = document.createEvent("Event");
        event.initEvent("refresh", false, true); 
        window.dispatchEvent(event);
    }

    private async addMember(formValues: any) {        
        const response = await fetch('/api/members/add', {
            body: JSON.stringify(new Member(
                "",
                formValues.firstName,
                formValues.lastName,
                formValues.slackUsername
            )),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST'
        });

        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        };

        return body;
    }

    private formSubmit(e: React.FormEvent<HTMLFormElement>, formApi: FormFunctionProps) {
        formApi.submitForm(e);
        this.addMember(formApi.values).then(response => {
            console.log(response);
            this.publishRefresh();
            formApi.resetAll();
        });
    }

    private renderForm() {
        return (
            <Form>
                {formApi => (
                    <form onSubmit={(e)=>{ this.formSubmit(e, formApi) }} id={this.state.formId}>
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

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                )}
                </Form>
        );
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}
