import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useQuery, gql } from "@apollo/client";
import "./Pokemon.css";
const POKEMONS = gql`
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

const POKEMON_TYPES = gql`
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

export interface PokemonTypeInterface {
    name: string;
}

const PokemonType = (props: PokemonTypeInterface) => {
    const { loading, error, data } = useQuery(POKEMON_TYPES, {
        variables: {
            name: props.name,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data);

    return data.pokemon.types.map((pokemonType: any) => (
        <Container style={{ marginTop: "5px" }}>
            <Row>
                <span className="badge badge-pill pokemon-types">{pokemonType.type.name}</span>
            </Row>
        </Container>
    ));
};

const Pokemon = () => {
    const { loading, error, data } = useQuery(POKEMONS, {
        variables: {
            limit: 6,
            offset: 1,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let tempPokemons: any = data.pokemons.results;
    let pokemons: any = [];

    if (tempPokemons.length > 0) {
        let indexSliceByRow = 0;
        let indexRow = -1;
        for (let i = 0; i < tempPokemons.length; i++) {
            if (i == indexSliceByRow) {
                indexSliceByRow += 2;
                pokemons.push({
                    type: "row",
                    rows: [],
                });
                indexRow += 1;
            }
            pokemons[indexRow].rows.push(tempPokemons[i]);
        }
    }

    console.log(pokemons);

    return (
        <Container style={{ marginTop: "80px" }}>
            {pokemons.map((datarow: any, index: number) => (
                <div key={index}>
                    <Row style={{ placeContent: "center" }}>
                        {datarow.rows.map((pokemon: any, indexPokemon: number) => (
                            <div key={indexPokemon}>
                                <Col style={{ padding: "5px" }}>
                                    <Card style={{ width: "11rem", marginBottom: "8px" }}>
                                        <Card.Body style={{}}>
                                            <label className="pokemon-name">{pokemon.name}</label>
                                            <PokemonType name={pokemon.name} />
                                            <Card.Img className="pokemon-image" variant="top" src={pokemon.image} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </div>
                        ))}
                    </Row>
                </div>
            ))}
        </Container>
    );
};

export default Pokemon;
