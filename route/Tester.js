const employee = require("../models/Employee");
const role = require("../models/Role");



const express = require('express');
const Trouter = express.Router();


Trouter.get("/testerDashboard", async(req, res)=>{
    try{
        const tester = await employee.findOne({where:{}})
    }
})