const employee = require("../models/Employee");
const role = require("../models/Role");
const Tracker = require("../models/Tracker");
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];


const express = require('express');
const Drouter = express.Router();


const DevProfile = async(req, res)=>{
    try{
        const empID = req.body.empID;
        const dev = await employee.findOne({
             where: { empID:empID }
        })
        res.json(dev);
    }catch(error) {
        console.error('Error fetching employee:', error);
        res.status(500).send('Internal Server Error');
}}

const tracking = async(req, res)=>{
    try{
        const trackID = req.params.id;
        const Track = await Tracker.findByPk(trackID)
        res.json(Track);
    }catch(error){
        console.error('Error tracking bug:', error);
        res.status(500).send('Internal Server Error');
    }
};

const DevProjects = async(req, res)=>{
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

const DevTeamMembers = async(req, res)=>{
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

const DProjTeam = async(req, res)=>{
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

const UpdateTrack = async(req, res)=>{
        try{
            const body = req.body
            req.body.status = "Resolved"
            const updateCount = await Tracker.update(body,{
                where:{trackID: body.trackID}
            })
            res.json(updateCount)
        }catch(error){
            console.error('Error updating bug tracking details: ', error);
            res.json({ error: "Can't update details" })
        }
    }
const UpdateStatus = async(req, res)=>{
    try{
        const body = {
            "status" : "Open"
        }
        const updateCount = await Tracker.update(body,{
            where:{trackID:  req.params.id}
        })
        res.json(updateCount)
    }catch(error){
        console.error('Error updating bug tracking details: ', error);
        res.json({ error: "Can't update details" })
    }
}

    Drouter.get("/projTeam/:id/:eid", DProjTeam)
    Drouter.get("/teammembers/:id/:eid", DevTeamMembers);
    Drouter.get("/devprojects/:id", DevProjects);
    Drouter.get("/devDashboard", DevProfile);
    Drouter.get("/trackBug/:id",tracking);
    Drouter.put("/updateTracker",UpdateTrack )
    Drouter.put("/updateTracker/acceptBug/:id",UpdateStatus )


    module.exports = Drouter;