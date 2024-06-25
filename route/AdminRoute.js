const employee = require('../models/Employee.js');
const Project = require('../models/Project.js')
const Bug = require('../models/Bug.js')
const Admin = require('../models/Admin.js')
const Team = require('../models/Team.js')
const EmpProfile= require('../models/EmpProfile.js')
const PAssign = require('../models/ProjectAssign.js')
const Tracker = require('../models/Tracker.js')
//const hash = require('./Passwordhashing');
const Role = require('../models/Role.js')
const sequelize = require('../config/database.js');
const { QueryTypes } = require('sequelize');



const express = require('express');
const { Sequelize } = require('sequelize');
const hashPassword = require('./Passwordhashing.js');
const router = express.Router();



const dashboard = async(req, res)=>{
    try{
        const admin = await Admin.findAll()
        res.status(200).json(admin);
    }catch(error)
    {
        console.error('Error fetching details of admin: '+error);
        res.status(500).json({ error: "Error While fetching admin details" });
}}

const dashboardByID = async(req, res)=>{
    try{
        const admID = req.empID;
        const admin = await Admin.findByPk(admID)
        res.status(200).json(admin);
    }catch(error)
    {
        console.error('Error fetching details of admin: '+error);
        res.status(500).json({ error: "Error While fetching admin details" });
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

const EmpById = async (req,res) =>{
    try{
        const empID = req.params.id;
        console.log(empID);
        const emp_byid = await employee.findByPk(empID);
        res.status(200).json(emp_byid);
    }catch(error){
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: "Error While fetching employee" });
    }

    
}


const CreateEmp =  async (req, res) => {
    try {
        const body = req.body;
        delete body.empID;
        const newEmp = await employee.create(body);
        res.status(200).json(newEmp);
    } catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While creating employee" });
        }
    }
}

const DeleteEmp =  async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await EmpProfile.destroy({ where: { empID: id } });
        res.status(200).json(deletedCount);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: "Error While deleting employee, foreign key constraint fails" });
    }
    
}


const UpdateEmp = async (req, res) => {
    try {
        const body = req.body;
        req.body.updDate = Sequelize.literal('CURRENT_DATE');
        const updatedCount = await employee.update(body, {
        where: { empID: req.body.empID },
    });
        
    res.status(200).json(updatedCount);
    } catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While updating employee" });
        }
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

const CreateProject =  async (req, res) => {
    try {
        const body = req.body;
        delete body.projID;
        const newproj = await Project.create(body);
        res.status(200).json(newproj);
    } catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While creating project" });
        }
}}

const ProjectById = async (req,res) =>{
    try{ const projID = req.params.projID;
        const projectg = await Project.findByPk(projID);
        res.status(200).json(projectg);
    }catch(error){
        res.status(500).json({ error: "Error While fetching project" });
    }
   
}

const UpdateProject = async (req, res) => {
    try {
        const body = req.body;
        req.body.updDate = Sequelize.literal('CURRENT_DATE');
        const updatedCount = await Project.update(body, {
        where: { projID: req.body.projID },
    });
    res.status(200).json(updatedCount);
    } catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While updating project" });
        }
    }
}

const DeleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await Project.destroy({ where: { projID: id } });
        res.status(200).json(deletedCount);
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: "Error While deleting project, foreign key constraint fails" });
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
        where: { bugID: req.body.bugID },
    });
    res.status(200).json(updatedCount);
    } catch (error) {
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

const DeleteBug =  async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await Bug.destroy({ where: { bugID: id } });
        res.status(200).json(deletedCount);
    } catch (error) {
        console.error('Error while deleting bug:', error);
        res.status(500).json({ error: "Error While ddeleting bug, foreign key constraint fails" });
    }
    
}

const BugByID = async(req, res)=>{
    try{
        const bugID = req.params.id;
        const bug_byid = await Bug.findByPk(bugID);
        res.status(200).json(bug_byid);
    }catch(error){
        console.error('Error fetching Bug:', error);
        res.status(500).json({ error: "Error While fetching bug" });
    }
}

const Teams = async (req, res)=>{
    try{
        const teams = await Team.findAll();
        res.status(200).json(teams)
    }catch(error)
    {
        console.error('Error while fetching Teams:', error);
        res.status(500).json({ error: "Error While fetching teams" });
    }
}

const CreatingTeams =  async(req, res)=>{
    try{
        const body = req.body
        delete body.teamID;
        const newTeam = await Team.create(body)
        res.status(200).json(newTeam)
    }catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While creating teams" });
        }
    }
}

const Updateteam = async(req, res)=>{
    try{
        const body = req.body;
        req.body.updDate = Sequelize.literal('CURRENT_DATE');
        const count = await Team.update(body, {
            where: { teamID: body.teamID }
        })
        res.status(200).json(count);
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While updating teams" });
        }
    }
}

const DeleteTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await Team.destroy({ where: { teamID: id } });
        res.status(200).json(deletedCount);
    } catch (error) {
        console.error('Error while deleting team:', error);
        res.status(500).json({ error: "Error While deleting team, foreign key constraint fails" });
    }
    
}

const Assignment = async(req, res)=>{
    try{
        const passign = await PAssign.findAll();
        res.status(200).json(passign);
    }catch(error)
    {
        console.error('Error while fetching Project assignment details:', error);
        res.status(500).json({ error: "Error While fetching project assignments" });
    }
}

const AssignmentById = async(req, res)=>{
    try{
        const id = req.params.id;
        const proj = await PAssign.findByPk(id);
        res.status(200).json(proj);
    }catch(error)
    {
        console.error('Error while fetching Project assignment details:', error);
        res.status(500).json({ error: "Error While fetching project assignment" });
    }
}

const CreateAssign = async(req, res)=>
{
    try{
        const body = req.body;
        const newPassign = await PAssign.create(body);
        res.status(200).json(newPassign);
    }catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While creating project assignment" });
        }
    }
    
}

const UpdateProjectAssign = async(req, res)=>{
    try{
        const body = req.body;
        req.body.updDate = Sequelize.literal('CURRENT_DATE');
        const count = await PAssign.update(body, {
            where: { assignID: body.assignID }
        })
        res.status(200).json(count);
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While updating project assignment" });
        }
    }
}

const DeleteProjectAssign =  async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await PAssign.destroy({ where: { assignID: id } });
        res.status(200).json(deletedCount);
    } catch (error) {
        console.error('Error while deleting project assignment:', error);
        res.status(500).json({ error: "Error While deleting project assignment, foreign key constraint fails" });
    }
    
}

