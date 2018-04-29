import * as React from 'react';
import './App.css';
import { MemberTableContainer } from './MemberTable/MemberTableContainer';
import { AddMemberFormContainer } from './AddMemberForm/AddMemberFormContainer';

import logo from './logo.svg';
import { ArrivalTableContainer } from './ArrivalTable/ArrivalTableContainer';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <ArrivalTableContainer />
          <MemberTableContainer />
          <AddMemberFormContainer formId="addMemberForm" />
        </div>
      </div>
    );
  }
}

export default App;
