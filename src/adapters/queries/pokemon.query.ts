import { gql } from "@apollo/client";

export const QUERY_POKEMONS = gql`
    query($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            params
            results {
                name
                url
                image
                id
            }
        }
    }
`;

export const QUERY_POKEMON_TYPE = gql`
    query($name: String!) {
        pokemon(name: $name) {
            id
            types {
                type {
                    name
                }
            }
        }
    }
`;

export const QUERY_POKEMON_DETAIL = gql`
    query($name: String!) {
        pokemon(name: $name) {
            id
            name
            abilities {
                ability {
                    name
                }
            }
            base_experience
            height
            held_items {
                item {
                    url
                    name
                }
                version_details {
                    rarity
                    version {
                        url
                        name
                    }
                }
            }
            order
            species {
                name
            }
            sprites {
                front_default
                back_default
                front_shiny
                back_shiny
                front_female
                back_female
                front_shiny_female
                back_shiny_female
            }
            stats {
                base_stat
                effort
                stat {
                    name
                }
            }
            types {
                type {
                    name
                }
            }
            weight
            status
            message
        }
    }
`;
