import * as React from 'react';
import { MemberTable } from './MemberTable';
import { IMember, Member } from '../Models/Member';
import { IRawMember } from '../Models/RawViewModels';

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
        window.addEventListener("refresh", () => this.refresh());
        this.refresh();
    }

    componentWillUnmount() {
        window.removeEventListener("refresh", () => this.refresh());
    }

    private refresh() {
        this.callApi()
            .then((res: IRawMember[]) => {
                var membersList = res.map(member => {
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

    private async callApi() {
        const response = await fetch('/api/members/all');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    }

    render() {
        return (<MemberTable membersList={this.state.membersList} />);
    }
}