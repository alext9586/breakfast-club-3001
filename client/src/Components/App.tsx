import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import logo from './logo.svg';
import { AdminPageContainer } from './AdminPage/AdminPageContainer';
import { IndexPageContainer } from './IndexPage/IndexPageContainer';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Breakfast Club</h1>
        </header>
        <div className="container">
          <Router>
            <div>
              <Route exact path="/" component={IndexPageContainer} />
              <Route path="/admin" component={AdminPageContainer} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
