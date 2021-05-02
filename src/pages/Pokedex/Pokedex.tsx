import React from "react";
import { Button, Modal } from "react-bootstrap";


const Pokedex = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>
        </>
    );
};

export default Pokedex;
