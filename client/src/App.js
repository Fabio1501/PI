import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import PrincipalPage from './components/PrincipalPage/PrincipalPage'
import Recipes from './components/Recipes/Recipes'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import RecipeCreate from './components/RecipeCreate/RecipeCreate'

function App(){
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path='/'
          element = {<PrincipalPage/>}
        />

        <Route
          exact
          path='/recipes'
          element = {<Recipes/>}
        />

        {/* <Route
          exact
          path='/recipes/:id'
          element = {<RecipeDetails/>}
        />

        <Route
          exact
          path='/recipes/create'
          element = {<RecipeCreate/>}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
