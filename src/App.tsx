import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Pokedex from "./pages/Pokedex/Pokedex";
import Navigation from "./components/navigations/navigation";
import Pokemon from "./pages/Pokemon/Pokemon";
import PokemonDetail from "./pages/Pokemon/PokemonDetailModal/PokemonDetail";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/pokemon" />
                    </Route>
                    <Route path="/pokemon" component={Pokemon} />
                    <Route path="/pokedex" component={Pokedex} />
                    <Route path="/pokedex-detail" component={PokemonDetail} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
