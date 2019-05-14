import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import index from './routes/index';

const app = express();

require('./config/passport')(passport);


const db = require('./config/keys').MongoURI;

mongoose.connect(db, {
  useNewUrlParser: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.use(express.urlencoded({
  extended: false,
}));
app.use(express.json());


app.use(express.static(`${__dirname }/public`));
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(cors());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global vars

app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  next();
});

app.use('/', index);

app.use('*', (req, res) => {
  res.send('404 \n Page not found');
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.code || 500)
      .send({
        status: 'Error',
        message: 'Please try again later',
      });
  });
}

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1);
});

export default app;
