import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Collapse from './MyCollapse';
import './Sidebar.css';

/*
 * Filter uses `name` to define its label and
 * `type` to define `NavLink` `to` path.
 * The active filter is deduced from the current path.
 */
function FilterEntry(props) {
	// Can't use ListGroup.Item as child of NavLink,
	// so we use it directly via `className`
	return (
		<NavLink
			to={'/' + props.type}
			className="list-group-item list-group-item-action d-flex justify-content-center justify-content-md-start"
			activeClassName="active avoid-clicks"
			replace={false}
			onClick={() => props.setSidebarCollapse(false)}
		>
			{props.name}
		</NavLink>
	);
}

/*
 * Sidebar uses the `sidebarCollapse` property to toggle its visibility,
 * the `filters` property to specify the filters list, and the
 * `setSidebarCollapse` prop to allow the sidebar to close when a filter
 * is clicked.
 */
export default function Sidebar(props) {
	const filters_list = props.filters.map((f) => (
		<FilterEntry
			type={f.type}
			name={f.name}
			key={f.type}
			setSidebarCollapse={props.setSidebarCollapse}
		/>
	));
	return (
		<Collapse in={props.sidebarCollapse} className="d-md-block">
			<ListGroup variant="flush" className="filters-list">
				{filters_list}
			</ListGroup>
		</Collapse>
	);
};
