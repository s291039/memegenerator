const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const dao = require('./dao');
const dayjs = require('dayjs');

const PORT = 3001;

app = new express();


app.use(morgan('dev'));
app.use(express.json());

// GET /api/memes
app.get('/api/memes', async (req, res) => {
    dao.getAll()
        .then((memes) => {
            switch (req.query.filter) {
                case ("All"):
                    res.json(memes);
                    break;
                case ("Today"):
                    res.json(memes.filter((meme) => dayjs(meme.date).isSame(dayjs().format("MM/DD/YYYY"))));
                    break;
                case ("Last 7 days"):
                    res.json(memes.filter((meme) => dayjs(meme.date).isBefore(dayjs().sub(8, 'day'))));
                    break;
                case ("My Memes"):
                    res.json(memes.filter((meme) => meme.is_protected));
                    break;
                default:
                    res.json(memes);
                    break;

            }
        })
        .catch((err) => res.status(500).json({ error: 'DB error' }))
});


app.post('/api/memes' 
    //check('is_important').isBoolean(),
    //check('is_private').isBoolean(),
    //check('deadline').isDate(),
, async (req, res) => {
    const meme = {
        title: req.body.title,
        imgCode: req.body.imgCode,
        is_protected: req.body.is_protected,
        creator: req.body.creator,
        text1: req.body.text1,
        text2: req.body.text2,
        text3: req.body.text3,
        textColor: req.body.textColor,
        textFont: req.body.textFont,
        textSize: req.body.textSize,
        textUppercase: req.body.textUppercase,
        textBold: req.body.textBold,
        textItalic: req.body.textItalic,
        date: req.body.date,
    }
    try {
        await dao.createMeme(meme);
        res.status(201).end();
    } catch (err) {
        {/*res.status(503).json({ error: `Database error during the update of meme ${meme.title}.` });*/}
        res.status(503).json({ err });
    }

})

app.listen(3001, () => { console.log('running') })
