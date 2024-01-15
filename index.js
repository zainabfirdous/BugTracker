const express = require('express');
const app = express();
const {PORT, HOST} = require('./constant.js');
const router = require('./route/route.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportconnfig = require('./config/passportconfig');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/", router);



app.listen(PORT,HOST,(err)=>{
    if(err) console.log(`Error:${err} xsq`);
    else console.log(`server is running on http://${HOST}:${PORT}`);
})