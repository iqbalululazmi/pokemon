import { useQuery } from "@apollo/client";
import React from "react";
import { Card, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { QUERY_POKEMON_DETAIL } from "../../../adapters/queries/pokemon.query";
import { PokemonDetailInteface } from "../../../interfaces/pokemon.interface";
import "./PokemonDetailModal.scss";

function PokemonDetailModal(props: PokemonDetailInteface) {
    const [key, setKey] = React.useState<null | string>("about");
    const { loading, error, data } = useQuery(QUERY_POKEMON_DETAIL, {
        variables: {
            name: props.pokemon.name,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const { pokemon } = data;
    const { abilities, sprites, stats } = pokemon;
    console.log(pokemon);
    console.log(abilities);

    return (
        <Modal className="poke-modal-detail" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{props.pokemon.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="poke-detail-img" src={props.pokemon.image} alt="" />
                <Tabs className="poke-detail-tab" activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey="about" title="About">
                        <Card className="poke-detail-card">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h6>Weight</h6>
                                        <p>{pokemon.weight} Kg</p>
                                    </Col>
                                    <Col>
                                        <h6>Height</h6>
                                        <p>{pokemon.height} cm</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card className="poke-detail-card">
                            <Card.Body>
                                <Card.Title>Ability</Card.Title>
                                <>
                                    {abilities?.map((ability: any) => (
                                        <Row>
                                            <Col>
                                                <h6>- {ability?.ability.name}</h6>
                                            </Col>
                                        </Row>
                                    ))}
                                </>
                            </Card.Body>
                        </Card>
                    </Tab>
                    <Tab eventKey="stat" title="Base Stat">
                        tesajlkjfdlajlj{" "}
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
}
export default PokemonDetailModal;
