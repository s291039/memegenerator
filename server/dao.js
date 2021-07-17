'use strict';


const sqlite = require('sqlite3');
const dayjs = require('dayjs');

const e = require('express');

let maxID = 0;

const db = require('./db');

exports.createMeme = (meme) => {
	return new Promise((resolve, reject) => {
		if(maxID==0){
			this.getAll();
		}
		console.log(maxID)
		const sql = `INSERT INTO meme(
			id, 
			imgCode, 
			title, 
			is_protected, 
			creator, 
			text1, 
			text2, 
			text3, 
			textColor, 
			textFont, 
			textSize, 
			textUppercase, 
			textBold, 
			textItalic, 
			date
			)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
			
		db.run(sql, [
			maxID + 1,
			meme.imgCode,
			meme.title,
			meme.is_protected,
			meme.creator,
			meme.text1,
			meme.text2,
			meme.text3,
			meme.textColor,
			meme.textFont,
			meme.textSize,
			meme.textUppercase,
			meme.textBold,
			meme.textItalic,
			meme.date
		], function (err) {
			if (err) {
				reject(err);
				return;
			}
			resolve(this.lastID);
		});
	});
};

exports.getMeme = (id) => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM meme WHERE id = ?';
		db.get(sql, [id], function (err, row) {
			if (err) {
				return reject(err);
			}
			return resolve(row);
		});
	});
};

exports.getAll = () => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM meme';
		db.all(sql, [], (err, rows) => {
			if (err)
				reject(err);
			else {
				const memes = rows.map(e => ({
					id: e.id,
					imgCode: e.imgCode,
					title: e.title,
					is_protected: e.is_protected,
					creator: e.creator,
					text1: e.text1,
					text2: e.text2,
					text3: e.text3,
					date: e.date,
					textColor: e.textColor,
					textFont: e.textFont,
					textSize: e.textSize,
					textUppercase: e.textUppercase,
					textBold: e.textBold,
					textItalic: e.textItalic
				}));
				rows.map(m => m.id > maxID ? maxID = m.id : '');
				resolve(memes);
			}
		});
	});
};

