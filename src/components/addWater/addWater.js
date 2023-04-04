import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { BiPlusCircle } from "react-icons/bi";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "./addWater.css";

const AddWater = (props) => {
    const [isShowing, setIsShowing] = useState(false);
    const [waterName, setWaterName] = useState("");

    const handleShow = () => {
        setIsShowing(true);
    };

    const handleClose = () => {
        setIsShowing(false);
    };

    const handleOk = () => {
        props.onAdded({ id: null, name: waterName });
        setIsShowing(false);
    };

    return (
        <>
            <BiPlusCircle onClick={handleShow} />

            <Modal show={isShowing} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Water</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tbody>
                            <tr>
                                <td className="dd-label-cell">
                                    <h6>Water Name: </h6>
                                </td>
                                <td>
                                    <input
                                        className="form-control water-input"
                                        type="text"
                                        value={waterName}
                                        onChange={(e) => {
                                            setWaterName(e.target.value);
                                        }}
                                    ></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleOk}>
                        Ok
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddWater;
