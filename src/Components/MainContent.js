import { useState, useEffect, useCallback } from 'react';
import { Table, Form, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import * as Icons from 'react-bootstrap-icons';
import './MainContent.css';

const calendar_opt = {
	sameDay: '[Today at] HH:mm', // The same day ( Today at 2:30 AM )
	nextDay: '[Tomorrow at] HH:mm', // The next day ( Tomorrow at 2:30 AM )
	nextWeek: 'dddd D MMMM YYYY [at] HH:mm', // The next week ( Sunday at 2:30 AM )
	lastDay: '[Yesterday at] HH:mm', // The day before ( Yesterday at 2:30 AM )
	lastWeek: 'dddd D MMMM YYYY [at] HH:mm', // Last week ( Last Monday at 2:30 AM )
	sameElse: 'dddd D MMMM YYYY [at] HH:mm', // Everything else ( 7/10/2011 )
};

function TaskEntry(props) {
	const [checked, setChecked] = useState(props.task.checked);

	const deadlineString = props.task.deadline
		? props.task.deadline.calendar(null, calendar_opt)
		: '';
	const params = useParams();
	const active_filter = params.filter ? '/' + params.filter : '';
	return (
		<Row as="tr" className={props.task.important ? 'important' : ''}>
			<Col as="td" className="user-select-none p-3">
				<Form.Check
					custom
					inline
					type="checkbox"
					label={
						checked ? (
							<del>{props.task.description}</del>
						) : (
							props.task.description
						)
					}
					id={'task_' + props.task.id}
					checked={checked}
					onChange={useCallback(() => {
						setChecked((old) => !old);
						const newTask = props.task.getCopy();
						newTask.checked = !newTask.checked;
						props.updateTask(newTask);
					}, [props])}
				/>
			</Col>
			<Col as="td" xs="auto" className="text-center p-3 text-align-center">
				{props.task.is_private && <Icons.PersonFill color="black" />}
			</Col>
			<Col as="td" className="text-right text-truncate p-3 d-none d-sm-block">
				<small>{deadlineString}</small>
			</Col>
			<Col as="td" xs="auto" className="text-right p-3 text-align-center">
				<Link
					to={{
						pathname: active_filter + '/edit',
						state: { task: props.task.getSimpleTask() },
					}}
				>
					<Icons.PencilSquare color="black" className="mr-2" />
				</Link>
				<Link
					to={{ pathname: active_filter }}
					onClick={() => {
						props.deleteTask(props.task.id);
					}}
				>
					<Icons.Trash color="red" className="mr-1" />
				</Link>
			</Col>
		</Row>
	);
}

export default function MainContent(props) {
	const [tasks, setTasks] = useState([]);

	const updateTasks = useCallback(() => {
		setTasks(props.taskManager.filteredList(props.filter));
	}, [props.filter, props.taskManager]);

	useEffect(() => {
		updateTasks();
	}, [updateTasks]);

	useEffect(() => {
		props.taskManager.subscribe('MainContent', updateTasks);
		return () => {
			props.taskManager.unsubscribe('MainContent');
		};
	}, [props.taskManager, updateTasks]);

	return (
		<div className="todo-list my-2">
			<h1 className="ml-3">{props.filter.name}</h1>
			<div className="mx-3">
				<Table hover>
					<tbody className="todo-table">
						{tasks.map((task) => (
							<TaskEntry
								key={task.id}
								task={task}
								deleteTask={props.taskManager.removeTask}
								updateTask={props.taskManager.editTask}
							></TaskEntry>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
}
