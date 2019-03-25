import React, { Component } from 'react';
import './scss/App.scss';
import ExpressionGraph2 from './components/ExpressionGraph2';

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
      <div className="app-container">
        <ExpressionGraph2 data={this.state.data} previousData={this.state.previousData}></ExpressionGraph2>
        <button onClick={this.changeData}>Random data</button>
        <button onClick={this.addData}>Add data</button>
        <button onClick={this.removeData}>Remove data</button>
      </div>
    );
  }

  changeData = () => {
    const newData = JSON.parse(JSON.stringify(this.state.data));
    newData.map(year => year.womenRate = Math.round(Math.random() * 100));
    this.setState({data: newData});
  }

  addData = () => {
    const newData = JSON.parse(JSON.stringify(this.state.data));
    newData.push({year: '200' + newData.length, womenRate: Math.round(Math.random() * 100)});
    // newData.push({year: '200' + (newData.length + 1), womenRate: Math.round(Math.random() * 100)});
    this.setState({data: newData});
  }

  removeData = () => {
    const newData = JSON.parse(JSON.stringify(this.state.data));
    newData.pop();
    this.setState({data: newData});
  }
}

export default App;
