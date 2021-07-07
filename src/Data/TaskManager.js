import { v4 as uuidv4 } from 'uuid';
import Task from './Task';

/**
 * Manages a list of `Tasks`
 * When the list changes, every subscriber is alerted.
 */
function TaskManager() {
	this.taskList = [];

	this.subscribers = [];
	this.publishTimeout = 100;
	this.publishTimer = undefined;

	/**
	 * Pushes a task in the `taskList`
	 * Do not call this directly. Use `addNewTask`.
	 * @param {Task} task the `Tasks`
	 * @param {boolean} publish wether to publish the event to subscribers
	 * @see addNewTask()
	 */
	this.pushTask = (task, publish = true) => {
		this.taskList.push(task);
		if (publish) this.publish();
	};

	/**
	 * Pushes tasks in the `taskList`
	 * Do not call this directly. Use `addNewTask`.
	 * @param {Task[]} tasks array of `Tasks`
	 * @param {boolean} publish wether to publish the event to subscribers
	 * @see addNewTask()
	 */
	this.pushTasks = (tasks, publish = true) => {
		tasks.forEach((t) => {
			this.pushTask(t, false);
		});
		if (publish) this.publish();
	};

	/**
	 * Parses the `json` string and push
	 * every task it contains in the `taskList`
	 * @param {string} json the JSON string containing the tasks to add
	 */
	this.loadJSON = (json) => {
		let new_tasks;
		try {
			new_tasks = JSON.parse(json);
		} catch (e) {
			console.log(e);
		}
		this.pushTasks(
			new_tasks.map((jsonTask) => {
				return parseJsonTask(jsonTask);
			})
		);
	};

	/**
	 * Converts an `Object` parsed by `loadJSON` into a `Task`
	 * @param {*} jsonTask the `Object` obtained by `loadJSON`
	 * @returns {Task} `Task`
	 */
	const parseJsonTask = (jsonTask) => {
		return new Task(
			jsonTask.id,
			jsonTask.description,
			jsonTask.important,
			jsonTask.is_private,
			jsonTask.deadline > 0 ? jsonTask.deadline : undefined,
			jsonTask.checked
		);
	};

	/**
	 * Adds a new `Task` to the database
	 * @param {Task} task the `Task` to add.
	 */
	this.addNewTask = (task) => {
		if (task.id === undefined) {
			task.id = uuidv4();
		}
		this.pushTask(task);
	};

	/**
	 * Remove the task with the specified id
	 * @param {string} taskId the id of the `Task` to remove
	 */
	this.removeTask = (taskId) => {
		this.taskList = this.taskList.filter((task) => task.id !== taskId);
		this.publish();
	};

	/**
	 * Replace the existing `Task` with the same id of the new `Task`
	 * @param {Task} newTask a `Task` with the same id of an existing `Task`
	 */
	this.editTask = (newTask) => {
		this.taskList = this.taskList.map((task) => {
			if (task.id === newTask.id) {
				return newTask;
			}
			return task;
		});
		this.publish();
	};

	/**
	 * Returns a filtered list of `Tasks`, according to the provided filter
	 * @param {Filter} filter the `Filter` to use
	 * @returns {Task[]} Array of `Task`s
	 */
	this.filteredList = (filter) => {
		if (!filter) {
			return [];
		}
		return this.taskList.filter(filter.action);
	};

	/**
	 * Subscribe to changes in the `Task`s list
	 * @param {string} name The subscriber name; use this name to unsubscribe
	 * @param {*} callback The callback to call when the list changes
	 * @see unsubscribe()
	 */
	this.subscribe = (name, callback) => {
		this.subscribers.push({ name: name, callback: callback });
	};

	/**
	 * Unsubscribe to changes in the `Task`s list
	 * @param {string} name The name used to subscribe
	 * @see subscribe()
	 */
	this.unsubscribe = (name) => {
		const subscriber_index = this.subscribers.findIndex((s) => s.name === name);
		if (subscriber_index >= 0) {
			this.subscribers.splice(subscriber_index, 1);
		}
	};

	/**
	 * This function is called when we want to alert subscribers to changes
	 * in the `Task`s list.
	 * It waits until there have been no changes in `publishTimeout` milliseconds.
	 */
	this.publish = () => {
		clearTimeout(this.publishTimer);
		this.publishTimer = setTimeout(() => {
			this.subscribers.forEach((s) => s.callback());
		}, this.publishTimeout);
	};
}

export default TaskManager;
