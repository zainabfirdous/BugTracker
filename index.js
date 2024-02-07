const express = require('express');
const cors = require("cors");


// const jwt = require("jsonwebtoken");
// const dotenv = require('dotenv');
// dotenv.config();
// const jwtSecret = process.env.JWT_SECRET_KEY;
// const session = require('express-session');
// const cookieParser = require('cookie-parser');


const app = express();

const {PORT, HOST} = require('./constant.js');
const router = require('./route/route.js');

const bodyParser = require('body-parser');



// app.use(express.json());
app.use(cors());


// app.use(cors(
//     {
//         origin: 'http://localhost:3000',
//         methods: ["POST","GET","PUT","DELETE"],
//         credentials : true
//     }
// ));

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({extended:false}));

app.use("/", router);

app.listen(PORT,HOST,(err)=>{
    if(err) console.log(`Error:${err} xsq`);
    else console.log(`server is running on http://${HOST}:${PORT}`);
})