import { Form, Button, Container, Row, Col, Alert, Figure, Image, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { ImagesManager } from './Meme'
import { Helmet } from 'react-helmet';
import './meme.css';


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

    const handleClose = () => {
        props.handleShow(false)
        setSelectedImage();
    };

    const [image, setImage] = useState();

    const setSelectedImage = (image) => {
        setImage(image);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const meme = { title: title, is_protected: is_protected, creator: creator, text1: text1, text2: text2, text3: text3, date: dayjs(date).format("MM/DD/YYYY") };
        props.addMeme(meme);
        setSubmitted(true);
        props.handleShow(false);
    };

    const handleDescription = (event) => {
        setTitle(
            event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        );
    };
    const handleText1 = (event) => {
        setText1(
            event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        );
    };
    const handleText2 = (event) => {
        setText2(
            event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        );
    };

    {/*------------- Text Features Handlers --------------*/ }

    const [textColor, setTextColor] = useState(location.state ? location.state.meme.textColor : 'white');
    const [textFont, setTextFont] = useState(location.state ? location.state.meme.textFont : '');
    const [textSize, setTextSize] = useState(location.state ? location.state.meme.textSize : '30');
    const [textUppercase, setTextUpperCase] = useState(location.state ? location.state.meme.textUppercase : '');
    const [textBold, setTextBold] = useState(location.state ? location.state.meme.textBold : '');
    const [textItalic, setTextItalic] = useState(location.state ? location.state.meme.textItalic : '');

    const handleTextColor = (event) => {
        setTextColor(
            event.target.value
        );
    };
    const handleTextFont = (event) => {
        setTextFont(
            event.target.value
        );
    };
    const handleTextSize = (event) => {
        setTextSize(
            event.target.value
        );
    };
    const handleTextUpperCase = () => {
        if (textUppercase == '')
            setTextUpperCase('uppercase');
        else
            setTextUpperCase('');
    };
    const handleTextBold = () => {
        if (textBold == '')
            setTextBold('bold');
        else
            setTextBold('');
    };
    const handleTextItalic = () => {
        if (textItalic == '')
            setTextItalic('italic');
        else
            setTextItalic('');
    };

    {/*---------------------------------------------------*/ }

    const handleDate = (event) => {
        setDate(event.target.value);
        return date ? dayjs(date).format("ddd MM/DD/YYYY") : undefined;
        {/*props.handleShow(!props.show)*/ }
    };

    return (
        <>
            <Modal show={props.show} onHide={handleClose} size="xl" aria-labelledby="contained-modal-title-vcenter" centered animation={false}>
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
                                <>
                                    {console.log(image)}
                                    <div
                                        className="top-center bgimg"
                                        style={{ backgroundImage: 'url(' + image + ')' }}
                                        as={Col}
                                        lg="25"
                                        md="25"
                                        align="center">
                                        <div style={{
                                            color: `${textColor}`,
                                            fontFamily: `${textFont}`,
                                            fontSize: `${textSize}px`,
                                            textTransform: `${textUppercase}`,
                                            fontWeight: `${textBold}`,
                                            fontStyle: `${textItalic}`
                                        }}>
                                            {text1}
                                        </div>
                                    </div>
                                </>
                            }
                        </Col>
                        <Col>
                            <Form>
                                {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
                                {/*-------------Tex1-------------*/}
                                <Row >
                                    <Form.Group controlId="description">
                                        <Form.Label>Text1</Form.Label>
                                        <Form.Control type="text" placeholder="Text#1" onChange={(ev) => handleText1(ev)} />
                                    </Form.Group>
                                </Row>
                                <br />
                                {/*-------------Tex2-------------*/}
                                <Row >
                                    <Form.Group controlId="description">
                                        <Form.Label>Text2</Form.Label>
                                        <Form.Control type="text" placeholder="Text#2" onChange={(ev) => handleDescription(ev)} />
                                    </Form.Group>
                                </Row>
                                <br />
                                {/*-------------Tex3-------------*/}
                                <Row >
                                    <Form.Group controlId="description">
                                        <Form.Label>Text3</Form.Label>
                                        <Form.Control type="text" placeholder="Text#3" onChange={(ev) => handleDescription(ev)} />
                                    </Form.Group>
                                </Row>
                                <br />

                                <Row>
                                    <Col>
                                        <Form.Group controlId="ControlSelect1">
                                            <Form.Label>Font</Form.Label>
                                            <Form.Control as="select" onChange={handleTextFont.bind(this)}>
                                                <option style={{ fontFamily: 'Arial' }} >Arial</option>
                                                <option style={{ fontFamily: 'Rajdhani' }}>Rajdhani</option>
                                                <option style={{ fontFamily: 'Helvetica' }}>Helvetica</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="ControlSelect1">
                                            <Form.Label>Color</Form.Label>
                                            <Form.Control as="select" onChange={handleTextColor.bind(this)}>
                                                <option style={{ color: "white", backgroundColor: "black" }}>White</option>
                                                <option style={{ color: "red" }}>Red</option>
                                                <option style={{ color: "green" }}>Green</option>
                                                <option style={{ color: "black" }}>Black</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="ControlSelect1">
                                            <Form.Label>Size</Form.Label>
                                            <Form.Control as="select" onChange={handleTextSize.bind(this)}>
                                                <option >30</option>
                                                <option >35</option>
                                                <option >40</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <br />

                                {/*-------------Text features-------------*/}
                                <Row>
                                    <Col>
                                        <Form.Group id="formGridCheckbox">
                                            <Row >
                                                <Col>
                                                    <Form.Check
                                                        onChange={handleTextBold}
                                                        type="checkbox"
                                                        label="Bold"
                                                        style={{ fontWeight: 'bold' }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group id="formGridCheckbox">
                                            <Row >
                                                <Col>
                                                    <Form.Check
                                                        onChange={handleTextItalic}
                                                        type="checkbox"
                                                        label="Italic"
                                                        style={{ fontStyle: 'italic' }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group id="formGridCheckbox">
                                            <Row >
                                                <Col>
                                                    <Form.Check
                                                        onChange={handleTextUpperCase}
                                                        type="checkbox"
                                                        label="UPPERCASE"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <hr />
                    {/*-------------Meme info-------------*/}
                    <Row >
                        <Col>
                            <Form.Group controlId="description">
                                <Form.Label>Meme title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" onChange={(ev) => handleDescription(ev)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group id="formGridCheckbox" style={{ marginTop: '5%' }}>
                                <Row >
                                    <Col >
                                        <Form.Check
                                            type="checkbox"
                                            label="Set as protected"
                                            checked={is_protected}
                                            onChange={() => setIs_protected((isp) => !isp)}
                                        />
                                    </Col>
                                </Row>
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