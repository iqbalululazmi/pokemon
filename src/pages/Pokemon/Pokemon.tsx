import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import "./Pokemon.scss";
import PokemonDetail from "./PokemonDetailModal/PokemonDetail";
import { QUERY_POKEMONS } from "../../adapters/queries/pokemon.query";
import PokemonType from "./PokemonType/PokemonType";
import { PokemonInteface } from "../../interfaces/pokemon.interface";
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { PaginationInterface } from "../../interfaces/pagination.interface";

const twoArrayColumn = (pokemons: any[]) => {
    const results: any = [];
    if (pokemons.length > 0) {
        let indexSliceByRow = 0;
        let indexRow = -1;
        for (let i = 0; i < pokemons.length; i++) {
            if (i === indexSliceByRow) {
                indexSliceByRow += 2;
                results.push({
                    type: "row",
                    rows: [],
                });
                indexRow += 1;
            }
            results[indexRow].rows.push({ ...pokemons[i], showModal: false });
        }
    }

    return results;
};

const Pokemon = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedPokemon, setSelectedPokemon] = React.useState<PokemonInteface>({ image: "", name: "" });
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const [showSpinner, setShowSpinner] = React.useState<boolean>(false);
    const [pokemonsTwoColumns, setPokemonsTwoColumns] = React.useState<any[]>([]);
    const [pokemons, setPokemons] = React.useState<any[]>([]);
    const [pagination, setPagination] = React.useState<PaginationInterface>({
        limit: 8,
        offset: 9,
    });

    const { loading, error, data, fetchMore } = useQuery(QUERY_POKEMONS, {
        variables: {
            limit: 8,
            offset: 0,
        },
    });

    if (loading)
        return (
            <div className="spinner">
                <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />;
            </div>
        );
    if (error) return <p>Error :(</p>;

    if (pokemons.length === 0) {
        setPokemons((pokemons) => [...pokemons, ...data.pokemons.results]);
    }

    if (pokemonsTwoColumns.length === 0) {
        setPokemonsTwoColumns((pokemonsTwoColumns) => [...pokemonsTwoColumns, ...twoArrayColumn(pokemons)]);
    }

    function openModal(indexRow: number, indexPoke: number) {
        setSelectedPokemon(pokemonsTwoColumns[indexRow].rows[indexPoke]);
        setModalShow(true);
    }

    function fetchMoreData() {
        setShowSpinner(true);
        fetchMore({ variables: { limit: pagination.limit, offset: pagination.offset } })
            .then((res: any) => {
                setPokemons(pokemons.concat(res.data.pokemons.results));
                setPokemonsTwoColumns(twoArrayColumn(pokemons));
                setPagination({ offset: pagination.offset + 8, limit: pagination.limit });
                setShowSpinner(false);
            })
            .catch((e) => {
                return <p>Error :(</p>;
            });
    }

    return (
        <InfiniteScroll
            dataLength={pokemons.length}
            next={() => fetchMoreData()}
            hasMore={hasMore}
            loader={<Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <Container style={{ marginTop: "80px" }}>
                {pokemonsTwoColumns.map((datarow: any, indexRow: number) => (
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

                {showSpinner && (
                    <div style={{ textAlign: "center" }}>
                        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                    </div>
                )}

                <PokemonDetail pokemon={selectedPokemon} show={modalShow} onHide={() => setModalShow(false)} />
            </Container>
        </InfiniteScroll>
    );
};

export default Pokemon;
