const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require("cors");

require('./validation/auth.js');

const users = require('./routes/api/users');
const movies = require('./routes/api/movies.js');
const reviews = require('./routes/api/review');
const subscription=require('./routes/api/subscription.js');
const profile = require('./routes/api/profile');
const googleauth = require('./routes/api/googleauth');
const search = require('./routes/api/search');
const Search_hist=require('./routes/api/search_hist')

const payment=require('./routes/api/payment');
const rent=require('./routes/api/rent');
// const fuzzySearch=require('./routes/api/fuzzySearch.js');
// const autocomplete=require('./routes/api/autocomplete.js');
// const partialMatch=require('./routes/api/partialMatch.js');
// const append=require('./routes/api/append-premium.js');
const sem_search=require('./routes/api/sem_search.js');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));


app.use(cors());

function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}
}));

const db = require('./config/keys').mongoURI;


mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(
  bodyParser.json({
      verify: function(req, res, buf) {
          req.rawBody = buf;
      }
  })
);

app.use(bodyParser.json());
app.use('/auth',googleauth);
app.use('/api/users', users);
app.use('/api/reviews',reviews);
app.use('/api/movies', movies);
app.use('/api/payment', payment);
app.use('/api/rent', rent);
app.use('/api/subscription',subscription);
app.use('/api/profile', profile);
app.use('/api/search', search);
app.use('/api/search_hist',Search_hist);
app.use('/api/sem_search',sem_search);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is running on port ${port}`));