import { Avatar, Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import PokemonDetailModal from "../Pokemon/PokemonDetailModal/PokemonDetail";

export const PokedexContext = React.createContext<any>({});
export const PokedexProvider = PokedexContext.Provider;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    })
);

const Pokedex = () => {
    const classes = useStyles();
    const strPokedex = localStorage.getItem("pokedex");
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedPokemon, setSelectedPokemon] = React.useState<any>({});

    const hideModal = () => {
        setModalShow(false);
        // caughtSuccess();
    };

    function openModal(pokemon: any) {
        setModalShow(true);
        setSelectedPokemon(pokemon);
    }

    if (strPokedex === null) {
        return <p>Record not found</p>;
    } else {
        const pokedex = JSON.parse(strPokedex);
        return (
            <>
                <Container style={{ marginTop: "40px" }}>
                    <ListGroup>
                        {pokedex.map((pokemon: any, index: number) => (
                            <ListGroup.Item key={index} style={{ textTransform: "capitalize" }}>
                                <Row onClick={() => openModal(pokemon)}>
                                    <Col xs={2}>
                                        <Avatar alt={pokemon.name} src={pokemon.image} className={classes.large} />
                                    </Col>
                                    <Col>
                                        <h5>{pokemon.name}</h5>
                                        {pokemon.nickname}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    {modalShow && (
                        <PokedexProvider value={{ hideModal }}>
                            <PokemonDetailModal pokemon={selectedPokemon} show={modalShow} onHide={() => setModalShow(false)} />
                        </PokedexProvider>
                    )}
                </Container>
            </>
        );
    }
};

export default Pokedex;
