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

	const images_path = [];
	for (let i=1; i<=12; i++) {
		images_path[i] = `${process.env.PUBLIC_URL + '/Images/image' + i + '.jpg'}`;
	}
	
	// Selected image for meme
	const [index_current_image, setIndexCurrentImage] = useState(1);

	// Text style (font, color, ecc.)
	const [text_style, setTextStyle] = useState("");

	// Add another text style (ex. bold + color)
	const addTextStyle = (extra_style) => {
		setTextStyle(text_style + extra_style);
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

			<Row>
				<Col lg={{ span: 4, order: 1}} md={{ span: 12, order: 2}}>
					<section
						className="top-center bgimg"
						style={{ backgroundImage: 'url(' + images_path[index_current_image] + ')' }}>

						<div className="text_style">
							Questa è una prova per il secondo meme...
						</div>

					</section>
				</Col>

				<Col lg={{ span: 8, order: 2}} md={{ span: 12, order: 1}}>
					
					<Row>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Figure.Image
								src={images_path[1]} thumbnail
								onClick={() => setIndexCurrentImage(1)}
								/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Figure.Image
								src={images_path[2]} thumbnail
								onClick={() => setIndexCurrentImage(2)}
								/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Image
								src={images_path[3]} thumbnail
								onClick={() => setIndexCurrentImage(3)}
								/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Image
								src={images_path[4]} thumbnail
								onClick={() => setIndexCurrentImage(4)}
								/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Image
								src={images_path[5]} thumbnail
								onClick={() => setIndexCurrentImage(5)}
							/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Image
								src={images_path[6]} thumbnail
								onClick={() => setIndexCurrentImage(6)}
							/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Image
								src={images_path[7]} thumbnail
								onClick={() => setIndexCurrentImage(7)}
							/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Image
								src={images_path[8]} thumbnail
								onClick={() => setIndexCurrentImage(8)}
							/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Image
								src={images_path[9]} thumbnail
								onClick={() => setIndexCurrentImage(9)}
								/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Image
								src={images_path[10]} thumbnail
								onClick={() => setIndexCurrentImage(10)}
								/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Image
								src={images_path[11]} thumbnail
								onClick={() => setIndexCurrentImage(11)}
								/>
						</Figure>
						<Figure as={Col} lg="2" sm="3" style={{cursor: 'pointer'}}>
							<Image
								src={images_path[12]} thumbnail
								onClick={() => setIndexCurrentImage(12)}
								/>
						</Figure>
					</Row>

					<Form noValidate onSubmit={handleConfirmButton}>

						<Form.Group>
							<Form.Label>Title</Form.Label>
							<InputGroup>
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
							</InputGroup>
						</Form.Group>

						{/* <Form.Group>
							<Form.Label>Deadline</Form.Label>
							<Row className="align-items-center">
								<Col>
									<Form.Control
										type="datetime-local"
										value={deadline}
										onChange={(ev) => setDeadline(ev.target.value)} // `deadline` will be in the format: 'YYYY-MM-DDTHH:mm'
									/>
								</Col>
								<Col xs="auto">
									<Button
										variant="outline-dark"
										size="sm"
										onClick={() => setDeadline('')}
										disabled={!deadline}
									>
										No deadline
									</Button>
								</Col>
							</Row>
						</Form.Group> */}

						<Form.Group>
							<Row className="align-items-center">
								<Col xs="auto">
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
						</Form.Group>
					</Form>
					
				</Col>
			</Row>

			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCancelButton}>
					Cancel
				</Button>
				<Button variant="primary" onClick={handleConfirmButton}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
