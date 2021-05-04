import React from "react";
import { Button, Modal } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { PokemonDetailInteface } from "../../../interfaces/pokemon.interface";
import "./PokemonDetailModal.scss";
import { ToastContainer } from "react-toastify";
import { CatchForm } from "../PokemonForm";
import { toastCaughtFailure, toastCcaughtSuccess } from "../../../common/toast";
import PokemonDetailCard from "./PokemonDetailCard";
import { PokemonDetailProvider } from "../../../contexts/pokemon.context";
import { PokedexContext } from "../../../contexts/pokedex.context";

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
                <img className="poke-detail-img" src={props.pokemon.image} alt="" />
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
