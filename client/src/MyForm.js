import { Form, Button, Container, Row, Col, Alert, Figure, Image, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { ImagesManager } from './Meme'
import { Helmet } from 'react-helmet';
import './meme.css';


function MyForm(props) {
    const dayjs = require('dayjs');
    const location = useLocation();
    const [title, setTitle] = useState(props.formState == 'create' ? '' : props.selectedPreview.title);
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


    {/*------------- Text Features Handlers --------------*/ }
    const [text1, setText1] = useState(props.formState == 'create' ? '' : `${props.selectedPreview.creator}`);
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');

    const [textColor, setTextColor] = useState('red');
    const [textFont, setTextFont] = useState('');
    const [textSize, setTextSize] = useState('30');
    const [textUppercase, setTextUppercase] = useState('');
    const [textBold, setTextBold] = useState('');
    const [textItalic, setTextItalic] = useState('');

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
        if (props.formState == 'clone')
            handleEditModeTextColor(true);
    };
    const handleTextFont = (event) => {
        setTextFont(
            event.target.value
        );
        if (props.formState == 'clone')
            handleEditModeTextFont(true);

    };
    const handleTextSize = (event) => {
        setTextSize(
            event.target.value
        );
        if (props.formState == 'clone')
            handleEditModeTextSize(true);
    };

    const handleTextUppercase = () => {
        if (textUppercase == '')
            setTextUppercase('uppercase');
        else
            setTextUppercase('');
        if (props.formState == 'clone')
            handleEditModeTextUppercase(true);
    };

    const handleTextBold = () => {
        if (textBold == '')
            setTextBold('bold');
        else
            setTextBold('');
        if (props.formState == 'clone')
            handleEditModeTextBold(true);
    };

    const handleTextItalic = () => {
        if (textItalic == '')
            setTextItalic('italic');
        else
            setTextItalic('');
        if (props.formState == 'clone')
            handleEditModeTextItalic(true);
    };

    {/*----------------Edit Mode handlers---------------*/ }

    const [editModeText1, setEditModeText1] = useState(false);
    const handleEditModeText1 = (bool) => {
        setEditModeText1(bool);
    }
    const [editModeText2, setEditModeText2] = useState(false);
    const handleEditModeText2 = (bool) => {
        setEditModeText2(bool);
    }
    const [editModeText3, setEditModeText3] = useState(false);
    const handleEditModeText3 = (bool) => {
        setEditModeText3(bool);
    }
    const [editModeTextColor, setEditModeTextColor] = useState(false);
    const handleEditModeTextColor = (bool) => {
        setEditModeTextColor(bool);
    }
    const [editModeTextFont, setEditModeTextFont] = useState(false);
    const handleEditModeTextFont = (bool) => {
        setEditModeTextFont(bool);
    }
    const [editModeTextSize, setEditModeTextSize] = useState(false);
    const handleEditModeTextSize = (bool) => {
        setEditModeTextSize(bool);
    }
    const [editModeTextUppercase, setEditModeTextUppercase] = useState(false);
    const handleEditModeTextUppercase = (bool) => {
        setEditModeTextUppercase(bool);
    }
    const [editModeTextBold, setEditModeTextBold] = useState(false);
    const handleEditModeTextBold = (bool) => {
        setEditModeTextBold(bool);
    }
    const [editModeTextItalic, setEditModeTextItalic] = useState(false);
    const handleEditModeTextItalic = (bool) => {
        setEditModeTextItalic(bool);
    }

    {/*--------------------------------------------------*/ }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        if (title == '') {
            setErrorMessage('Title cannot be empty!')
            console.log('error');
            return;
        }
        if(selectedTemplate == null){
            setErrorMessage('You should select a template!')
            console.log('error');
            return;
        }
        if(text1 == '' && text2 == '' && text3 == ''){
            setErrorMessage('You should fill at least one text field!')
            console.log('error');
            return;
        }

        const meme = {
            title: title,
            imgCode: selectedTemplate.key,
            is_protected: is_protected,
            creator: creator,
            text1: text1 != "" ? text1 : "",
            text2: text2 != "" ? text2 : "",
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

    const handleClose = () => {
        props.handleShow(false);
        setErrorMessage('');
        setSelectedTemplate();
        setTitle('');
        setText1('');
        setText2('');
        setText3('');
        setTextColor('red');
        setTextFont();
        setTextSize('30');
        setTextUppercase('');
        setTextBold('');
        setTextItalic('');
        setEditModeText1(false);
        setEditModeText2(false);
        setEditModeText3(false);
        setEditModeTextColor(false);
        setEditModeTextFont(false);
        setEditModeTextSize(false);
        setEditModeTextUppercase(false);
        setEditModeTextBold(false);
        setEditModeTextItalic(false);
    };

    {/*--------------------------------------------------*/ }

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
                                                        color: `${editModeTextColor ? textColor : props.selectedPreview.textColor}`,
                                                        fontFamily: `${editModeTextFont ? textFont : props.selectedPreview.textFont}`,
                                                        fontSize: `${editModeTextSize ? textSize : props.selectedPreview.textSize}px`,
                                                        textTransform: `${editModeTextUppercase ? textUppercase : props.selectedPreview.textUppercase}`,
                                                        fontWeight: `${editModeTextBold ? textBold : props.selectedPreview.textBold}`,
                                                        fontStyle: `${editModeTextItalic ? textItalic : props.selectedPreview.textItalic}`
                                                    }}>
                                                    {editModeText1 ? text1 : props.selectedPreview.text1}
                                                </div>
                                                {props.selectedPreview.text2 == '' ? '' :
                                                    <div
                                                        style={{
                                                            color: `${editModeTextColor ? textColor : props.selectedPreview.textColor}`,
                                                            fontFamily: `${editModeTextFont ? textFont : props.selectedPreview.textFont}`,
                                                            fontSize: `${editModeTextSize ? textSize : props.selectedPreview.textSize}px`,
                                                            textTransform: `${editModeTextUppercase ? textUppercase : props.selectedPreview.textUppercase}`,
                                                            fontWeight: `${editModeTextBold ? textBold : props.selectedPreview.textBold}`,
                                                            fontStyle: `${editModeTextItalic ? textItalic : props.selectedPreview.textItalic}`
                                                        }}>
                                                        {editModeText2 ? text2 : props.selectedPreview.text2}
                                                    </div>
                                                }
                                                {props.selectedPreview.text3 == '' ? '' :
                                                    <div
                                                        style={{
                                                            color: `${editModeTextColor ? textColor : props.selectedPreview.textColor}`,
                                                            fontFamily: `${editModeTextFont ? textFont : props.selectedPreview.textFont}`,
                                                            fontSize: `${editModeTextSize ? textSize : props.selectedPreview.textSize}px`,
                                                            textTransform: `${editModeTextUppercase ? textUppercase : props.selectedPreview.textUppercase}`,
                                                            fontWeight: `${editModeTextBold ? textBold : props.selectedPreview.textBold}`,
                                                            fontStyle: `${editModeTextItalic ? textItalic : props.selectedPreview.textItalic}`
                                                        }}>
                                                        {editModeText3 ? text3 : props.selectedPreview.text3}
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
                                            placeholder="Text#1"
                                            onChange={(ev) => {
                                                handleText1(ev)
                                                if (props.formState == 'clone')
                                                    handleEditModeText1(true);
                                            }}
                                            key="text1-input"
                                        />
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
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Text#2"
                                                    onChange={(ev) => {
                                                        handleText2(ev)
                                                        if (props.formState == 'clone')
                                                            handleEditModeText2(true);
                                                    }}
                                                    key="text2-input1" />
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
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Text#3"
                                                    onChange={(ev) => {
                                                        handleText3(ev)
                                                        if (props.formState == 'clone')
                                                            handleEditModeText3(true);
                                                    }}
                                                    key="text3-input2" />
                                            </>
                                        }
                                    </Form.Group>
                                </Row>
                                <br />


                                <Row>
                                    <Col>
                                        {/*#TODO*/}
                                        <Form.Group controlId="ControlSelect1">
                                            <Form.Label>Font</Form.Label>
                                            <Form.Control
                                                as="select"
                                                onChange={handleTextFont.bind(this)}>
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
                                                        onChange={handleTextUppercase}
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
                                        { props.user != null ? <>
                                        <Form.Check
                                            type="checkbox"
                                            label="Set as protected"
                                            checked={is_protected}
                                            onChange={() => setIs_protected((isp) => !isp)}
                                        />
                                        <h5 style={{fontSize: 14}}> *keep your meme for yourself (you need to be logged) </h5>
                                        </> : ''}
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