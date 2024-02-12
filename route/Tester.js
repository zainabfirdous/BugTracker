const employee = require("../models/Employee");
const role = require("../models/Role");
const Tracker = require("../models/Tracker");
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Bug = require("../models/Bug.js")
const Sequelize = require('sequelize');



const express = require('express');
const Trouter = express.Router();


const testerProfile = async (req, res) => {
    try {
        const empID = req.body.empID;
        const tester = await employee.findOne({
            where: { empID: empID }
        })
        res.json(tester);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).send('Internal Server Error');
    }
}

const newbugReg = async (req, res) => {
    try {
        const body = req.body;
        const newbug = await Bug.create(body);
        res.json(newbug);
    } catch (error) {
        console.error('Error creating Bug:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const UpdateBugs = async (req, res) => {
    try {
        const body = req.body;
        req.body.updDate = Sequelize.literal('CURRENT_DATE');
        const updatedCount = await Bug.update(body, {
        where: { bugID: body.bugID },
    });
    res.json(updatedCount);
    } catch (error) {
        console.error('Error while Updating Bug:', error);
        res.json({ error: "Can't Update" });
    }
}

const trackingdetails = async (req, res) => {
    try {
        const trackID = req.params.id;
        const Track = await Tracker.findByPk(trackID)
        res.json(Track);
    } catch (error) {
        console.error('Error tracking bug:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const trackingall = async (req, res) => {
    try {
        const allbugs = await Tracker.findAll()
        res.json(allbugs);
    } catch (error) {
        console.error('Error fetching all bug tracking details: ', error);
        res.json({ error: "Can't fetch details" })
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
        res.json(projects);
    } catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
            res.json(team);
        }
    } catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
            res.send('No team members found')
            //console.log('No team members found for team ID:', teamId);
        } else {
            res.json(pteam);
        }
    } catch (error) {
        // Handle any errors
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const NewTracking = async (req, res) => {
    try {
        const body = req.body
        req.body.status = "New"
        const newTrack = await Tracker.create(body);
        res.json(newTrack);
    } catch (error) {
        console.error('Error creating bug tracker:', error);
        res.json({ error: "Error While Adding Please Check" });
    }
}

const DeleteBug =  async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await Bug.destroy({ where: { bugID: id } });
        res.json(deletedCount);
    } catch (error) {
        console.error('Error while deleting bug:', error);
        res.json({ error: "This Bug Can't be Deleted, (FK-In_Use)" });
    }
    
}

const UpdateTrack = async(req, res)=>{
    try{
        const updateCount = await Tracker.update({status:'Verified',
        updDate: Sequelize.literal('CURRENT_DATE')},{
            where:{trackID:  req.params.id}
        })
        res.json(updateCount)
    }catch(error){
        console.error('Error updating bug tracking details: ', error);
        res.json({ error: "Can't update details" })
    }
}

const TrackVerified = async(req, res)=>{
    try{
        const updateCount = await Tracker.update({status:'Reopened',
        updDate: Sequelize.literal('CURRENT_DATE')},{
            where:{trackID:  req.params.id}
        })
        res.json(updateCount)
    }catch(error){
        console.error('Error updating bug tracking details: ', error);
        res.json({ error: "Can't update details" })
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
module.exports = Trouter;