import React from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { toastTemplate } from "../../common/toast";
import { PokemonContext } from "./Pokemon";

export const CatchForm = (props: any) => {
    const usePokemonContext = React.useContext(PokemonContext);

    const [nickname, setNickname] = React.useState<string>("");
    const nicknameNotAvail = () => toastTemplate({ message: "Sorry 😓, your pokemon nickname has been used", type: "error" });

    const catchPoke = () => {
        const pokedexStorage = localStorage.getItem("pokedex");
        let pokedex: any = [];
        if (pokedexStorage === null) {
            pokedex = [{ ...props.pokemon, nickname }];
            localStorage.setItem("pokedex", JSON.stringify(pokedex));
            usePokemonContext.hideModal();
        } else {
            pokedex = JSON.parse(pokedexStorage);
            const isNicknameAvailable = pokedex.filter((poke: any) => poke.nickname === nickname).length === 0;
            if (isNicknameAvailable) {
                pokedex = [...pokedex, { ...props.pokemon, nickname }];
                localStorage.setItem("pokedex", JSON.stringify(pokedex));
                usePokemonContext.hideModal();
            } else {
                nicknameNotAvail();
            }
        }
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
                        <Button block variant="danger" type="submit">
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
        </Container>
    );
};
