const employee = require("../models/Employee");
const role = require("../models/Role");
const Tracker = require("../models/Tracker");
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];


const express = require('express');
const Trouter = express.Router();


const testerProfile = async(req, res)=>{
    try{
        const empID = req.body.empID;
        const tester = await employee.findOne({
             where: { empID:empID }
        })
        res.json(tester);
    }catch(error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
}}

const newbugReg = async (req, res) => {
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
}

const trackingdetails = async(req, res)=>{
    try{
        const trackID = req.params.id;
        const Track = await Tracker.findByPk(trackID)
        res.json(Track);
    }catch(error){
        console.error('Error tracking bug:', error);
        res.status(500).send('Internal Server Error');
    }
};

const TesterProjects = async(req, res)=>{
    try {
       
        // Execute the raw SQL query
        const projects = await sequelize.query(
          'SELECT p.projID, p.projName, p.status, p.startDate, p.endDate ' +
          'FROM Project p ' +
          'JOIN ProjectAssign pa ON p.projID = pa.projID ' +
          'JOIN Employee e ON pa.empID = e.empID ' +
          'WHERE e.empID = :empID',
          {
            replacements: { empID: req.params.id }, // Replace :employeeId with the desired employee ID
            type: QueryTypes.SELECT
          }
        );
    
        // Send the projects as JSON response
        res.json(projects);
      } catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const TeamMembers = async(req, res)=>{
    try{
        const team = await sequelize.query(
            'SELECT e.empID, e.fName, e.lName, e.email '+
            'FROM Employee e '+
            'JOIN projectassign pa ON e.empID = pa.empID '+
            'WHERE pa.teamID = :teamID  AND pa.empID != :empID',
            {
                replacements:{ teamID: req.params.id, empID : req.params.eid},
                type: QueryTypes.SELECT
            } 
        );
        if (team.length === 0) {
            res.send('No team members found')
            //console.log('No team members found for team ID:', teamId);
        } else{
            res.json(team);
        }
    }catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
}

const ProjTeam = async(req, res)=>{
    try{
        const pteam = await sequelize.query(
            'SELECT e.empID, e.fName, e.lName, e.email '+
            'FROM Employee e '+
            'JOIN projectassign pa ON e.empID = pa.empID '+
            'WHERE pa.projID = :pid '+
            'AND pa.empID != :eid',
            {
                replacements:{ pid: req.params.id, eid : req.params.eid},
                type: QueryTypes.SELECT
            } 
        );
        if (pteam.length === 0) {
            res.send('No team members found')
            //console.log('No team members found for team ID:', teamId);
        } else{
            res.json(pteam);
        }
    }catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

Trouter.get("/projTeam/:id/:eid", ProjTeam)
Trouter.get("/teammembers/:id/:eid", TeamMembers);
Trouter.get("/testerprojects/:id", TesterProjects);
Trouter.get("/testerDashboard", testerProfile);
Trouter.post("/newBug", newbugReg);
Trouter.get("/trackBug/:id",trackingdetails);

module.exports = Trouter;