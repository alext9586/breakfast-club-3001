import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    var listItems = this.state.response.map(function(item) {
      return (
        <tr key="{item.id}">
          <td>
            {item.firstname}
          </td>
          <td>
            {item.lastname}
          </td>
          <td>
            {item.slackusername}
          </td>
          <td>
            {item.isactive.toString()}
          </td>
        </tr>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <table>
          <tbody>
            {listItems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
