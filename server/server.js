const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const dao = require('./dao');
const dayjs = require('dayjs');
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); // module for accessing the users in the DB

const port = 3001;

app = new express();


app.use(morgan('dev'));
app.use(express.json());


/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
    function(username, password, done) {
      userDao.getUser(username, password).then((user) => {
        if (!user)
          return done(null, false, { message: 'Incorrect username and/or password.' });
          
        return done(null, user);
      })
    }
  ));
  
  // serialize and de-serialize the user (user object <-> session)
  // we serialize the user id and we store it in the session: the session is very small in this way
  passport.serializeUser((user, done) => {
    //console.log("serializeUser: user:" + JSON.stringify(user));
    done(null, user.id);
  });
  
  // starting from the data in the session, we extract the current (logged-in) user
  passport.deserializeUser((id, done) => {
    //console.log("deserializeUser: id:" + id);
    userDao.getUserById(id)
      .then(user => {
        //console.log("deserializeUser: user da db:" + JSON.stringify(user));
        done(null, user); // this will be available in req.user
      }).catch(err => {
        done(err, null);
      });
  });
  
  
  
  // custom middleware: check if a given request is coming from an authenticated user
  const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated())
      return next();
    
    return res.status(401).json({ error: 'not authenticated'});
  }
  
  
  // set up the session
  app.use(session({
    // by default, Passport uses a MemoryStore to keep track of the sessions
    secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
    resave: false,
    saveUninitialized: false,
  }));
  
  // then, init passport
  app.use(passport.initialize());
  app.use(passport.session());





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


app.post('/api/memes',[ 
    check('title').notEmpty().isString(),
    check('is_Protected').isBoolean(),
    check('creator').isString(),
    check('text1').notEmpty().isString(),
    check('text2').isString(),
    check('text3').isString(),
    check('textColor').notEmpty().isString(),
    check('textFont').notEmpty().isString(),
    check('textSize').notEmpty().isNumeric(),
    check('textUppercase').isString(),
    check('textBold').isString(),
    check('textItalic').isString(),
    check('date').isDate(),
], async (req, res) => {
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

/*** USER APIs ***/

// Login --> POST /sessions
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});



// Logout --> DELETE /sessions/current 
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

app.listen(3001, () => { console.log('running') })
