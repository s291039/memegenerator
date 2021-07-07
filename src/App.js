import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	Redirect,
} from 'react-router-dom';
import './App.css';

// Components
import MyNavbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import MainContent from './Components/MainContent';
import PlusButton from './Components/PlusButton';
import ModalForm from './Components/ModalForm';
import Filters from './Components/Filters';
// Data
import FAKE_TASKS from './Data/fakeTasks';
import TaskManager from './Data/TaskManager';

const taskManager = new TaskManager();
taskManager.loadJSON(FAKE_TASKS);
const filters = Filters.getFilters();
const defaultFilter = filters[0];

export default function App() {
	const [sidebarCollapse, setSidebarCollapse] = useState(false);
	return (
		<Router>
			<Switch>
				{/* Redirect to default filter if no filter is specified */}
				<Redirect exact from="/" to={'/' + defaultFilter.type} />
				<Redirect from="/add" to={'/' + defaultFilter.type + '/add'} />
				<Redirect from="/edit" to={'/' + defaultFilter.type + '/edit'} />
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
												// redirect to normal page
												return location.state ? (
													<ModalForm addOrEditTask={taskManager.editTask} />
												) : (
													<Redirect to={'/' + matched_filter} />
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
