'use strict';

/* 
CREATE TABLE memes (
	id          INTEGER  PRIMARY KEY,
	title TEXT     NOT NULL,
	is_protected      BOOLEAN  DEFAULT (0) NOT NULL,
	creator     BOOLEAN  DEFAULT (1) NOT NULL,
	text1 	 TEXT    ,
	text2	 TEXT     ,
	text3	 TEXT     ,
	date    DATETIME
);
*/

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

const e = require('express');

let maxID = 0;


const db = new sqlite.Database('meme.db', sqlite.OPEN_READWRITE, (err) => {
	if (err) throw err;
});

exports.createMeme = (meme) => {
	return new Promise((resolve, reject) => {
	  const sql = 'INSERT INTO meme(id, title, is_protected, creator, text1, text2, text3 , date) VALUES(?,?,?,?,?,?,?,?)';
	  db.run(sql, [maxID+1, meme.title, meme.is_protected, meme.creator, meme.text1, meme.text2, meme.text3, meme.date], function (err) {
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
				const memes = rows.map(e => ({ id: e.id, title: e.title, is_protected: e.is_protected, creator: e.creator, text1 : e.text1, text2 : e.text2, text3 : e.text3, date: e.date}));
				rows.map(m => m.id > maxID ? maxID = m.id : '');
				resolve(memes);
			}
		});
	});
};

exports.getAfterDate = (date) => {
	return new Promise((resolve, reject) => {
	  const sql = 'SELECT * FROM memes WHERE date > ?';
	  db.all(sql, [date.format()], (err, rows) => {
		if (err)
		  reject(err);
		else {
		const memes = rows.map(e => ({ id: e.id, title: e.title, is_protected: e.is_protected, creator: e.creator, text1 : e.text1, text2 : e.text2, text3 : e.text3, date: e.date}));
		  resolve(memes);
		}
	  });
	});
  };
 
  exports.getWithWord = (word) => {
	return new Promise((resolve, reject) => {
	  const sql = "SELECT * FROM memes WHERE title LIKE ?";
	  db.all(sql, ["%" + word + "%"], (err, rows) => {
		if (err)
		  reject(err);
		else {
			const memes = rows.map(e => ({ id: e.id, title: e.title, is_protected: e.is_protected, creator: e.creator, text1 : e.text1, text2 : e.text2, text3 : e.text3, date: e.date}));
			resolve(memes);
		}
	  });
	});
  };