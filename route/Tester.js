const employee = require("../models/Employee");
const role = require("../models/Role");
const Tracker = require("../models/Tracker");
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Bug = require("../models/Bug.js");
const EmpProfile = require("../models/EmpProfile.js")
const Sequelize = require('sequelize');
const express = require('express');
const Trouter = express.Router();

const testerProfile = async (req, res) => {
    try {
        const empID = req.empID;
        const tester = await employee.findOne({
            where: { empID: empID }
        })
        res.status(200).json(tester);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: "Error While fetching employee details" });
    }
}

const newbugReg = async (req, res) => {
    try {
        const body = req.body;
        const newbug = await Bug.create(body);
        res.status(200).json(newbug);
    } catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While registering new bug" });
        }
    }
}

const UpdateBugs = async (req, res) => {
    try {
        const body = req.body;
        req.body.updDate = Sequelize.literal('CURRENT_DATE');
        const updatedCount = await Bug.update(body, {
        where: { bugID: body.bugID },
    });
    res.status(200).json(updatedCount);
    } catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While updating bug" });
        }
    }
}

const trackingdetails = async (req, res) => {
    try {
        const trackID = req.params.id;
        const Track = await Tracker.findByPk(trackID)
        res.status(200).json(Track);
    } catch (error) {
        console.error('Error tracking bug:', error);
        res.status(500).json({ error: 'Error tracking bug' });
    }
};

const trackingall = async (req, res) => {
    try {
        const allbugs = await Tracker.findAll()
        res.status(200).json(allbugs);
    } catch (error) {
        console.error('Error fetching all bug tracking details: ', error);
        res.status(500).json({ error: "Error While fetching all bug tracking details" });
    }
}

const TesterProjects = async (req, res) => {
    try {
        const projects = await sequelize.query(
            'SELECT p.projID, p.projName, p.status, p.startDate, p.endDate ' +
            'FROM Project p ' +
            'JOIN ProjectAssign pa ON p.projID = pa.projID ' +
            'JOIN Employee e ON pa.empID = e.empID ' +
            'WHERE e.empID = :empID',
            {
                replacements: { empID: req.params.id }, 
                type: QueryTypes.SELECT
            }
        );

        // Send the projects as JSON response
        res.status(200).json(projects);
    } catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Error fetching employee projects' });
    }
}

const TeamMembers = async (req, res) => {
    try {
        const team = await sequelize.query(
            'SELECT e.empID, e.fName, e.lName, e.email ' +
            'FROM Employee e ' +
            'JOIN projectassign pa ON e.empID = pa.empID ' +
            'WHERE pa.teamID = :teamID  AND pa.empID != :empID',
            {
                replacements: { teamID: req.params.id, empID: req.params.eid },
                type: QueryTypes.SELECT
            }
        );
        if (team.length === 0) {
            res.send('No team members found')
            //console.log('No team members found for team ID:', teamId);
        } else {
            res.status(200).json(team);
        }
    } catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Error fetching team members of employee' });
    }

}

const ProjTeam = async (req, res) => {
    try {
        const pteam = await sequelize.query(
            'SELECT e.empID, e.fName, e.lName, e.email ' +
            'FROM Employee e ' +
            'JOIN projectassign pa ON e.empID = pa.empID ' +
            'WHERE pa.projID = :pid ' +
            'AND pa.empID != :eid',
            {
                replacements: { pid: req.params.id, eid: req.params.eid },
                type: QueryTypes.SELECT
            }
        );
        if (pteam.length === 0) {
            res.status(404).send('No team members found')
            //console.log('No team members found for team ID:', teamId);
        } else {
            res.status(200).json(pteam);
        }
    } catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Error fetching project team' });
    }
}

const NewTracking = async (req, res) => {
    try {
        const body = req.body
        req.body.status = "New"
        const newTrack = await Tracker.create(body);
        res.status(200).json(newTrack);
    } catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While adding new bug tracker" });
        }
    }
}

const DeleteBug =  async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await Bug.destroy({ where: { bugID: id } });
        res.status(200).json(deletedCount);
    } catch (error) {
        console.error('Error while deleting bug:', error);
        res.status(500).json({ error: "Error While deleting bug" });
    }
    
}

const UpdateTrack = async(req, res)=>{
    try{
        const updateCount = await Tracker.update({status:'Verified',
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
            res.status(500).json({ error: "Error While updating tracker" });
        }
    }
}

const TrackVerified = async(req, res)=>{
    try{
        const updateCount = await Tracker.update({status:'Reopened',
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
        if (!body.password) {
            return res.status(400).json({ error: "Password is required for update" });
        }
        console.log('inside update method')
        body.updDate = Sequelize.literal('CURRENT_DATE');
        const updateCount = await EmpProfile.update({
            password: body.password,
            updDate: body.updDate
        },{
            where:{empID: body.empID},  individualHooks: true}) 
        res.status(200).json(updateCount)
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

Trouter.get("/projTeam/:id/:eid", ProjTeam)
Trouter.get("/teammembers/:id/:eid", TeamMembers);
Trouter.get("/testerprojects/:id", TesterProjects);
Trouter.get("/testerDashboard", testerProfile);
Trouter.post("/newBug", newbugReg);
Trouter.put("/updateBug", UpdateBugs);
Trouter.delete("/deletebug/:id", DeleteBug);
Trouter.get("/trackBug/:id", trackingdetails);
Trouter.get("/trackBug", trackingall);
Trouter.post("/newtrack", NewTracking);
Trouter.put("/updateTrack/verified/:id", UpdateTrack);
Trouter.put("/updateTrack/reopen/:id", TrackVerified);
Trouter.put("/updatePassword", UpdatePassword)
module.exports = Trouter;