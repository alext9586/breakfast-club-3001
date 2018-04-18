import * as React from 'react';
import './App.css';
import { MemberTableContainer } from './MemberTable/MemberTableContainer';
import { AddMemberFormContainer } from './AddMemberForm/AddMemberFormContainer';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MemberTableContainer />
        <AddMemberFormContainer formId="addMemberForm" />
      </div>
    );
  }
}

export default App;