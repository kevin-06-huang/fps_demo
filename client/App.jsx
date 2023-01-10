import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Game from './components/Game';

//import './stylesheets/styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  getSSID() {
    // document.cookie
    return true;
  } 

  render() {
    return !this.getSSID() ?
    <div>
      <main>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
      </main>
    </div> :
    <div className="router">
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={<Game/>}
          />
        </Routes>
      </main>
    </div>
  }
}

export default App;
