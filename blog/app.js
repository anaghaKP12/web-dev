require('dotenv').config();
const express = require("express");
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const connectDB = require('./server/config/db');



const app = express();
const PORT = 5000 || process.env.PORT;

//connect to DB
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//Templating engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');


app.use('/',require('./server/routes/main'))
app.use('/admin',require('./server/routes/admin'))

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
});