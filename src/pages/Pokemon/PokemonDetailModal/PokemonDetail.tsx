import { useQuery } from "@apollo/client";
import React from "react";
import { Button, Card, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { QUERY_POKEMON_DETAIL } from "../../../adapters/queries/pokemon.query";
import { PokemonDetailInteface } from "../../../interfaces/pokemon.interface";
import "./PokemonDetailModal.scss";
import { ToastContainer } from "react-toastify";
import { CatchForm } from "../PokemonForm";
import { PokedexContext } from "../../Pokedex/Pokedex";
import { toastCaughtFailure, toastCcaughtSuccess } from "../../../common/toast";

const PokemonDetailContext = React.createContext<any>({});
export const PokemonDetailProvider = PokemonDetailContext.Provider;

function PokemonDetailCard(props: any) {
    const [key, setKey] = React.useState<null | string>("about");
    const useDetailContext = React.useContext(PokemonDetailContext);

    const { loading, error, data } = useQuery(QUERY_POKEMON_DETAIL, {
        variables: {
            name: props.pokemon.name,
        },
    });

    if (loading)
        return (
            <div className="spinner">
                <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />;
            </div>
        );

    if (error) return <p>Error :(</p>;

    if (Object.keys(data.pokemon).length > 0) {
        useDetailContext.getFromChild(data.pokemon);
    }

    const { pokemon } = data;
    const { abilities, sprites, stats } = pokemon;

    return (
        <>
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
                                {abilities?.map((ability: any, index: number) => (
                                    <Row key={index}>
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
                    <Card className="poke-detail-card">
                        <Card.Body>
                            <>
                                {stats?.map((stat: any, index: number) => (
                                    <Row key={index}>
                                        <Col sm={6} md={6} xs={5}>
                                            <h6 style={{ textTransform: "capitalize" }}>{stat?.stat.name}</h6>
                                        </Col>
                                        <Col>
                                            <h6>: {stat?.base_stat}</h6>
                                        </Col>
                                    </Row>
                                ))}
                            </>
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="sprite" title="Sprite">
                    <Card className="poke-detail-card">
                        <Card.Body className="poke-sprite">
                            <>
                                <h5>Male</h5>
                                <Row>
                                    <Col>
                                        <img src={sprites.front_default} alt="" />
                                    </Col>
                                    <Col>
                                        <img src={sprites.back_default} alt="" />
                                    </Col>
                                    <Col>
                                        <img src={sprites.front_shiny} alt="" />
                                    </Col>
                                    <Col>
                                        <img src={sprites.back_shiny} alt="" />
                                    </Col>
                                </Row>
                                {sprites.front_female !== null && (
                                    <>
                                        <h5>Female</h5>
                                        <Row>
                                            <Col>
                                                <img src={sprites.front_female} alt="" />
                                            </Col>
                                            <Col>
                                                <img src={sprites.back_female} alt="" />
                                            </Col>
                                            <Col>
                                                <img src={sprites.front_shiny_female} alt="" />
                                            </Col>
                                            <Col>
                                                <img src={sprites.back_shiny_female} alt="" />
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </>
    );
}

const PokemonDetailModal = (props: PokemonDetailInteface) => {
    const [pokemonDetail, setPokemonDetail] = React.useState<any>({});
    const [showForm, setShowForm] = React.useState<boolean>(false);
    const [showSpinner, setShowSpinner] = React.useState<boolean>(false);
    const pokemon = props.pokemon;
    const usePokedexContext = React.useContext(PokedexContext);

    const getFromChild = (value: any) => {
        setPokemonDetail(value);
    };

    const caught = () => {
        setShowSpinner(true);
        setTimeout(() => {
            setShowSpinner(false);
            const chance = Math.random() * 100;
            if (chance <= 50) {
                toastCcaughtSuccess();
                setShowForm(true);
            } else {
                toastCaughtFailure();
            }
        }, 1000);
    };

    const deleteFromPokedex = () => {
        setShowSpinner(true);
        setTimeout(() => {
            setShowSpinner(false);
            const pokedex = JSON.parse(localStorage.getItem("pokedex") ?? "");
            const newPokedex = pokedex.filter((poke: any) => poke.nickname !== pokemon.nickname);
            localStorage.setItem("pokedex", JSON.stringify(newPokedex));
            usePokedexContext.hideModal();
        }, 1000);
    };

    React.useEffect(() => {
        if (Object.keys(pokemonDetail).length === 0) {
            setPokemonDetail(props.pokemon);
        }
    }, [props.pokemon, pokemonDetail]);

    return (
        <>
            <ToastContainer />
            <Modal backdrop="static" className="poke-modal-detail" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{props.pokemon.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showForm ? (
                        <div>
                            <CatchForm pokemon={pokemon} />
                        </div>
                    ) : (
                        <PokemonDetailProvider value={{ pokemon, getFromChild }}>
                            <PokemonDetailCard pokemon={{ ...props.pokemon, ...pokemonDetail }} />
                        </PokemonDetailProvider>
                    )}

                    {showSpinner && (
                        <div className="absolute-loader" style={{ textAlign: "center" }}>
                            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                        </div>
                    )}
                </Modal.Body>

                {!showForm && (
                    <Modal.Footer>
                        {props.fromPage === "pokemons" ? (
                            <Button variant="success" block onClick={() => caught()}>
                                Caught
                            </Button>
                        ) : (
                            <>
                                <Button variant="danger" block onClick={() => deleteFromPokedex()}>
                                    Remove
                                </Button>
                            </>
                        )}
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
};

export default PokemonDetailModal;
