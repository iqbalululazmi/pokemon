import React from "react";

export const PokemonContext = React.createContext<any>({});
export const PokemonProvider = PokemonContext.Provider;

export const PokemonDetailContext = React.createContext<any>({});
export const PokemonDetailProvider = PokemonDetailContext.Provider;
