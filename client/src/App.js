import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Image, Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';

// Components
import MyNavbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import MainContent from './Components/MainContent';
import PlusButton from './Components/PlusButton';
import ModalForm from './Components/ModalForm';
import Filters from './Components/Filters';
import LoginForm from './Components/LoginForm';

// Data
import FAKE_TASKS from './Data/fakeTasks';
import TaskManager from './Data/TaskManager';

const taskManager = new TaskManager();
taskManager.loadJSON(FAKE_TASKS);
const filters = Filters.getFilters();
const default_filter = filters[0];

export default function App() {
	const [sidebarCollapse, setSidebarCollapse] = useState(false);
	const [loggedUser, setLoggedUser] = useState(undefined);
{/*const [toasts, setToasts] = useState(toastManager.getToasts());*/}

	{/*
	useEffect(() => {
		getLoggedUser().then((username) => {
		  setUserName(username);
		});
	  }, []);
	*/}

	return (
		<Router>
			<Switch>
				{/* Redirect to default filter if no filter is specified */}
				<Redirect exact from="/" to={'/' + default_filter.type} />
				<Redirect from="/add" to={'/' + default_filter.type + '/add'} />
				<Redirect from="/edit" to={'/' + default_filter.type + '/edit'} />
				<Redirect from="/login" to={'/' + default_filter.type + '/login'} />
				<Redirect from="/register" to={'/' + default_filter.type + '/register'}
				/>

				{/* <Route
					exact path="/logout"
					render={() => {
						// no need to logout if not logged in
						if (!loggedUser) {
							return <Redirect to="/" />;
						}

						api.logout().finally(() => {
							setLoggedUser(undefined);
						});
						return <Loading text="Logging out" />;
					}}
				/> */}

				<Route
					exact
					path='/'
					render={() =>
						<div className="App">
							<Row className="home-row" style={{ marginTop: "30%" }}>
								<Col md={{ span: 4, offset: 2 }} xs={{ span: 5, offset: 1 }}>
									<Button className="home-button" variant="dark">
										Login
									</Button>
								</Col>
								<Col md={{ span: 4 }} xs={{ span: 5 }}>
								<Link to="/main">
									<Button className="home-button" variant="dark">
										Guest
									</Button>
									</Link>
								</Col>
							</Row>
						</div>
					}
				/>
				
				<Route
					path={'/:filter'}
					render={({ match }) => {
						let matched_filter;
						if (match.params.filter) {
							matched_filter = filters.find(
								(f) => f.type === match.params.filter
							);
						}
						if (!matched_filter) {
							// The filter type was not known, redirect to start
							return <Redirect to="/" />;
						}
						return (
							<>
								<div className="page-wrapper">
									<Switch>
										<Route exact path="/:filter/add">
											<ModalForm addOrEditTask={taskManager.addNewTask} />
										</Route>
										<Route
											exact
											path="/:filter/edit"
											render={({ location }) => {
												// if there is no specified task to edit
												// nor the user is logged in
												// redirect to normal page
												return loggedUser && location.state ? (
													<ModalForm addOrEditTask={taskManager.editTask} />
												) : (
													<Redirect to={'/' + matched_filter.type} />
												);
											}}
										/>

										<Route exact path="/:filter">
											{/* There is nothing after the filter, so continue */}
										</Route>

										<Route>
											{/* There is something after the filter that is not recognised, so we remove it */}
											<Redirect to={'/' + matched_filter.type} />
										</Route>
									</Switch>
									<Row>
										<Col>
											<MyNavbar setSidebarCollapse={setSidebarCollapse} />
										</Col>
									</Row>
									<Row className="main-row scrollbar">
										<Col md={2} className="px-0 sticky sidebar">
											<Sidebar
												sidebarCollapse={sidebarCollapse}
												setSidebarCollapse={setSidebarCollapse}
												filters={filters}
											/>
										</Col>
										<Col md={10}>
											<MainContent
												filter={matched_filter}
												taskManager={taskManager}
											/>
										</Col>
									</Row>
								</div>
								<Link to={{ pathname: '/' + matched_filter.type + '/add' }}>
									<PlusButton />
								</Link>
							</>
						);
					}}
				/>
			</Switch>
		</Router>
	);
};

/*
 * Diagram for routes
 *
 *         /default_filter/edit
 *        +----------------------------------+
 *        |/default_filter/add               |
 *        +-----------------------+          |
 *        |/default_filter        |          |
 *        +-----------+           |          |
 *        |           |y          |y         |y
 *   START|        +--+----+    +-+--+    +--+--+
 *   ----->-------->exact /|n--->/add|n--->/edit|n-+
 *        |        +-------+    +----+    +-----+  |
 *        |                                        |
 *        |       +---------------+  +--------+    |
 *        +------n|matched_filter?<--+/:filter+----+
 *        |   /   +-------+-------+  +--------+
 *        |               |y
 *        |        +------v-----+    +---------+
 *        |        |/:filter/add|y--->Modal/add+----------------+
 *        |        +------+-----+    +---------+                |
 *        |               |n                                    |
 *        |        +------v------+   +-----+   +----------+     |
 *        |        |/:filter/edit|y-->Task?|y-->Modal/edit+-----+
 *        |        +------+------+   +--+--+   +----------+     |
 *        |               |n            |n                      |
 *        |      +-------=|=------------+                       |
 *        |      |        |                                     |
 *        |      |   +----v---+      +----------------+         |
 *        +------+--n|/:filter|y----->Rest of the page<---------+
 * /matched_filter   +--------+      +----------------+
 */
