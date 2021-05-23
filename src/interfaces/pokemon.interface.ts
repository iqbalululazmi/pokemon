import React from 'react'
export interface PokemonTypeInterface {
  pokemon: any
}

export interface PokemonDetailInteface {
  pokemon: PokemonInteface
  // type: PokemonTypeInterface;
  show: boolean
  fromPage: string
  onHide: React.MouseEventHandler<HTMLButtonElement>
}

export interface PokemonInteface {
  id: number
  name: string
  image: string
  nickname?: string
}
