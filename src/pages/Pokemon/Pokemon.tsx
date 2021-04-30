import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
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

    let tempPokemons: any = data.pokemons.results;
    let pokemons: any = [];

    if (tempPokemons.length > 0) {
        let indexSliceByRow = 0;
        let indexRow = -1;
        for (let i = 0; i < tempPokemons.length; i++) {
            if (i == indexSliceByRow) {
                indexSliceByRow += 3;
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
                    <Row>
                        {datarow.rows.map((pokemon: any, indexPokemon: number) => (
                            <div key={indexPokemon}>
                                <Col>
                                    <Card style={{ width: "6.5rem", textAlign: "center", alignItems: "center", marginBottom: "8px" }}>
                                        <Card.Img variant="top" style={{ width: "50px", height: "50px" }} src={pokemon.image} />
                                        <Card.Body>
                                            <Card.Text style={{ fontSize: "12px", fontWeight: 600, textTransform: "capitalize" }}>
                                                {pokemon.name}
                                            </Card.Text>
                                            <Button variant="primary" size="sm">
                                                Detail
                                            </Button>
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
