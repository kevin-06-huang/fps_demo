import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

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
            <Route/>
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
