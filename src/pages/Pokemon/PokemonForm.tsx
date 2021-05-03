import React from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { toastNicknameNotAvailable } from "../../common/toast";
import { PokemonContext } from "./Pokemon";

export const CatchForm = (props: any) => {
    const usePokemonContext = React.useContext(PokemonContext);
    const [showSpinner, setShowSpinner] = React.useState<boolean>(false);
    const [nickname, setNickname] = React.useState<string>("");

    const catchPoke = () => {
        const pokedexStorage = localStorage.getItem("pokedex");
        setShowSpinner(true);
        setTimeout(() => {
            setShowSpinner(false);
            let pokedex: any = [];
            if (pokedexStorage === null) {
                pokedex = [{ ...props.pokemon, nickname }];
                localStorage.setItem("pokedex", JSON.stringify(pokedex));
                usePokemonContext.caughtSuccess();
            } else {
                pokedex = JSON.parse(pokedexStorage);
                const isNicknameAvailable = pokedex.filter((poke: any) => poke.nickname === nickname).length === 0;
                if (isNicknameAvailable) {
                    pokedex = [...pokedex, { ...props.pokemon, nickname }];
                    localStorage.setItem("pokedex", JSON.stringify(pokedex));
                    usePokemonContext.caughtSuccess();
                } else {
                    toastNicknameNotAvailable();
                }
            }
        }, 1000);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setNickname(event.target.value);
    };

    return (
        <Container>
            <img className="poke-detail-img" src={props.pokemon.image} alt="" />
            <div>
                <label>Nickname</label>
                <input
                    placeholder="Enter nickname"
                    aria-label="Nickname"
                    aria-describedby="basic-addon1"
                    className="nickname"
                    onChange={(event) => handleInputChange(event)}
                />
                <p className="text-muted">Please give different nickname</p>
            </div>
            <div>
                <Row>
                    <Col>
                        <Button block variant="danger" type="submit" onClick={() => usePokemonContext.hideModal()}>
                            Cancel
                        </Button>
                    </Col>
                    <Col>
                        <Button block variant="primary" type="submit" onClick={() => catchPoke()}>
                            Finish
                        </Button>
                    </Col>
                </Row>
            </div>

            {showSpinner && (
                <div className="absolute-loader" style={{ textAlign: "center" }}>
                    <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                </div>
            )}
        </Container>
    );
};
