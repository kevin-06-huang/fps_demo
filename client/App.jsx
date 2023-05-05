import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './components/Game';

//import './stylesheets/styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
    <div className="router">
      <main>
        <Routes>
          <Route exact path="/" element={<Game/>}/>
        </Routes>
      </main>
    </div>
  )}
}

export default App;
