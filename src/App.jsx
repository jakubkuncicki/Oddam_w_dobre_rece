import React from 'react';

import Header from './components/Header';
import Stats from "./components/Stats";
import FourSteps from "./components/FourSteps";
import About from "./components/About/About";
import Institutions from "./components/Institutions";

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <Stats/>
      <FourSteps/>
      <About/>
      <Institutions/>
    </div>
  );
}

export default App;
