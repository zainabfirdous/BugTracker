const employee = require("../models/Employee");
const role = require("../models/Role");
const Tracker = require("../models/Tracker");
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];


const express = require('express');
const Trouter = express.Router();


Trouter.get("/testerDashboard", async(req, res)=>{
    try{
        const empID = req.body.empID;
        const tester = await employee.findOne({
             where: { empID:empID }
        })
        res.json(tester);
    }catch(error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
}})

Trouter.post("/newBug", async (req, res) => {
    try {
        const body = req.body;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const data = { ...body };
        data.crtDate = formattedDate;
        data.updDate = null;
        const newbug = await Bug.create(data);
        res.json(newbug);
    } catch (error) {
        console.error('Error creating Bug:', error);
        res.status(500).send('Internal Server Error');
    }
})

Trouter.get("/trackBug/:id", async(req, res)=>{
    try{
        const trackID = req.params.id;
        const Track = await Tracker.findByPk(trackID)
        res.json(Track);
    }catch(error){
        console.error('Error tracking bug:', error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = Trouter;