import React from "react";
import { Button, Card } from "react-bootstrap";
import { useQuery, gql } from "@apollo/client";

const POKEMONS = gql`
    query {
        pokemons {
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

const Pokemon = () => {
    const { loading, error, data } = useQuery(POKEMONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data);

    return data.pokemons.results.map((pokemon: any, index: number) => (
        <div key={pokemon}>
            <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={pokemon.image} />
                <Card.Body>
                    <Card.Title>{pokemon.name}</Card.Title>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    ));
};

export default Pokemon;
