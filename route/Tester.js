const employee = require("../models/Employee");
const role = require("../models/Role");
const employee = require('../models/Employee.js');


const express = require('express');
const Trouter = express.Router();


Trouter.get("/testerDashboard", async(req, res)=>{
    try{
        const empID = req.empID;
        const tester = await employee.findOne({
             where: { id:empID }
        }) 
    }
})