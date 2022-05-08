import './App.css';
import React from "react";
import { Route } from "react-router-dom";

import Home from './components/Home/Home'
import LandingPage  from './components/LandingPage/LandingPage';
import DetailVideogame from './components/DetailVideogame/DetailVideogame';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import VideogameCreated from './components/VideogameCreated/VideogameCreated';


function App() {
  return (
    <React.Fragment>
      
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/Home" component={Home} />
      <Route exact path="/videogames/create" component={CreateVideogame}/>
      <Route exact path="/videogame/:id" component={DetailVideogame}/>
      <Route exact path="/videogames/created" component={VideogameCreated}/>
      
    </React.Fragment>
  );
}

export default App;
