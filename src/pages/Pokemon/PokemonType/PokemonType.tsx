import { useQuery } from "@apollo/client";
import { Container, Row } from "react-bootstrap";
import { QUERY_POKEMON_TYPE } from "../../../adapters/queries/pokemon.query";
import { PokemonTypeInterface } from "../../../interfaces/pokemon.interface";

const PokemonType = (props: PokemonTypeInterface) => {
    const { loading, error, data } = useQuery(QUERY_POKEMON_TYPE, {
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

export default PokemonType;
