const express = require('express');
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const {PORT, HOST} = require('./constant.js');
const login = require('./route/login.js');

const bodyParser = require('body-parser');

// app.use(bodyParser.json());

app.use(express.json());


app.use(cors({
    origin: ['http://localhost:3000','http://192.168.4.90:3000'],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use("/", login);

app.listen(PORT,HOST,(err)=>{
    if(err) console.log(`Error:${err} xsq`);
    else console.log(`server is running on http://${HOST}:${PORT}`);
})