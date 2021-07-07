import { Form, Button, Container, Row, Col, Alert, Figure, Image, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { ImagesManager } from './Meme'
import { Helmet } from 'react-helmet';


function MyForm(props) {
    const dayjs = require('dayjs');

    const location = useLocation();
    const [title, setTitle] = useState(location.state ? location.state.meme.title : '');
    const [is_protected, setIs_protected] = useState(location.state ? location.state.meme.is_protected : false);
    const [creator, setCreator] = useState(location.state ? location.state.meme.creator : '');
    const [text1, setText1] = useState(location.state ? location.state.meme.text1 : '');
    const [text2, setText2] = useState(location.state ? location.state.meme.text2 : '');
    const [text3, setText3] = useState(location.state ? location.state.meme.text3 : '');
    const [date, setDate] = useState(location.state ? location.state.meme.date : dayjs().format('MM-DD-YYYY'));
    const [errorMessage, setErrorMessage] = useState('');

    const [validated, setValidated] = useState(location.state ? true : undefined);

    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setSelectedImage();
    };
    const handleShow = () => setShow(true);

    const [image, setImage] = useState();

    const setSelectedImage = (image) => {
        setImage(image);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const meme = { title: title, is_protected: is_protected, creator: creator, text1: text1, text2: text2, text3: text3, date: dayjs(date).format("MM/DD/YYYY") };
        props.addMeme(meme);
        setSubmitted(true);
        setShow(false);
    };

    const handleDescription = (event) => {
        setTitle(
            event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        );
    };

    const handleDate = (event) => {
        setDate(event.target.value);
        return date ? dayjs(date).format("ddd MM/DD/YYYY") : undefined;
    };


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                New Meme
            </Button>
            <Modal show={show} onHide={handleClose} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title>New meme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*------------Images------------*/}
                    <Row>
                        <ImagesManager images={props.images} setImage={setSelectedImage} />
                    </Row>
                    <hr />
                    <Row>
                        {/*------------Thumbnail------------*/}
                        <Col className="d-flex justify-content-center p-2">
                            {image == null ? <h3 className="p-10">Select Image</h3> :
                                <Figure as={Col} lg="25" md="25" align="center">
                                    <Image align="center" src={image} thumbnail />
                                </Figure>
                            }
                        </Col>
                        <Col>
                            <Form>
                                {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
                                {/*-------------Title-------------*/}
                                <Row >
                                    <Form.Group controlId="description">
                                        <Form.Label>Meme title</Form.Label>
                                        <Form.Control type="text" placeholder="Enter title" onChange={(ev) => handleDescription(ev)} />
                                    </Form.Group>
                                </Row>
                                <br />
                                {/*-------------Tex1-------------*/}
                                <Row >
                                    <Form.Group controlId="description">
                                        <Form.Label>Text1</Form.Label>
                                        <Form.Control type="text" onChange={(ev) => handleDescription(ev)} />
                                    </Form.Group>
                                </Row>
                                <br />
                                {/*-------------Tex2-------------*/}
                                <Row >
                                    <Form.Group controlId="description">
                                        <Form.Label>Text2</Form.Label>
                                        <Form.Control type="text" onChange={(ev) => handleDescription(ev)} />
                                    </Form.Group>
                                </Row>
                                <br />
                                {/*-------------Tex3-------------*/}
                                <Row >
                                    <Form.Group controlId="description">
                                        <Form.Label>Text3</Form.Label>
                                        <Form.Control type="text" onChange={(ev) => handleDescription(ev)} />
                                    </Form.Group>
                                </Row>
                                <br />
                                {/*-------------Protected Box-------------*/}
                                <Form.Group id="formGridCheckbox">
                                    <Row >
                                        <Col>
                                            <Form.Check
                                                type="checkbox"
                                                label="Protected"
                                                checked={is_protected}
                                                onChange={() => setIs_protected((isp) => !isp)}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Font</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Color</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Meme
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { MyForm };