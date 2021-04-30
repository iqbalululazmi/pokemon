import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Pokedex from "./pages/Pokedex/Pokedex";
import Navigation from "./components/navigations/navigation";
import Pokemon from "./pages/Pokemon/Pokemon";
import PokemonDetail from "./pages/Pokemon/PokemonDetail";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route path="/pokemon" component={Pokemon} />
                    <Route path="/pokedex" component={Pokedex} />
                    <Route path="/pokedex-detail" component={PokemonDetail} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
