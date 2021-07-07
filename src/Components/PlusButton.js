import { Button } from 'react-bootstrap';
import './PlusButton.css';

export default function PlusButton(props) {
	return (
		<Button variant="primary" className="btn rounded-circle">
			<strong>+</strong>
		</Button>
	);
};
