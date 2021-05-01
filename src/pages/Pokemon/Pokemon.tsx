import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import "./Pokemon.scss";
import PokemonDetail from "./PokemonDetailModal/PokemonDetail";
import { QUERY_POKEMONS } from "../../adapters/queries/pokemon.query";
import PokemonType from "./PokemonType/PokemonType";
import { PokemonInteface } from "../../interfaces/pokemon.interface";

const Pokemon = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedPokemon, setSelectedPokemon] = React.useState<PokemonInteface>({ image: "", name: "" });
    const { loading, error, data } = useQuery(QUERY_POKEMONS, {
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
            if (i === indexSliceByRow) {
                indexSliceByRow += 2;
                pokemons.push({
                    type: "row",
                    rows: [],
                });
                indexRow += 1;
            }
            pokemons[indexRow].rows.push({ ...tempPokemons[i], showModal: false });
        }
    }

    console.log(pokemons);

    function openModal(indexRow: number, indexPoke: number) {
        setSelectedPokemon(pokemons[indexRow].rows[indexPoke]);
        setModalShow(true);
    }

    return (
        <Container style={{ marginTop: "80px" }}>
            {pokemons.map((datarow: any, indexRow: number) => (
                <div key={indexRow}>
                    <Row style={{ placeContent: "center" }}>
                        {datarow.rows.map((pokemon: PokemonInteface, indexPokemon: number) => (
                            <div key={indexPokemon}>
                                <Col sm={2} style={{ padding: "5px" }}>
                                    <Card className="pokemon-card" onClick={() => openModal(indexRow, indexPokemon)}>
                                        <Card.Body>
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
            <PokemonDetail pokemon={selectedPokemon} show={modalShow} onHide={() => setModalShow(false)} />
        </Container>
    );
};

export default Pokemon;
