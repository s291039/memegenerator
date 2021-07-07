import { Navbar, Dropdown, Col } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';

export default function MyNavbar(props) {
	return (
		<Navbar bg="dark" variant="dark" expand="md" className="px-0">

			{/* Toggle (icon): visible only in md and lower */}
			<Col xs={{ span: 4, order: 1 }} className="d-inline d-md-none">
				<Icons.List
					className="ml-2 cursor-pointer"
					color="white"
					size="2.1em"
					onClick={() => props.setSidebarCollapse((state) => !state)}
				/>
			</Col>

			{/* Brand (label and icon) */}
			<Col
				xs={{ span: 4, order: 2 }}
				md={{ span: 4, order: 1 }}
				className="d-flex justify-content-md-start justify-content-center"
			>
				{/* Content left-aligned in lg and xl, center-aligned otherwise */}
				<Navbar.Brand>
					<Icons.Images color="white" size="1.3em" className="mb-1 mr-1" />
					Meme Generator
				</Navbar.Brand>
			</Col>

			{/* User (icon) */}
			<Col
				xs={{ span: 4, order: 2 }}
				md={{ span: 8, order: 2 }}
				className="d-flex justify-content-end"
			>
				{/* Content right-aligned */}
				<Dropdown>
					<Dropdown.Toggle
						variant="light"
						size="sm"
						id="dropdown-basic">
					<Icons.PersonCircle
						className="mr-2 cursor-pointer"
						color="#353A40"
						size="1.7em"
					/>
						<Dropdown.Menu
							size="sm"
							align='right'>
							<Dropdown.Item>
								{/* onClick={handleLogout} */}
								Logout
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown.Toggle>
                </Dropdown>
			</Col>

		</Navbar>
	);
};
