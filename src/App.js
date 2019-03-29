import React, { Component } from 'react';
import './scss/App.scss';
import ExpressionGraph2 from './components/ExpressionGraph2';
import { Provider } from "mobx-react";
import DataStore from './stores/DataStore';
import LandingPage from './components/LandingPage';

class App extends Component {

  state = {
    data: [
      { year: '2000', womenRate: 25 },
      { year: '2001', womenRate: 35 },
      { year: '2002', womenRate: 45 },
      { year: '2003', womenRate: 55 },
      { year: '2004', womenRate: 35 },
    ]
  }

  render() {
    return (
      <Provider DataStore={DataStore}>
        <div className="app-container">
          <LandingPage></LandingPage>
        </div>
      </Provider>
    );
  }
}

export default App;
