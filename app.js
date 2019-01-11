const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3000;

// const db = require('./config/keys').MongoURI;
// mongoose.connect(db, {useNewUrlParser: true})
// .then(() => console.log('MongoDB connected...'))
// .catch(err => console.log(err));

app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:false }));

app.use('/', require('./routes/index'));
app.listen(PORT, console.info(`Server started on port ${3000}`));