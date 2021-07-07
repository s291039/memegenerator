import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);
dayjs.extend(isToday);

/**
 * @param {*} id
 * @param {*} description
 * @param {*} important
 * @param {*} is_private
 * @param {*} deadline in unix epoch
 * @param {*} checked
 */
export default function Task(
	id = undefined,
	description = '',
	important = false,
	is_private = false,
	deadline = undefined,
	checked = false
) {
	this.id = id;
	this.description = description;
	this.important = important;
	this.is_private = is_private;
	this.deadline = deadline ? dayjs.unix(deadline) : undefined;
	this.checked = checked;

	/**
	 * Returns a copy of the `Task`
	 */
	this.getCopy = () => {
		return new Task(
			this.id,
			this.description,
			this.important,
			this.is_private,
			this.deadline ? this.deadline.unix() : undefined,
			this.checked
		);
	};

	/**
	 * Returns a simplified `Task` as an `Object` containing:
	 * ```
	 * {id,
	 * description,
	 * important,
	 * is_private,
	 * deadline,
	 * checked}
	 * ```
	 * To be used in route states.
	 * It contains every property of the original `Task`,
	 * with only the deadline converted to a standard
	 * time string with the format `YYYY-MM-DDTHH:mm`.
	 */
	this.getSimpleTask = () => {
		return {
			id: this.id,
			description: this.description,
			important: this.important,
			is_private: this.is_private,
			deadline: this.deadline
				? this.deadline.format('YYYY-MM-DDTHH:mm') // can't use toISOString because it adds milliseconds
				: undefined,
			checked: this.checked,
		};
	};
}
