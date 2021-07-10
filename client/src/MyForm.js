import { Form, Button, Container, Row, Col, Alert, Figure, Image, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { ImagesManager } from './Meme'
import { Helmet } from 'react-helmet';
import './meme.css';


function MyForm(props) {
    const dayjs = require('dayjs');
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [is_protected, setIs_protected] = useState(false);
    const [creator, setCreator] = useState('');

    const [date, setDate] = useState(dayjs().format('MM-DD-YYYY'));
    const [errorMessage, setErrorMessage] = useState('');

    const [validated, setValidated] = useState(location.state ? true : undefined);

    const [submitted, setSubmitted] = useState(false);

    const [selectedTemplate, setSelectedTemplate] = useState();

    const setSelectedTemplate_ = (image) => {
        setSelectedTemplate(image);
    }

    const handleTitle = (event) => {
        setTitle(
            event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const meme = {
            title: title,
            imgCode: selectedTemplate.key,
            is_protected: is_protected,
            creator: creator,
            text1: text1 != "" ? text1 : "",
            text2:text2 != "" ? text2 : "",
            text3: text3 != "" ? text3 : "",
            textColor: textColor,
            textFont: textFont,
            textSize: textSize,
            textUppercase: textUppercase != "" ? textUppercase : "",
            textBold: textBold != "" ? textBold : "",
            textItalic: textItalic != "" ? textItalic : "",
            date: dayjs(date).format("MM/DD/YYYY"),
        };
        props.addMeme(meme);
        setSubmitted(true);
        handleClose();
    };

    {/*------------- Text Features Handlers --------------*/ }
    const [text1, setText1] = useState(location.state ? location.state.meme.text1 : '');
    const [text2, setText2] = useState(location.state ? location.state.meme.text2 : '');
    const [text3, setText3] = useState(location.state ? location.state.meme.text3 : '');

    const [textColor, setTextColor] = useState(location.state ? location.state.meme.textColor : 'red');
    const [textFont, setTextFont] = useState(location.state ? location.state.meme.textFont : '');
    const [textSize, setTextSize] = useState(location.state ? location.state.meme.textSize : '30');
    const [textUppercase, setTextUpperCase] = useState(location.state ? location.state.meme.textUppercase : '');
    const [textBold, setTextBold] = useState(location.state ? location.state.meme.textBold : '');
    const [textItalic, setTextItalic] = useState(location.state ? location.state.meme.textItalic : '');

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
    const handleText3 = (event) => {
        setText3(
            event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        );
    };

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

    const handleClose = () => {
        props.handleShow(false)
        setSelectedTemplate();
        setText1();
        setText2();
        setText3();
        setTextColor('red');
        setTextFont();
        setTextSize('10');
        setTextUpperCase();
        setTextBold();
        setTextItalic();
    };

    return (
        <>
            <Modal show={props.show} onHide={handleClose} size="xl" aria-labelledby="contained-modal-title-vcenter" centered animation={false}>
                <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title>
                        {props.formState == 'create' ? 'Add a new meme' : `Editing ${props.selectedPreview.creator}'s meme`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*------------Images------------*/}
                    {props.formState == 'create' ?
                        <>
                            <Row>
                                <ImagesManager templates={props.templates} setImage={setSelectedTemplate_} />
                            </Row>
                            <hr />
                        </>
                        : ''
                    }
                    <Row>
                        {/*------------Thumbnail------------*/}
                        <Col className="d-flex justify-content-center p-2">

                            {/*------------Create form------------*/}
                            {props.formState == 'create' ? <>
                                {selectedTemplate == null ? <h3 className="p-10">Select Image</h3> :
                                    <>
                                        <div
                                            className={"background_image" + " text_image" + `${selectedTemplate.key}`}
                                            style={{ backgroundImage: 'url(/images/' + selectedTemplate.key + '.jpg)' }}
                                            as={Col}
                                            lg="25"
                                            md="25"
                                            align="center">
                                            <div
                                                style={{
                                                    color: `${textColor}`,
                                                    fontFamily: `${textFont}`,
                                                    fontSize: `${textSize}px`,
                                                    textTransform: `${textUppercase}`,
                                                    fontWeight: `${textBold}`,
                                                    fontStyle: `${textItalic}`
                                                }}>
                                                {text1}
                                            </div>
                                            {selectedTemplate.textNum < 2 ? '' :
                                                <div
                                                    style={{
                                                        color: `${textColor}`,
                                                        fontFamily: `${textFont}`,
                                                        fontSize: `${textSize}px`,
                                                        textTransform: `${textUppercase}`,
                                                        fontWeight: `${textBold}`,
                                                        fontStyle: `${textItalic}`
                                                    }}>
                                                    {text2}
                                                </div>
                                            }
                                            {selectedTemplate.textNum < 3 ? '' :
                                                <div
                                                    style={{
                                                        color: `${textColor}`,
                                                        fontFamily: `${textFont}`,
                                                        fontSize: `${textSize}px`,
                                                        textTransform: `${textUppercase}`,
                                                        fontWeight: `${textBold}`,
                                                        fontStyle: `${textItalic}`
                                                    }}>
                                                    {text3}
                                                </div>
                                            }
                                        </div>
                                    </>
                                } </> :
                                <>
                                    {/*------------clone form------------*/}
                                    {
                                        <Col className="d-flex justify-content-center p-2">
                                            <div
                                                className={"background_image" + " text_image" + `${props.selectedPreview.imgCode}`}
                                                style={{ backgroundImage: 'url(/images/' + props.selectedPreview.imgCode + '.jpg)' }}
                                                as={Col}
                                                lg="25"
                                                md="25"
                                                align="center">
                                                <div
                                                    style={{
                                                        color: `${props.selectedPreview.textColor}`,
                                                        fontFamily: `${props.selectedPreview.textFont}`,
                                                        fontSize: `${props.selectedPreview.textSize}px`,
                                                        textTransform: `${props.selectedPreview.textUppercase}`,
                                                        fontWeight: `${props.selectedPreview.textBold}`,
                                                        fontStyle: `${props.selectedPreview.textItalic}`
                                                    }}>
                                                    {props.selectedPreview.text1}
                                                </div>
                                                {props.selectedPreview.text2 == '' ? '' :
                                                    <div
                                                        style={{
                                                            color: `${props.selectedPreview.textColor}`,
                                                            fontFamily: `${props.selectedPreview.textFont}`,
                                                            fontSize: `${props.selectedPreview.textSize}px`,
                                                            textTransform: `${props.selectedPreview.textUppercase}`,
                                                            fontWeight: `${props.selectedPreview.textBold}`,
                                                            fontStyle: `${props.selectedPreview.textItalic}`
                                                        }}>
                                                        {props.selectedPreview.text2}
                                                    </div>
                                                }
                                                {props.selectedPreview.text3 == '' ? '' :
                                                    <div
                                                        style={{
                                                            color: `${props.selectedPreview.textColor}`,
                                                            fontFamily: `${props.selectedPreview.textFont}`,
                                                            fontSize: `${props.selectedPreview.textSize}px`,
                                                            textTransform: `${props.selectedPreview.textUppercase}`,
                                                            fontWeight: `${props.selectedPreview.textBold}`,
                                                            fontStyle: `${props.selectedPreview.textItalic}`
                                                        }}>
                                                        {props.selectedPreview.text3}
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                    }
                                </>
                            }
                        </Col>
                        <Col>
                            <Form>
                                {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}

                                {/*-------------Text1-------------*/}
                                <Row >
                                    <Form.Group controlId="description" key="text1-control">
                                        <Form.Label>Text1</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={props.formState == 'create' ? "Text#1" : props.selectedPreview.text1}
                                            onChange={(ev) => handleText1(ev)}
                                            key="text1-input" />
                                    </Form.Group>
                                </Row>
                                <br />
                                {/*-------------Text2-------------*/}
                                <Row >

                                    <Form.Group controlId="description" key="text2-control">
                                        {selectedTemplate != null && selectedTemplate.textNum < 2 ?
                                            <>
                                                <Form.Label>Text2</Form.Label>
                                                <Form.Control type="text" placeholder="Text#2 disabled" onChange={(ev) => handleText2(ev)} disabled={true} key="text2-input1" />
                                            </> :
                                            <>
                                                <Form.Label>Text2</Form.Label>
                                                <Form.Control type="text" placeholder="Text#2" onChange={(ev) => handleText2(ev)} key="text2-input1" />
                                            </>
                                        }

                                    </Form.Group>


                                </Row>
                                <br />
                                {/*-------------Text3-------------*/}
                                <Row >

                                    <Form.Group controlId="description" key="text3-control">
                                        {selectedTemplate != null && selectedTemplate.textNum < 3 ?
                                            <>
                                                <Form.Label>Text3</Form.Label>
                                                <Form.Control type="text" placeholder="Text#3 disabled" onChange={(ev) => handleText3(ev)} disabled={true} key="text3-input1" />
                                            </> :
                                            <>
                                                <Form.Label>Text3</Form.Label>
                                                <Form.Control type="text" placeholder="Text#3" onChange={(ev) => handleText3(ev)} key="text3-input2" />
                                            </>
                                        }
                                    </Form.Group>
                                </Row>
                                <br />

                                <Row>
                                    <Col>
                                        <Form.Group controlId="ControlSelect1">
                                            <Form.Label>Font</Form.Label>
                                            <Form.Control as="select" onChange={handleTextFont.bind(this)}>
                                                <option style={{ fontFamily: 'Arial' }} key="font-arial">Arial</option>
                                                <option style={{ fontFamily: 'Rajdhani' }} key="font-rajdhani">Rajdhani</option>
                                                <option style={{ fontFamily: 'Helvetica' }} key="font-helvetica">Helvetica</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="ControlSelect1">
                                            <Form.Label>Color</Form.Label>
                                            <Form.Control as="select" onChange={handleTextColor.bind(this)}>
                                                <option style={{ color: "red" }}>Red</option>
                                                <option style={{ color: "white", backgroundColor: "black" }}>White</option>
                                                <option style={{ color: "green" }}>Green</option>
                                                <option style={{ color: "black" }}>Black</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="ControlSelect1">
                                            <Form.Label>Size</Form.Label>
                                            <Form.Control as="select" onChange={handleTextSize.bind(this)}>
                                                <option >10</option>
                                                <option >12</option>
                                                <option >14</option>
                                                <option >16</option>
                                                <option >18</option>
                                                <option >20</option>
                                                <option >22</option>
                                                <option >24</option>
                                                <option >26</option>
                                                <option >28</option>
                                                <option >30</option>
                                                <option >32</option>
                                                <option >34</option>
                                                <option >36</option>
                                                <option >38</option>
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
                                <Form.Control 
                                type="text" 
                                placeholder="Enter title" 
                                onChange={handleTitle}
                                />
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
                        <h7 >Close</h7>
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {props.formState == 'create' ?
                            <h7 className="rainbow-text2">Save Meme</h7>
                            :
                            <h7 className="rainbow-text2">Clone Meme</h7>
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



export { MyForm };