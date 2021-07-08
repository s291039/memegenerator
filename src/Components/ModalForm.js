import { useState, useEffect, useRef } from 'react';
import { Modal, Form, InputGroup, Row, Col, Button, Figure, Image, Container } from 'react-bootstrap';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import './ModalForm.css';
import Task from '../Data/Task';

export default function ModalForm(props) {
	const location = useLocation();
	const params = useParams();

	// Task states
	const [description, setDescription] = useState(
		location.state ? location.state.task.description : ''
	);
	const [important, setImportant] = useState(
		location.state ? location.state.task.important : false
	);
	const [is_private, setIsPrivate] = useState(
		location.state ? location.state.task.is_private : false
	);
	const [deadline, setDeadline] = useState(
		location.state && location.state.task.deadline
			? location.state.task.deadline
			: ''
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
			n_text_fields: 4
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

	// Text style (font, color, ecc.)
	const [text_style, setTextStyle] = useState("");

	// Add another text style (ex. bold + color)
	const addTextStyle = (extra_style) => {
		setTextStyle(text_style + ' ' + extra_style);
	};


	// Form validated state
	// `undefined` = no changes to description nor Confirm button press
	// this avoids validation before the user has interacted with the Modal
	const [validated, setValidated] = useState(location.state ? true : undefined);
	// Form submitted state
	const [submitted, setSubmitted] = useState(false);

	// Forces first char of description to upper case
	const handleDescription = (event) => {
		setDescription(
			event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
		);
		validateDescription(event.target.value);
	};

	// Verifies that the description is set
	const validateDescription = (descr) => {
		setValidated(!!descr);
	};

	// Creates and returns `deadline` (unix timestamp form) from `date` and/or `time`
	const handleDeadline = () => {
		return deadline ? dayjs(deadline).unix() : undefined;
	};

	// Resets states to the initial values
	const resetStates = () => {
		setValidated(undefined);
		setDescription('');
		setImportant(false);
		setIsPrivate(false);
		setDeadline('');
	};

	// Handles Cancel Button
	const handleCancelButton = () => {
		resetStates();
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
			const deadlineTask = handleDeadline();
			const task = new Task(
				location.state ? location.state.task.id : undefined,
				description,
				important,
				is_private,
				deadlineTask,
				location.state ? location.state.task.checked : false
			);
			resetStates();
			props.addOrEditTask(task);
			setSubmitted(true);
		}
	};

	// this allows the description to be automatically focused
	const descriptionRef = useRef();
	useEffect(() => {
		descriptionRef.current && descriptionRef.current.focus();
	}, []);

	if (submitted) {
		return <Redirect to={'/' + (params.filter ? params.filter : '')} />;
	}

	// `animation={false}` fixes errors caused by Bootstrap and
	// React strict mode. Should be fixed by [1]
	// [1] https://github.com/react-bootstrap/react-bootstrap/pull/5687
	return (
		<Modal
			size="xl"
			animation={false}
			show={true}
			backdrop="static"
			keyboard={false}
			centered
		>
			<Modal.Header>
				<Modal.Title className="modal-title">
					{location.state ? 'Edit meme' : 'Add a new meme'}
				</Modal.Title>
			</Modal.Header>
			
			<Modal.Body>
				<Container>
					<Form noValidate onSubmit={handleConfirmButton}>
						<Container>

							{/* Row 1 : images thumbnails */}
							<Row>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[0].image_path} thumbnail
										onClick={() => setIndexCurImg(0)}
									/>
								</Figure>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[1].image_path} thumbnail
										onClick={() => setIndexCurImg(1)}
									/>
								</Figure>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[2].image_path} thumbnail
										onClick={() => setIndexCurImg(2)}
									/>
								</Figure>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[3].image_path} thumbnail
										onClick={() => setIndexCurImg(3)}
									/>
								</Figure>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[4].image_path} thumbnail
										onClick={() => setIndexCurImg(4)}
									/>
								</Figure>
								<Figure as={Col} lg="2" xs="4" style={{cursor: 'pointer'}}>
									<Figure.Image
										src={images_array[5].image_path} thumbnail
										onClick={() => setIndexCurImg(5)}
									/>
								</Figure>
							</Row>

							<hr/>

							{/* Row 2: Selected image, meme title and `private` checkbox */}
							<Row>
								
								{/* {Row2, Col1}: Selected image */}
								<Col xl={4} lg={6} xs={{ span: 11, offset: 1 }} className="ml-lg-0 ml-sm-4">
									<section
										className={"bgimg " + images_array[index_curimg].positions_class}
										style={{ backgroundImage: "url(" + images_array[index_curimg].image_path + ")" }}>

										<div className={text_style}>
											Questa è una prova per il primo text field...
										</div>

										<div className={images_array[index_curimg].n_text_fields > 1 ? "" : "d-none"}>
											Questa è una prova per il secondo text field...
										</div>
										
										<div className={images_array[index_curimg].n_text_fields > 2 ? "" : "d-none"}>
											Questa è una prova per il terzo text field...
										</div>

									</section>
								</Col>

								{/* {Row2, Col2}: Text fields */}
								<Col xl={4} lg={6} xs={12} className="pt-lg-0 pt-sm-3">
								
									{/* <Form.Group>
										<Form.Label style={{ fontSize: '115%' }}>
											Text fields
										</Form.Label>
									</Form.Group> */}

									{/* Text #1 */}
									<Form.Group>
										{/* <Form.Label>Text #1</Form.Label> */}
										<InputGroup>
											<Form.Control
												type="text"
												placeholder="Text #1"
												value={description}
												onChange={(ev) => handleDescription(ev)}
												required
												ref={descriptionRef}
												isValid={validated}
												isInvalid={validated === undefined ? undefined : !validated}
											/>
											<Form.Control.Feedback type="invalid">
												Please insert a title.
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>

									{/* Text #2 */}
									<Form.Group className={images_array[index_curimg].n_text_fields > 1 ? "" : "d-none"}>
										{/* <Form.Label>Text #2</Form.Label> */}
										<InputGroup>
											<Form.Control
												type="text"
												placeholder="Text #2"
												value={description}
												onChange={(ev) => handleDescription(ev)}
												required
												ref={descriptionRef}
												isValid={validated}
												isInvalid={validated === undefined ? undefined : !validated}
											/>
											<Form.Control.Feedback type="invalid">
												Please insert a title.
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>

									{/* Text #3 */}
									<Form.Group className={images_array[index_curimg].n_text_fields > 2 ? "" : "d-none"}>
										{/* <Form.Label>Text #3</Form.Label> */}
										<InputGroup>
											<Form.Control
												type="text"
												placeholder="Text #3"
												value={description}
												onChange={(ev) => handleDescription(ev)}
												required
												ref={descriptionRef}
												isValid={validated}
												isInvalid={validated === undefined ? undefined : !validated}
											/>
											<Form.Control.Feedback type="invalid">
												Please insert a title.
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>

								</Col>

								{/* {Row2, Col3}: Text styles */}
								<Col xl={4} lg={12} xs={12} className="pt-xl-0 pt-lg-3">
									
									{/* <Form.Group>
										<Form.Label style={{ fontSize: '115%', textIndent: '3em' }}>
											Text styles
										</Form.Label>
									</Form.Group> */}

									<Form.Group>
										<Form.Row>
											<Form.Label column="sm" xs={2}>
												Font
											</Form.Label>
											<Col xs={10} className="pl-0">
												<Form.Control
													size="sm"
													type="text"
													as="select"
													id="inlineFormCustomSelect"
													custom
												>
													<option value="1">Impact</option>
													<option value="2">Arial</option>
													<option value="3">Georgia</option>
												</Form.Control>
											</Col>
										</Form.Row>
									</Form.Group>

									<Form.Group>
										<Form.Row>
											<Form.Label column="sm" xs={2}>
												Color
											</Form.Label>
											<Col xs={10} className="pl-0">
												<Form.Control
													size="sm"
													type="text"
													as="select"
													id="inlineFormCustomSelect"
													custom
												>
													<option value="1">Black</option>
													<option value="2">White</option>
													<option value="3">Red</option>
												</Form.Control>
											</Col>
										</Form.Row>
									</Form.Group>

									<Form.Group>
										<Row>
											<Col xs={{ span: 4, offset: 2 }} className="font-weight-bolder pl-2">
												<Form.Check
													custom
													inline
													type="checkbox"
													label="Bold"
													id="form_bold"
													checked={is_private}
													onChange={() => setIsPrivate((isp) => !isp)}
												/>
											</Col>
											<Col xs={{ span: 4, offset: 2 }} className="font-italic pl-4">
												<Form.Check
													custom
													inline
													type="checkbox"
													label="Italic"
													id="form_italic"
													checked={is_private}
													onChange={() => setIsPrivate((isp) => !isp)}
												/>
											</Col>
										</Row>
									</Form.Group>

									<Form.Group>
										<Row>
											<Col xs={{ span: 4, offset: 2 }} className="pl-2">
												<Form.Check
													custom
													inline
													type="checkbox"
													label="ALLCAPS"
													id="form_italic"
													checked={is_private}
													onChange={() => setIsPrivate((isp) => !isp)}
												/>
											</Col>
											<Col xs={{ span: 4, offset: 2 }} className="text-monospace pl-4">
												<Form.Check
													custom
													inline
													type="checkbox"
													label="Mono"
													id="form_bold"
													checked={is_private}
													onChange={() => setIsPrivate((isp) => !isp)}
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
									<Form.Label className="pt-2" style={{ fontSize: '105%' }}>
										Remember to give it an epic title...
									</Form.Label>
								</Col>

								{/* Meme title (form) */}
								<Col lg={4} xs={12}>
									<Form.Control
										type="text"
										placeholder="Meme title"
										value={description}
										onChange={(ev) => handleDescription(ev)}
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
								<Col lg={4} xs={12} className="pt-2">
									<Form.Check
										custom
										inline
										type="checkbox"
										label="Private"
										id="form_is_private"
										checked={is_private}
										onChange={() => setIsPrivate((isp) => !isp)}
									/>
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
				<Button variant="primary" onClick={handleConfirmButton} className="mr-5">
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
