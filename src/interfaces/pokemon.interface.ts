export interface PokemonTypeInterface {
    pokemon: any;
}

export interface PokemonDetailInteface {
    pokemon: PokemonInteface;
    // type: PokemonTypeInterface;
    show: boolean;
    onHide: React.MouseEventHandler<HTMLButtonElement>;
}

export interface PokemonInteface {
    name: string;
    image: string;
}
