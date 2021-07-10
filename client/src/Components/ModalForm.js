import { useState, useEffect, useRef } from 'react';
import { Modal, Form, InputGroup, Row, Col, Button, Figure, Container } from 'react-bootstrap';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import './ModalForm.css';
import Task from '../Data/Task';

export default function ModalForm(props) {
	const location = useLocation();
	const params = useParams();

	// Task states
	const [title, setTitle] = useState(
		location.state ? location.state.task.description : '' // TODO: fix this!
	);
	const [is_private, setIsPrivate] = useState(
		location.state ? location.state.task.is_private : false
	);
	const [date, setDate] = useState(
		location.state && location.state.task.deadline ? location.state.task.deadline : ''
	);

	const images_array = [
		{
			image_name: 'image0',
			image_path: `${process.env.PUBLIC_URL + '/Images/image0.jpg'}`,
			positions_class: 'positions-image0',
			n_text_fields: 2
		},
		{
			image_name: 'image1',
			image_path: `${process.env.PUBLIC_URL + '/Images/image1.jpg'}`,
			positions_class: 'positions-image1',
			n_text_fields: 1
		},
		{
			image_name: 'image2',
			image_path: `${process.env.PUBLIC_URL + '/Images/image2.jpg'}`,
			positions_class: 'positions-image2',
			n_text_fields: 1
		},
		{
			image_name: 'image3',
			image_path: `${process.env.PUBLIC_URL + '/Images/image3.jpg'}`,
			positions_class: 'positions-image3',
			n_text_fields: 2
		},
		{
			image_name: 'image4',
			image_path: `${process.env.PUBLIC_URL + '/Images/image4.jpg'}`,
			positions_class: 'positions-image4',
			n_text_fields: 3
		},
		{
			image_name: 'image5',
			image_path: `${process.env.PUBLIC_URL + '/Images/image5.jpg'}`,
			positions_class: 'positions-image5',
			n_text_fields: 2
		}
	];
	
	// Selected image for meme
	const [index_curimg, setIndexCurImg] = useState(0);

	// Sets a new image and reset text fields/checkboxes
	const handleIndexCurImg = (val) => {
		resetTextsAndStyle();
		setIndexCurImg(val); 
	};

	// Text fields
    const [text1, setText1] = useState(location.state ? location.state.meme.text1 : '');
    const [text2, setText2] = useState(location.state ? location.state.meme.text2 : '');
    const [text3, setText3] = useState(location.state ? location.state.meme.text3 : '');

	// Text style (font, size, color, ecc.)
    const [text_font, setTextFont] = useState(location.state ? location.state.meme.text_font : 'Impact');
    const [text_size, setTextSize] = useState(location.state ? location.state.meme.text_size : 16);
	const [text_color, setTextColor] = useState(location.state ? location.state.meme.text_color : 'black');
    const [text_bold, setTextBold] = useState(location.state ? location.state.meme.text_bold : '');
    const [text_italic, setTextItalic] = useState(location.state ? location.state.meme.text_italic : '');
    const [text_upper_case, setTextUpperCase] = useState(location.state ? location.state.meme.text_upper_case : 'uppercase');

	// Handles text style
	const handleTextFont = (event) => {
        setTextFont(event.target.value);
    };
	const handleTextSize = (event) => {
        setTextSize(event.target.value);
    };
	const handleTextColor = (event) => {
        setTextColor(event.target.value);
    };

	// Forces first char of text #1 to upper case
	const handleText1 = (event) => {
		setText1(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
		/*validateText1(event.target.value);*/
	};
	// Forces first char of text #2 to upper case
	const handleText2 = (event) => {
		setText2(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
		/*validateText2(event.target.value);*/
	};
	// Forces first char of text #3 to upper case
	const handleText3 = (event) => {
		setText3(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
		/*validateText3(event.target.value);*/
	};

	// Reset all fields/checkboxes
	const resetTextsAndStyle = () => {
		setTextFont('Impact');
		setTextSize(16);
		setTextColor('black');
		setTextBold('');
		setTextItalic('');
		setTextUpperCase('uppercase');
		setText1('');
		setText2('');
		setText3('');
	};

	// Form validated state
	// `undefined` = no changes to description nor Add button press
	// this avoids validation before the user has interacted with the Modal
	const [validated, setValidated] = useState(location.state ? true : undefined);
	
	// Form submitted state
	const [submitted, setSubmitted] = useState(false);

	const handleTitle = (event) => {
		setTitle(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
		validateTitle(event.target.value);
	};

	// Verifies that the title fields is set
	const validateTitle = (title) => {
		setValidated(!!title);
	};

	// Resets states to the initial values
	const resetStates = () => {
		setValidated(undefined);
		setTitle('');
		setIsPrivate(false);
		setDate('');
	};

	// Handles Cancel Button
	const handleCancelButton = () => {
		handleIndexCurImg(0);
		resetStates();
		resetTextsAndStyle();
		setSubmitted(true);
	};

	/* Handles Confirm Button:
	 *  - checks `description`
	 *  - and (in case) creates a new task adding it to the tasks list
	 */
	const handleConfirmButton = (event) => {
		event.preventDefault();
		event.stopPropagation();

		// set the validation status to itself
		// avoiding the undefined state
		setValidated(!!validated);

		if (validated) {
			const dateMeme = ''; // TODO: fix this!
			const meme = new Task(
				location.state ? location.state.task.id : undefined,
				title,
				is_private,
				dateMeme,
				location.state ? location.state.task.checked : false
			);
			resetStates();
			props.addOrEditTask(meme);
			setSubmitted(true);
		}
	};

	// This allows the description to be automatically focused
	const descriptionRef = useRef();
	useEffect(() => {
		descriptionRef.current && descriptionRef.current.focus();
	}, []);

	if (submitted) {
		return <Redirect to={'/' + (params.filter ? params.filter : '')} />;
	}

	return (
		<Modal size="xl" animation={true} show={true} backdrop="static" keyboard={false} centered>
			
			<Modal.Header>
				<Modal.Title className="modal-title">
					{location.state ? 'Clone meme' : 'Add a new meme'}
				</Modal.Title>
			</Modal.Header>
			
			<Modal.Body>
				<Container>
					<Form noValidate onSubmit={handleConfirmButton}>
						<Container>

							{/* Row 1 : images thumbnails */}
							<Row className={location.state ? 'd-none' : ''}>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[0].image_path} thumbnail
										onClick={() => handleIndexCurImg(0)}
									/>
								</Figure>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[1].image_path} thumbnail
										onClick={() => handleIndexCurImg(1)}
									/>
								</Figure>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[2].image_path} thumbnail
										onClick={() => handleIndexCurImg(2)}
									/>
								</Figure>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[3].image_path} thumbnail
										onClick={() => handleIndexCurImg(3)}
									/>
								</Figure>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[4].image_path} thumbnail
										onClick={() => handleIndexCurImg(4)}
									/>
								</Figure>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[5].image_path} thumbnail
										onClick={() => handleIndexCurImg(5)}
									/>
								</Figure>
							</Row>

							<hr/>

							{/* Row 2: Selected image, meme title and `private` checkbox */}
							<Row d-flex justify-content-center>
								
								{/* {Row2, Col1}: Selected image */}
								<Col xl={4} lg={6} xs={12}>
									<section
										className={"bgimg " + images_array[index_curimg].positions_class}
										style={{ backgroundImage: "url(" + images_array[index_curimg].image_path + ")" }}>

										<div
											style={{
												fontFamily: `${text_font}`,
												fontSize: `${text_size}px`,
												color: `${text_color}`,
												fontWeight: `${text_bold}`,
												fontStyle: `${text_italic}`,
												textTransform: `${text_upper_case}`
											}}
										>
											{text1}
										</div>

										<div
											className={images_array[index_curimg].n_text_fields > 1 ? "" : "d-none"}
											style={{
												fontFamily: `${text_font}`,
												fontSize: `${text_size}px`,
												color: `${text_color}`,
												fontWeight: `${text_bold}`,
												fontStyle: `${text_italic}`,
												textTransform: `${text_upper_case}`
											}}
										>
											{text2}
										</div>
										
										<div
											className={images_array[index_curimg].n_text_fields > 2 ? "" : "d-none"}
											style={{
												fontFamily: `${text_font}`,
												fontSize: `${text_size}px`,
												color: `${text_color}`,
												fontWeight: `${text_bold}`,
												fontStyle: `${text_italic}`,
												textTransform: `${text_upper_case}`
											}}
										>
											{text3}
										</div>

									</section>
								</Col>

								{/* {Row2, Col2}: Text fields */}
								<Col xl={4} lg={6} xs={12} className="pt-lg-5 pt-md-4">

									{/* Text #1 */}
									<Form.Group className="pt-lg-2">
										<Form.Label style={{ fontSize: '115%' }}>
											Text fields
										</Form.Label>
										{/* <Form.Label>Text #1</Form.Label> */}
										<InputGroup>
											<Form.Control
												type="text"
												placeholder="Text #1"
												value={text1}
												onChange={(ev) => handleText1(ev)}
												required
												ref={descriptionRef}
												isValid={validated}
												isInvalid={validated === undefined ? undefined : !validated}
											/>
											<Form.Control.Feedback type="invalid">
												Please insert text.
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>

									{/* Text #2 */}
									<Form.Group>
										{/* <Form.Label>Text #2</Form.Label> */}
										<InputGroup>
											<Form.Control
												type="text"
												placeholder="Text #2"
												value={text2}
												onChange={(ev) => handleText2(ev)}
												required={images_array[index_curimg].n_text_fields > 1 ? true : false}
												ref={descriptionRef}
												isValid={validated}
												isInvalid={validated === undefined ? undefined : !validated}
												disabled={images_array[index_curimg].n_text_fields > 1 ? false : true}
											/>
											{images_array[index_curimg].n_text_fields > 1 ? <Form.Control.Feedback type="invalid">Please insert text.</Form.Control.Feedback> : <></>}
										</InputGroup>
									</Form.Group>

									{/* Text #3 */}
									<Form.Group>
										{/* <Form.Label>Text #3</Form.Label> */}
										<InputGroup>
											<Form.Control
												type="text"
												placeholder="Text #3"
												value={text3}
												onChange={(ev) => handleText3(ev)}
												required={images_array[index_curimg].n_text_fields > 2 ? true : false}
												ref={descriptionRef}
												isValid={validated}
												isInvalid={validated === undefined ? undefined : !validated}
												disabled={images_array[index_curimg].n_text_fields > 2 ? false : true}
											/>{images_array[index_curimg].n_text_fields > 2 ? <Form.Control.Feedback type="invalid">Please insert text.</Form.Control.Feedback> : <></>}
										</InputGroup>
									</Form.Group>

								</Col>

								{/* {Row2, Col3}: Text styles */}
								<Col xl={4} lg={12} xs={12} className="pt-xl-5 pt-md-4">

									<Form.Group className="pt-xl-3 pt-md-0">
										<Form.Row>
											<Form.Label column="sm" xs={2} className="pl-2">
												Font
											</Form.Label>
											<Col xs={5} className="pl-0">
												<Form.Control
													size="sm"
													type="text"
													as="select"
													multiple
													custom
													onChange={handleTextFont.bind(this)}
												>
													<option selected={text_font === 'Impact' ? true : false} style={{ fontFamily: 'Impact' }}>Impact</option>
													<option selected={text_font === 'monospace' ? true : false} style={{ fontFamily: 'monospace' }}>monospace</option>
													<option selected={text_font === 'Arial' ? true : false} style={{ fontFamily: 'Arial' }}>Arial</option>
													<option selected={text_font === 'Georgia' ? true : false} style={{ fontFamily: 'Georgia' }}>Georgia</option>
												</Form.Control>
											</Col>
											<Form.Label column="sm" xs={2} className="pl-3">
												Size
											</Form.Label>
											<Col xs={3} className="pl-0">
												<Form.Control
													size="sm"
													type="text"
													as="select"
													custom
													onChange={handleTextSize.bind(this)}
												>
													<option selected={text_size === 16 ? true : false}>16</option>
													<option selected={text_size === 20 ? true : false}>20</option>
													<option selected={text_size === 24 ? true : false}>24</option>
												</Form.Control>
											</Col>
										</Form.Row>
									</Form.Group>
									
									<Form.Group>
										<Form.Row>
											<Form.Label column="sm" xs={2} className="pl-2">
												Color
											</Form.Label>
											<Col xs={10} className="pl-0">
												<Form.Control
													size="sm"
													type="text"
													as="select"
													custom
													onChange={handleTextColor.bind(this)}
												>
													<option selected={text_color === 'Black' ? true : false}>Black</option>
													<option selected={text_color === 'Red' ? true : false}>Red</option>
													{index_curimg !== 0 ? <option selected={text_color === 'White' ? true : false}>White</option> : <></>}
												</Form.Control>
											</Col>
										</Form.Row>
									</Form.Group>

									<Form.Group>
										<Row>
											<Col xs={{ span: 2, offset: 2 }} className="font-weight-bolder pl-2">
												<Form.Check
													custom
													inline
													type="checkbox"
													label="Bold"
													id="checkbox_bold"
													checked={text_bold}
													onChange={() => text_bold === '' ? setTextBold('bold') : setTextBold('')}
												/>
											</Col>
											<Col xs={{ span: 2, offset: 1 }} className="font-italic">
												<Form.Check
													custom
													inline
													type="checkbox"
													label="Italic"
													id="checkbox_italic"
													checked={text_italic}
													onChange={() => text_italic === '' ? setTextItalic('italic') : setTextItalic('')}
												/>
											</Col>
											<Col xs={{ span: 2, offset: 1 }}>
												<Form.Check
													custom
													inline
													type="checkbox"
													label="ALLCAPS"
													id="checkbox_all_caps"
													checked={text_upper_case}
													onChange={() => text_upper_case === '' ? setTextUpperCase('uppercase') : setTextUpperCase('')}
												/>
											</Col>
										</Row>
									</Form.Group>

								</Col>

							</Row>

							<hr/>

							{/* Row 3: Meme title and private checkbox */}
							<Row>

								{/* Meme title (label) */}
								<Col lg={4} xs={12}>
									<Form.Label className="pt-2" style={{ fontWeight: '500' }}>
										Remember to give it an epic title...
									</Form.Label>
								</Col>

								{/* Meme title (form) */}
								<Col lg={4} xs={12}>
									<Form.Control
										type="text"
										placeholder="Meme title"
										value={title}
										onChange={(ev) => handleTitle(ev)}
										required
										ref={descriptionRef}
										isValid={validated}
										isInvalid={validated === undefined ? undefined : !validated}
									/>
									<Form.Control.Feedback type="invalid">
										Please insert a title.
									</Form.Control.Feedback>
								</Col>
								
								{/* Private checkbox */}
								<Col lg={{ span: 3, offset: 1 }} xs={12} className="pt-2 pl-xl-4">
									<Form.Check
										custom
										inline
										type="checkbox"
										label="Private"
										id="checkbox_private"
										checked={is_private}
										onChange={() => setIsPrivate((isp) => !isp)}
									/>
									<Form.Label>
										<small>(only you can enjoy it)</small>
									</Form.Label>
								</Col>

							</Row>

						</Container>
					</Form>
				</Container>

			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleCancelButton}>
					Cancel
				</Button>
				<Button variant="primary" onClick={handleConfirmButton} className="px-4 mr-5">
					{location.state ? 'Clone' : 'Add'}
				</Button>
			</Modal.Footer>

		</Modal>
	);
};
