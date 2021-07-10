/**
 * All the API calls
 */
import Meme from './Models/Meme';

const BASEURL = '/api';


function addMeme(meme) {
	// call: POST /api/memes
	return new Promise((resolve, reject) => {
		fetch(BASEURL + '/memes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify({
				title: meme.title,
				creator: meme.creator,
				img_id: meme.img_id,
				is_private: meme.is_private,
				n_text_fields: meme.n_text_fields,
				text1: meme.text1,
				text2: meme.text2, text3: meme.text3,
				date: meme.date
			}),
		}).then((response) => {
			if (response.ok) {
				resolve(null);
			} else {
				// analyze the cause of error
				response.json()
					.then((message) => { reject(message); }) // error message in the response body
					.catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
			}
		}).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
	});
}

function updateMeme(meme) {
	// call: PUT /api/memes/:id
	return new Promise((resolve, reject) => {
		fetch(BASEURL + '/memes/' + meme.id, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify({
				title: meme.title,
				creator: meme.creator,
				img_id: meme.img_id,
				is_private: meme.is_private,
				n_text_fields: meme.n_text_fields,
				text1: meme.text1,
				text2: meme.text2, text3: meme.text3,
				date: meme.date
			}),
		}).then((response) => {
			if (response.ok) {
				resolve(null);
			} else {
				// analyze the cause of error
				response.json()
					.then((obj) => { reject(obj); }) // error message in the response body
					.catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
			}
		}).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
	});
}

function deleteMeme(meme_id) {
	// call: DELETE /api/memes/:id
	return new Promise((resolve, reject) => {
		fetch(BASEURL + '/memes/' + meme_id, {
			method: 'DELETE',
		}).then((response) => {
			if (response.ok) {
				resolve(null);
			} else {
				// analyze the cause of error
				response.json()
					.then((message) => { reject(message); }) // error message in the response body
					.catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
			}
		}).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
	});
}

async function getAllMemes() {
	// call: GET /api/memes
	const response = await fetch(BASEURL + '/memes');
	const memesJson = await response.json();
	if (response.ok) {
		return memesJson.map((meme) => Meme.from(meme));
	} else {
		throw memesJson;  // an object with the error coming from the server
	}
}

async function logIn(credentials) {
	let response = await fetch(BASEURL + '/sessions', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', },
		body: JSON.stringify(credentials),
	});
	if (response.ok) {
		const user = await response.json();
		return user.name;
	}
	else {
		try {
			const errDetail = await response.json();
			throw errDetail.message;
		}
		catch (err) {
			throw err;
		}
	}
}

async function logOut() {
	await fetch('/api/sessions/current', { method: 'DELETE' });
}

async function getUserInfo() {
	const response = await fetch(BASEURL + '/sessions/current');
	const userInfo = await response.json();
	if (response.ok) {
		return userInfo;
	} else {
		throw userInfo;  // an object with the error coming from the server, mostly unauthenticated user
	}
}

const API = { addMeme, updateMeme, deleteMeme, getAllMemes, logIn, logOut, getUserInfo };
export default API;
