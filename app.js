const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

require('./config/passport')(passport);


const db = require('./config/keys').MongoURI;
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));




    app.use(express.urlencoded({
        extended: false
    }));
    app.use(express.json());



app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');



app.use(cors());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global vars

app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/index'));



if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.code || 500)
            .send({
                status: 'error',
                message: 'Please try again later'
            });
    });
};

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err)
    process.exit(1);
});

app.listen(PORT, console.info(`Server started on port ${3000}`));