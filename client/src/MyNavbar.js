import { Navbar, FormControl, Col, Nav, Dropdown, Container } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './meme.css';
import './rainbowText.css'



function MyNavbar(props) {
    return (
        <Navbar style={{ backgroundColor: '#003366' }} expand="lg">
            <Col className="d-block d-sm-none px-2" >
                <Dropdown>
                    <Dropdown.Toggle style={{color: "black" }} id="dropdown-basic">
                        <Icons.ThreeDotsVertical  size="1.3em" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col className="d-flex justify-content-center d-none d-sm-block px-2" style={{ top: '0' }}>
                <Link to="/main" style={{ color: '#003366' }}>
                    <Navbar.Brand className ="rainbow-text" >
                        MemeGenerator</Navbar.Brand>
                </Link>
            </Col>
            <Col className="d-flex justify-content-center d-block d-sm-none px-2" style={{ top: '0' }}>
                <Link to="/main" style={{ color: '#003366' }}>
                    <Navbar.Brand className ="rainbow-text">MemeGenerator</Navbar.Brand>
                </Link>
            </Col>

            <Col className="d-flex justify-content-end px-2">
                <Icons.PersonCircle color="white" size="1.6em" className="mr-1" />
            </Col>
        </Navbar >

    );
}

export default MyNavbar;

//Hiding element when screen is small/large:  https://getbootstrap.com/docs/4.4/utilities/display/
//PADDING: https://mdbootstrap.com/docs/b5/react/utilities/spacing/
//Usere px-2 per aggiungere padding orizzontale e distanziare gli oggetti dal margine. px-sm-2 per aggiungere solo a finestra small
//Usare p-2 per aggiungerre padding in tutti i lati