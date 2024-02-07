const express = require('express');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const {PORT, HOST} = require('./constant.js');
const router = require('./route/BaseRoute.js');

const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/", router);

app.listen(PORT,HOST,(err)=>{
    if(err) console.log(`Error:${err} xsq`);
    else console.log(`server is running on http://${HOST}:${PORT}`);
})