import { Avatar, Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";

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
    if (strPokedex === null) {
        return <p>Record not found</p>;
    } else {
        const pokedex = JSON.parse(strPokedex);
        return (
            <>
            <Container style={{marginTop: "40px"}}>
                <ListGroup>
                    {pokedex.map((poke: any, index: number) => (
                        <ListGroup.Item key={index} style={{ textTransform: "capitalize" }}>
                            <Row>
                                <Col xs={2}>
                                    <Avatar alt={poke.name} src={poke.image} className={classes.large} />
                                </Col>
                                <Col>
                                    <h5>{poke.name}</h5>
                                    {poke.nickname}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
            </>
        );
    }
};

export default Pokedex;
