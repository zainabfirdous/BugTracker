const employee = require("../models/Employee");
const role = require("../models/Role");
const Tracker = require("../models/Tracker");
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Sequelize = require('sequelize');
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];
const EmpProfile = require("../models/EmpProfile.js")
const bcrypt = require('bcrypt')


const express = require('express');
const Drouter = express.Router();


const DevProfile = async(req, res)=>{
    try{

        const empID = req.empID;
        console.log(empID);

        // const empID = req.params.id;

        const dev = await employee.findOne({
             where: { empID:empID }
        })
        res.status(200).json(dev);
    }catch(error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Error while fetching employee details' });
}}

const tracking = async(req, res)=>{
    try{
        const trackID = req.params.id;
        const Track = await Tracker.findByPk(trackID)
        res.status(200).json(Track);
    }catch(error){
        console.error('Error tracking bug:', error);
        res.status(500).json({ error: 'Error while fetching bug tracker' });
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
            replacements: { empID: req.empID }, // Replace :employeeId with the desired employee ID
            type: QueryTypes.SELECT
          }
        );
    
        // Send the projects as JSON response
        res.status(200).json(projects);
      } catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Error while fetching employee project' });
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
            res.status(404).json('No team members found')
            //console.log('No team members found for team ID:', teamId);
        } else{
            res.status(200).json(team);
        }
    }catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'error while fetching employee team' });
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
            res.status(200).json('No team members found')
            //console.log('No team members found for team ID:', teamId);
        } else{
            res.status(200).json(pteam);
        }
    }catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Error while fetching project team' });
      }
    }

const UpdateTrack = async(req, res)=>{
        try{
            const currentTime = new Date(); 
            const updateCount = await Tracker.update({
                status:'Resolved',
                compDate: Sequelize.literal('CURRENT_DATE'),
                compTime : currentTime.toTimeString().split(' ')[0],
                updDate: Sequelize.literal('CURRENT_DATE')
        },{
                where:{trackID: req.params.id}
            })
            res.status(200).json(updateCount)
        }catch(error){
            console.error('Error creating employee:', error);
            // Check if error is a Sequelize validation error
            if (error.name === 'SequelizeValidationError') {
                // Construct an error response with custom error messages
                const errorMessages = error.errors.map(err => err.message).join('; ');
                res.status(400).json({ errors: errorMessages });
            } else {
                // Handle other types of errors
                res.status(500).json({ error: "Error While updating bug tracker" });
            }
        }
    }
const UpdateStatus = async(req, res)=>{
    try{
        const updateCount = await Tracker.update({status:'Open', 
        updDate: Sequelize.literal('CURRENT_DATE')},{
            where:{trackID:  req.params.id}
        })
        res.status(200).json(updateCount)
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While updating bug tracker" });
        }
    }
}

const UpdateRetest = async(req, res)=>{
    try{
        const updateCount = await Tracker.update({status:'Retest', 
        updDate: Sequelize.literal('CURRENT_DATE')},{
            where:{trackID:  req.params.id}
        })
        res.status(200).json(updateCount)
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While updating bug tracker" });
        }
    }
}

const UpdatePassword = async(req, res)=>{
    try{
        const body = req.body

        if (!body.Oldpassword) {

            return res.status(400).json({ error: "Password is required for update" });
        }
        //console.log('inside update method')
        const empID = req.empID
        const empPassword = await EmpProfile.findOne({where:{empID: empID}})
        const isMatched = await bcrypt.compare( body.Oldpassword, empPassword.password)
        if(isMatched){
        body.updDate = Sequelize.literal('CURRENT_DATE');
        const updateCount = await EmpProfile.update({
            password: body.Newpassword,
            updDate: body.updDate
        },{
            where:{empID: body.empID},  individualHooks: true}) 
        return res.status(200).json(updateCount)}
        else{
            return res.status(401).json({error: "Incorrect Old Password"})
        }
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While updating password" });
        }
    }
}

    Drouter.get("/projTeam/:id/:eid", DProjTeam)
    Drouter.get("/teammembers/:id/:eid", DevTeamMembers);
    Drouter.get("/devprojects", DevProjects);
    Drouter.get("/devDashboard", DevProfile);
    Drouter.get("/trackBug/:id",tracking);
    Drouter.put("/updateTracker/resolved/:id",UpdateTrack )
    Drouter.put("/updateTracker/acceptBug/:id",UpdateStatus )
    Drouter.put("/updateTracker/RetestBug/:id",UpdateRetest )
    Drouter.put("/updatePassword", UpdatePassword)

    module.exports = Drouter;