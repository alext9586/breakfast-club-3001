import * as React from 'react';
import { MemberTable } from './MemberTable';
import { IMember, Member } from '../Models/Member';

interface IMemberTableState {
    response: object;
    membersList: IMember[];
}

export class MemberTableContainer extends React.Component<{}, IMemberTableState> {
    constructor(props: any){
        super(props);
        this.state = {
            response: [],
            membersList: []
        };
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                var membersList = res.map((member: any) => {
                    return new Member(
                        member.id,
                        member.firstname,
                        member.lastname,
                        member.slackusername,
                        member.isactive);
                });
                this.setState({
                    response: res,
                    membersList: membersList
                });
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/members/all');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return (<MemberTable membersList={this.state.membersList} />);
    }
}