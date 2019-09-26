import React from 'react';
import injectSheet from 'react-jss';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Music from './Pages/Music';

import Weather from './Components/Weather';
import Navigation from './Components/Navigation';

const style = {

};
function App() {
  return (
    <Router>
      <div>
        <Route exact path={'/'} component={Home} />
        <Route path={'/Control'} component={Control} />
        <Route path={'/Music'} component={Music} />
        <Route path={'/Settings'} component={Settings} />
        <Route path={'/Assistant'} component={Assistant} />

      </div>
    </Router>
  );
}

function Home(){
  return(
    <div className="App">
      <Weather />
      <Navigation />
    </div>
  )
}

function Control(){
  return(
    <div>Control</div>
  )
}

function Settings(){
  return(
    <div>Settings</div>
  )
}

function Assistant() {
  return(
    <div>Assistant</div>
  )
}
export default injectSheet(style)(App);
