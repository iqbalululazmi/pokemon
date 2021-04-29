import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MyPokedex from "./pages/MyPokemon/MyPokedex";
import Pokedex from "./pages/Pokedex/Pokedex";
import Navigation from "./components/navigations/navigation";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route path="/pokemon" component={MyPokedex} />
                    <Route path="/pokedex" component={Pokedex} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
