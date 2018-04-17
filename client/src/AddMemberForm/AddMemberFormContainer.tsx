import * as React from 'react';
import { Form, Text } from 'react-form';
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

    // validate = value => ({
    //     error: !value || !/Hello World/.test(value) ? "Input must contain 'Hello World'" : null,
    //     warning: !value || !/^Hello World$/.test(value) ? "Input should equal just 'Hello World'" : null,
    //     success: value && /Hello World/.test(value) ? "Thanks for entering 'Hello World'!" : null
    // });

    private addMember = async (formValues: any) => {        
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
    };

    render() {
        return (
            <Form onSubmit={submittedValues => this.addMember(submittedValues).then(response => {console.log(response)})}>
            {formApi => (
                <form onSubmit={formApi.submitForm} id={this.state.formId}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <Text field="firstName" id="firstName" />
                    </div>
                    
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <Text field="lastName" id="lastName" />
                    </div>
                    
                    <div>
                        <label htmlFor="slackUsername">Slack Username</label>
                        <Text field="slackUsername" id="slackUsername" />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>

                    <div>{JSON.stringify(formApi.values, null, "\r\n")}</div>
                </form>
            )}
            </Form>
        );
    }
}
