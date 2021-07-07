import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);

function Filter(name, type, action) {
	this.name = name;
	this.type = type;
	this.action = action;
}

function Filters() {
	const filters = [
		new Filter('All', 'all', () => {
			return true;
		}),
		new Filter('Important', 'important', (task) => {
			return task.important;
		}),
		new Filter('Today', 'today', (task) => {
			return task.deadline ? task.deadline.isToday() : false;
		}),
		new Filter('Next 7 days', 'week', (task) => {
			if (!task.deadline) return false;
			const today = dayjs().startOf('day');
			const next_week = today.add(7, 'day');
			const tomorrow = today.add(1, 'day');
			return (
				task.deadline.isBefore(next_week) && task.deadline.isAfter(tomorrow)
			);
		}),
		new Filter('Private', 'private', (task) => {
			return task.is_private;
		}),
	];

	this.getFilters = () => {
		return filters;
	};
}

export default new Filters();
