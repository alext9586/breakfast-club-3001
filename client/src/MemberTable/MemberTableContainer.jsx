import React, { Component } from 'react';
import MemberTable from './MemberTable';

class MemberTableContainer extends Component {
    state = {
        response: []
    };

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({ response: res });
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
        return (<MemberTable membersList={this.state.response} />);
    }
}

export default MemberTableContainer;