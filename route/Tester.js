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
const bcrypt = require('bcrypt')
const Project = require('../models/Project.js')

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


const Bugs = async (req, res) => {
    try {
        const bug = await Bug.findAll();
        res.status(200).json(bug);
    } catch (error) {
        console.error('Error fetching bugs:', error);
        res.status(500).json({ error: "Error While fetching bugs" });
    }
}

const newbugReg = async (req, res) => {
    try {
        const body = req.body;
        const newbug = await Bug.create(body);
        res.status(200).json(newbug);
    } catch(error){
        console.error('Error creating Bug:', error);
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
            res.status(400).json({ error: errorMessages });
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

const Projects = async (req, res) => {
    try {
        const proj = await Project.findAll();
        res.status(200).json(proj);
    } catch (error) {
        console.error('Error fetching Projects:', error);
        res.status(500).json({ error: "Error While fetching projects" });
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

                replacements: { empID: req.empID}, 

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
                replacements: { teamID: req.params.id, empID: req.empID},
                type: QueryTypes.SELECT
            }
        );
        if (team.length === 0) {
            res.status(404).json({error:'No team members found'})
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
            'SELECT e.empID, e.fName, e.lName, e.email, t.teamName ' +
            'FROM Employee e ' +
            'JOIN projectassign pa ON e.empID = pa.empID ' +
            'JOIN Team t ON pa.teamID = t.teamID '+
            'WHERE pa.projID = :pid ' +
            'AND pa.empID != :eid',
            {
                replacements: { pid: req.params.id, eid: req.empID },
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
            res.status(400).json({ error: errorMessages });
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
        res.status(500).json({ error: "Contact To Admin!!!" });
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
            res.status(400).json({ error: errorMessages });
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
            res.status(400).json({ error: errorMessages });
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
            where:{empID: req.empID},  individualHooks: true}) 
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


const allEmp =  async (req, res) => {
    try {
        const employees = await employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: "Error While fetching employees" });
    }
}

const testerteams = async(req, res)=>{
    try{
        const team = await sequelize.query(
            'SELECT t.teamID, t.teamName, p.projName FROM team t '+
            'JOIN project p ON t.projID = p.projID '+
            'JOIN ProjectAssign pa ON t.teamID = pa.teamID '+ 
            'JOIN Employee e ON pa.empID = e.empID '+ 
            'WHERE e.empID = :empID ',
            {
                replacements: { empID: req.empID }, 
                type: QueryTypes.SELECT
              }
            );
      res.status(200).json(team);
    } catch (error) {
    // Handle any errors
    console.error('Error executing raw query:', error);
    res.status(500).json({ error: 'Error while fetching employee teams' });
    }
    }
  
    const projIDteams = async(req, res)=>{
        try{
            const team = await sequelize.query(
               'select t.teamID, t.teamName '+
               'from team t '+
                'JOIN projectassign pa on t.teamID = pa.teamID '+
                'where pa.projID = :projID',
                {
                    replacements: { projID: req.params.projID }, 
                    type: QueryTypes.SELECT
                  }
                );
          res.status(200).json(team);
        } catch (error) {
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Error while fetching employee teams' });
        }
        }


Trouter.get("/projteamsbyID/:projID", projIDteams)

Trouter.get("/projTeam/:id", ProjTeam) //api with token
Trouter.get("/teammembers/:id",TeamMembers); //api with token
Trouter.get("/myprojects", TesterProjects); //api with token
Trouter.get('/team', testerteams);

Trouter.get("/getEmployees", allEmp)
Trouter.get("/projTeam/:id/:eid", ProjTeam)
Trouter.get("/teammembers/:id/:eid", TeamMembers);
Trouter.get("/getProjects", Projects)
Trouter.get("/testerprojects", TesterProjects);

Trouter.get("/testerDashboard", testerProfile);
Trouter.get("/getbugs", Bugs)
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