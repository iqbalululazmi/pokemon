import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import "./Pokemon.scss";
import { QUERY_POKEMONS } from "../../adapters/queries/pokemon.query";
import PokemonType from "./PokemonType/PokemonType";
import { PokemonInteface } from "../../interfaces/pokemon.interface";
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { PaginationInterface } from "../../interfaces/pagination.interface";
import PokemonDetailModal from "./PokemonDetailModal/PokemonDetail";
import { toastRegisterSuccess } from "../../common/toast";
import { ToastContainer } from "react-toastify";
import useWindowDimensions from "../../common/general";

export const PokemonContext = React.createContext<any>({});
export const PokemonProvider = PokemonContext.Provider;

const Pokemon = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedPokemon, setSelectedPokemon] = React.useState<PokemonInteface>({ image: "", name: "", id: 0 });
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const [showSpinner, setShowSpinner] = React.useState<boolean>(false);
    const [pokemons, setPokemons] = React.useState<any[]>([]);
    const [pagination, setPagination] = React.useState<PaginationInterface>({
        limit: 8,
        offset: 9,
    });
    const { width } = useWindowDimensions();

    let variables = {};
    if (width < 540) {
        variables = {
            limit: 8,
            offset: 0,
        };
    } else if (width < 990) {
        variables = {
            limit: 12,
            offset: 0,
        };
    } else {
        variables = {
            limit: 18,
            offset: 0,
        };
    }

    const { loading, error, data, fetchMore } = useQuery(QUERY_POKEMONS, {
        variables,
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

    function openModal(pokemon: any) {
        setModalShow(true);
        setSelectedPokemon(pokemon);
    }

    const hideModal = () => {
        setModalShow(false);
    };
    const caughtSuccess = () => {
        setModalShow(false);
        toastRegisterSuccess();
    };

    function fetchMoreData() {
        setShowSpinner(true);
        fetchMore({ variables: { limit: pagination.limit, offset: pagination.offset } })
            .then((res: any) => {
                setPokemons(pokemons.concat(res.data.pokemons.results));
                setPagination({ offset: pagination.offset + 8, limit: pagination.limit });
                if (res.data.pokemons.count === pokemons.length) {
                    setHasMore(false);
                }
                setShowSpinner(false);
            })
            .catch((e) => {
                return <p>Error :(</p>;
            });
    }

    return (
        <>
            <ToastContainer />
            <InfiniteScroll
                dataLength={pokemons.length}
                next={() => fetchMoreData()}
                hasMore={hasMore}
                loader={<></>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <Container style={showSpinner ? { marginTop: "40px", marginBottom: "60px" } : { marginTop: "40px" }}>
                    <div>
                        <Row style={{ placeContent: "center" }}>
                            {pokemons.map((pokemon: PokemonInteface, indexPokemon: number) => (
                                <div key={indexPokemon}>
                                    <Col sm={2} style={{ padding: "5px" }} onClick={() => openModal(pokemon)}>
                                        <PokemonType pokemon={pokemon} />
                                    </Col>
                                </div>
                            ))}
                        </Row>
                    </div>

                    {showSpinner && (
                        <div style={{ textAlign: "center" }}>
                            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                        </div>
                    )}

                    {modalShow && (
                        <PokemonProvider value={{ hideModal, caughtSuccess }}>
                            <PokemonDetailModal
                                fromPage={"pokemons"}
                                pokemon={selectedPokemon}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </PokemonProvider>
                    )}
                </Container>
            </InfiniteScroll>
        </>
    );
};

export default Pokemon;