const Track = async(req, res)=>{
    try{
        const Track = await Tracker.findAll()
        res.status(200).json(Track);
    }catch(error){
        console.error('Error tracking bug:', error);
        res.status(500).json({ error: "Error While fetching bug trackers" });
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

const TrackById = async(req, res)=>{
    try{
        const trackID = req.params.id;
        const Track = await Tracker.findByPk(trackID)
        res.status(200).json(Track)
    }catch(error){
        console.error('Error fetching all bug tracking details: ', error);
        res.status(500).json({ error: "Error While fetching bug tracker" });
    }}

const UpdateTrack = async(req, res)=>{
    try{
        const currentTime = new Date(); 
        const body = req.body
        body.status = "Assigned"
        delete body.trackID;
        body.assignDate = Sequelize.literal('CURRENT_DATE'),
        body.assignTime = currentTime.toTimeString().split(' ')[0],
        body.updDate = Sequelize.literal('CURRENT_DATE')
        const updateCount = await Tracker.update(body,{
            where:{trackID: req.params.id}
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

const UpdateClose = async(req, res)=>{
    try{
        const updateCount = await Tracker.update({status:'Closed', 
        updDate : Sequelize.literal('CURRENT_DATE')
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
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While updating bug tracker" });
        }
    }
}

const DeleteTrack =  async(req, res)=>{
    try{
        const id = req.params.id;
        const count = await Tracker.destroy({where:{trackID:id}})
        res.status(200).json(count)
    }catch(error){
        console.error('Error while deleting tracking details:', error);
        res.status(500).json({ error: "Error While deleting bug tracker, foreign key constraint fails" });
    }
   
}

const CreateUserProfile = async(req, res)=>{
    try{
        console.log("Profile Show : ",req.body)
        const password = req.body.password
        const id=req.body.empID
        const user = req.body.username
        const userProfile = await EmpProfile.create({empID:id, username:user, password: password},{
            // Explicitly specify the primary key field
            fields: ['empID','username','password'] 
        })
        res.status(200).json(userProfile)
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ error: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding employee profile" });
        }
    }
}

const role = async (req, res) => {
    try {
        const role = await Role.findAll();
        res.status(200).json(role);

    } catch (error) {
        console.error('Error fetching role:', error);
        res.status(500).json({ error: "Error While fetching user role" });
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

    const projIDteamsSelect = async(req, res)=>{
        try{
            
            const team = await sequelize.query(
               'select t.teamID, t.teamName from team t '+
               'JOIN project p on t.projID = p.projID '+
                'where p.projID = :projID',
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

    const TeamMembers = async (req, res) => {
        try {
            const team = await sequelize.query(
                'SELECT e.empID, e.fName, e.lName, e.email ' +
                'FROM Employee e ' +
                'JOIN projectassign pa ON e.empID = pa.empID ' +
                'WHERE pa.teamID = :teamID ',
                {
                    replacements: { teamID: req.params.teamID},
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

    const EmpByRole = async(req, res)=>{
        try{
            const id = req.params.roleID;
            const empbyrole = await employee.findAll({where:{roleID : id }}); 
            if (empbyrole.length === 0) {
                res.status(404).json({error:'No employees found'})
            } else {
                res.status(200).json(empbyrole);
            }
        }catch (error) {
            console.error('Error fetching employees:', error);
            res.status(500).json({ error: "Error While fetching employees by role" });
        }
    }


    // const getStatusCounts = async (req, res) => {
    //     try {
    //         const statusCounts = await sequelize.query(
    //             'SELECT status, COUNT(*) AS status_count ' +
    //             'FROM tracking ' +
    //             'WHERE status IN (:statuses) ' +
    //             'GROUP BY status',
    //             {
    //                 replacements: { statuses: ['New', 'Assigned', 'Open', 'Resolved', 'Verified', 'Reopened', 'Retest', 'Closed'] },
    //                 type: QueryTypes.SELECT
    //             }
    //         );
    //         if (statusCounts.length === 0) {
    //             res.status(404).json({ error: 'No status counts found' });
    //         } else {
    //             res.status(200).json(statusCounts);
    //         }
    //     } catch (error) {
    //         console.error('Error executing raw query:', error);
    //         res.status(500).json({ error: 'Error fetching status counts' });
    //     }
    // };

    const getStatusCounts = async (req, res) => {
        try {
            // List of all possible statuses
            const allStatuses = ['New', 'Assigned', 'Open', 'Resolved', 'Verified', 'Reopened', 'Retest', 'Closed'];
    
            // Query to get the counts of each status
            const statusCounts = await sequelize.query(
                'SELECT status, COUNT(*) AS status_count ' +
                'FROM tracking ' +
                'WHERE status IN (:statuses) ' +
                'GROUP BY status',
                {
                    replacements: { statuses: allStatuses },
                    type: QueryTypes.SELECT
                }
            );
    
            // Initialize an object with all statuses set to 0
            const statusCountMap = allStatuses.reduce((acc, status) => {
                acc[status] = 0;
                return acc;
            }, {});
    
            // Map the results to the statusCountMap
            statusCounts.forEach(item => {
                statusCountMap[item.status] = item.status_count;
            });
    
            // Convert the statusCountMap to an array of objects
            const response = Object.keys(statusCountMap).map(status => ({
                status,
                status_count: statusCountMap[status]
            }));
    
            res.status(200).json(response);
        } catch (error) {
            console.error('Error executing raw query:', error);
            res.status(500).json({ error: 'Error fetching status counts' });
        }
    };

router.get("/getStatusCounts", getStatusCounts)
router.get("/empbyRole/:roleID", EmpByRole)
router.get("/teammembers/:teamID", TeamMembers)
router.get("/projteamsbyIDSelect/:projID", projIDteamsSelect)
router.get("/projteamsbyID/:projID", projIDteams)
router.get("/getrole", role)
router.get("/adminDashboard", dashboard)
router.get("/adminDashboardbyID", dashboardByID) //api with token
//router.get("/adminDashboard/id", dashboardByID)
router.get("/getEmployees", allEmp)
router.get("/getEmpByID/:id", EmpById)
router.post("/newEmployee",CreateEmp)
router.delete("/deleteEmp/:id", DeleteEmp)
router.put("/updateEmployee", UpdateEmp)
router.get("/getProjects", Projects)
router.post("/newProject", CreateProject)
router.get("/getprojbyid/:projID", ProjectById)
router.put("/updateProject", UpdateProject)
router.delete("/deleteproj/:id", DeleteProject)
router.get("/getbugs", Bugs)
router.post("/newBug", newbugReg);
router.put("/updateBug", UpdateBugs)
router.delete("/deletebug/:id", DeleteBug)
router.get("/BugbyID/:id", BugByID)
router.get("/getteams", Teams)
router.post("/newTeam", CreatingTeams)
router.put("/updateTeam", Updateteam)
router.delete("/deleteteam/:id", DeleteTeam)
router.get("/projectAssign", Assignment)
router.get("/projectassign/:id", AssignmentById)
router.post("/newPorjectAssign", CreateAssign)
router.put("/updateProjAssign", UpdateProjectAssign)
router.delete("/deleteprojAssign/:id", DeleteProjectAssign)
router.post("/newtrack", NewTracking);
router.get("/trackbugs", Track)
router.get("/trackbugs/:id", TrackById)
router.put("/updateTracker/assigned/:id", UpdateTrack)
router.put("/updateTracker/close/:id", UpdateClose)
router.delete("/deletetracks/:id",DeleteTrack)
router.post("/userprofile", CreateUserProfile)

module.exports = router;
