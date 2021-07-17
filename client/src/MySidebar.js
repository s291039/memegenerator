import { ListGroup } from 'react-bootstrap';
import './MySidebar.css';


function MySidebar(props) {

    return (
        <ListGroup className="mt-1 text-center text-align-center d-none d-sm-block" variant="flush">
            <ListGroup.Item onClick={() => props.setFilter("All")} active={props.activeFilter === "All" ? true : false}>All</ListGroup.Item>
            <ListGroup.Item onClick={() => props.setFilter("Today")} active={props.activeFilter === "Today" ? true : false}>Today</ListGroup.Item>
            <ListGroup.Item onClick={() => props.setFilter("Last 7 days")} active={props.activeFilter === "Last 7 days" ? true : false}>Last 7 days</ListGroup.Item>
            {props.user != null && <ListGroup.Item onClick={() => props.setFilter("My Memes")} active={props.activeFilter === "My Memes" ? true : false}>My Memes</ListGroup.Item>}
        </ListGroup>
    );
}

export default MySidebar;