import dayjs from 'dayjs';

/**
 * @param {*} id
 * @param {*} image_id
 * @param {*} creator
 * @param {*} title
 * @param {*} is_private
 * @param {*} date in unix epoch
 * @param {*} n_texts
 * @param {*} text1
 * @param {*} text2
 * @param {*} text3
 */
export default function Task(
	id = undefined,
	image_id = undefined,
	creator = '',
	title = '',
	is_private = false,
	date = undefined,
	n_texts = undefined,
	text1 = '',
	text2 = '',
	text3 = ''
) {
	this.id = id;
	this.image_id = image_id;
	this.creator = creator;
	this.title = title;
	this.is_private = is_private;
	this.date = date ? dayjs.unix(date) : undefined;
	this.n_texts = n_texts;
	this.text1 = text1;
	this.text2 = text2;
	this.text3 = text3;

	/**
	 * Returns a copy of the `Meme`
	 */
	this.getCopy = () => {
		return new Task(
			this.id,
			this.image_id,
			this.creator,
			this.title,
			this.is_private,
			this.deadline ? this.deadline.unix() : undefined,
			this.n_texts,
			this.text1,
			this.text2,
			this.text3
		);
	};

	/**
	 * Returns a simplified `Meme` as an `Object` containing:
	 * ```
	 * {id,
	 * image_id,
	 * creator,
	 * title,
	 * is_private,
	 * deadline,
	 * n_texts,
	 * text1,
	 * text2,
	 * text3}
	 * ```
	 * To be used in route states.
	 * It contains every property of the original `Meme`,
	 * with only the date converted to a standard
	 * time string with the format `YYYY-MM-DDTHH:mm`.
	 */
	this.getSimpleTask = () => {
		return {
			id: this.id,
			image_id: this.image_id,
			creator: this.creator,
			title: this.title,
			is_private: this.is_private,
			date: this.date
				? this.date.format('YYYY-MM-DDTHH:mm') // can't use toISOString because it adds milliseconds
				: undefined,
			n_texts: this.n_texts,
			text1: this.text1,
			text2: this.text2,
			text3: this.text3,
		};
	};
}
