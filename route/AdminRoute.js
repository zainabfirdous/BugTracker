const employee = require('../models/Employee.js');
const Project = require('../models/Project.js')
const Bug = require('../models/Bug.js')
const Admin = require('../models/Admin.js')
const Team = require('../models/Team.js')
const EmpProfile= require('../models/EmpProfile.js')
const PAssign = require('../models/ProjectAssign.js')
const Tracker = require('../models/Tracker.js')
//const hash = require('./Passwordhashing');



const express = require('express');
const { Sequelize } = require('sequelize');
const hashPassword = require('./Passwordhashing.js');
const router = express.Router();



const dashboard = async(req, res)=>{
    try{
        const admin = await Admin.findAll()
        res.json(admin);
    }catch(error)
    {
        console.error('Error fetching details of admin: '+error);
        res.status(500).send('Internal Server Error');
    }
}

const dashboardByID = async(req, res)=>{
    try{
        const admID = req.params.id;
        const admin = await Admin.findByPk(admID)
        res.json(admin);
    }catch(error)
    {
        console.error('Error fetching details of admin: '+error);
        res.status(500).send('Internal Server Error');
    }
}

const allEmp =  async (req, res) => {
    try {
        const employees = await employee.findAll();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
    }
}

const EmpById = async (req,res) =>{
    try{
        const empID = req.params.id;
        console.log(empID);
        const emp_byid = await employee.findByPk(empID);
        res.json(emp_byid);
    }catch(error){
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
    }

    
}


const CreateEmp =  async (req, res) => {
    try {
        const body = req.body;
        const newEmp = await employee.create(body);
        res.json(newEmp);
    } catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
        }
    }
}

const DeleteEmp =  async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await employee.destroy({ where: { empID: id } });
        res.json(deletedCount);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.json({ error: "This Employee Can't be deleted, (FK-In_Use)" });
    }
    
}


const UpdateEmp = async (req, res) => {
    try {
        const body = req.body;
        req.body.updDate = Sequelize.literal('CURRENT_DATE');
        const updatedCount = await employee.update(body, {
        where: { empID: req.body.empID },
    });
        
    res.json(updatedCount);
    } catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
        }
    }
}

const Projects = async (req, res) => {
    try {
        const proj = await Project.findAll();
        res.json(proj);
    } catch (error) {
        console.error('Error fetching Projects:', error);
        res.json({ error: "Error While Getting Projects Info" });
    }
}

const CreateProject =  async (req, res) => {
    try {
        const body = req.body;
        const newproj = await Project.create(body);
        res.json(newproj);
    } catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
        }
}}

const ProjectById = async (req,res) =>{
    const projID = req.params.projID;
    const projectg = await Project.findByPk(projID);
    res.send(projectg);
}

const UpdateProject = async (req, res) => {
    try {
        const body = req.body;
        req.body.updDate = Sequelize.literal('CURRENT_DATE');
        const updatedCount = await Project.update(body, {
        where: { projID: req.body.projID },
    });
    res.json(updatedCount);
    } catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
        }
    }
}

const DeleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await Project.destroy({ where: { projID: id } });
        res.json(deletedCount);
    } catch (error) {
        console.error('Error deleting project:', error);
        res.json({ error: "This project Can't be deleted, (FK-In_Use)" });
    }
    
}

const Bugs = async (req, res) => {
    try {
        const bug = await Bug.findAll();
        res.json(bug);
    } catch (error) {
        console.error('Error fetching bugs:', error);
        res.status(500).send('Internal Server Error');
    }
}

const UpdateBugs = async (req, res) => {
    try {
        const body = req.body;
        req.body.updDate = Sequelize.literal('CURRENT_DATE');
        const updatedCount = await Bug.update(body, {
        where: { bugID: req.body.bugID },
    });
    res.json(updatedCount);
    } catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
        }
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

const BugByID = async(req, res)=>{
    try{
        const bugID = req.params.id;
        const bug_byid = await Bug.findByPk(bugID);
        res.json(bug_byid);
    }catch(error){
        console.error('Error fetching Bug:', error);
        res.status(500).send('Internal Server Error');
    }
}

const Teams = async (req, res)=>{
    try{
        const teams = await Team.findAll();
        res.json(teams)
    }catch(error)
    {
        console.error('Error while fetching Teams:', error);
        res.json({ error: "Unable to fetch teams" });
    }
}

const CreatingTeams =  async(req, res)=>{
    try{
        const body = req.body
        const newTeam = await Team.create(body)
        res.json(newTeam)
    }catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
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
        res.json(count);
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
        }
    }
}

const DeleteTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await Team.destroy({ where: { teamID: id } });
        res.json(deletedCount);
    } catch (error) {
        console.error('Error while deleting team:', error);
        res.json({ error: "This team Can't be Deleted, (FK-In_Use)" });
    }
    
}

const Assignment = async(req, res)=>{
    try{
        const passign = await PAssign.findAll();
        res.json(passign);
    }catch(error)
    {
        console.error('Error while fetching Project assignment details:', error);
        res.json({ error: "Unable to fetch Project assignment details" });
    }
}

const AssignmentById = async(req, res)=>{
    try{
        const id = req.params.id;
        const proj = await PAssign.findByPk(id);
        res.json(proj);
    }catch(error)
    {
        console.error('Error while fetching Project assignment details:', error);
        res.json({ error: "Unable to fetch Project assignment details" });
    }
}

const CreateAssign = async(req, res)=>
{
    try{
        const body = req.body;
        const newPassign = await PAssign.create(body);
        res.json(newPassign);
    }catch (error) {
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
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
        res.json(count);
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
        }
    }
}

const DeleteProjectAssign =  async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await PAssign.destroy({ where: { assignID: id } });
        res.json(deletedCount);
    } catch (error) {
        console.error('Error while deleting project assignment:', error);
        res.json({ error: "This project assignment Can't be Deleted, (FK-In_Use)" });
    }
    
}

const Track = async(req, res)=>{
    try{
        const Track = await Tracker.findAll()
        res.json(Track);
    }catch(error){
        console.error('Error tracking bug:', error);
        res.json({ error: "Can't fetch tracking details" });
    }
}

const TrackById = async(req, res)=>{
    try{
        const trackID = req.params.id;
        const Track = await Tracker.findByPk(trackID)
        res.json(Track)
    }catch(error){
        console.error('Error fetching all bug tracking details: ', error);
        res.json({ error: "Can't fetch details" })
    }}

const UpdateTrack = async(req, res)=>{
    try{
        const currentTime = new Date(); 
        const body = req.body
        body.status = "Assigned"
        body.assignDate = Sequelize.literal('CURRENT_DATE'),
        body.assignTime = currentTime.toTimeString().split(' ')[0],
        body.updDate = Sequelize.literal('CURRENT_DATE')
        const updateCount = await Tracker.update(body,{
            where:{trackID: req.params.id}
        })
        res.json(updateCount)
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
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
        res.json(updateCount)
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
        }
    }
}

const DeleteTrack =  async(req, res)=>{
    try{
        const id = req.params.id;
        const count = await Tracker.destroy({where:{trackID:id}})
        res.json(count)
    }catch(error){
        console.error('Error while deleting tracking details:', error);
        res.json({ error: "This details Can't be Deleted, (FK-In_Use)" });
    }
   
}

const CreateUserProfile = async(req, res)=>{
    try{
        console.log(req.body)
        const password = req.body.password
        const id=req.body.empID
        const user = req.body.username
        const userProfile = await EmpProfile.create({empID:id, username:user, password: password},{
            // Explicitly specify the primary key field
            fields: ['empID','username','password'] 
        })
        res.json(userProfile)
    }catch(error){
        console.error('Error creating employee:', error);
        // Check if error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            // Construct an error response with custom error messages
            const errorMessages = error.errors.map(err => err.message).join('; ');
            res.status(400).json({ errors: errorMessages });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: "Error While Adding Please Check" });
        }
    }
}

const role = async (req, res) => {
    try {
        const role = await Role.findAll();
        res.json(role);

    } catch (error) {
        console.error('Error fetching role:', error);
        res.json({ error: "Error While Fatching Roles" });
    }
}

router.get("/getrole", role)
router.get("/adminDashboard", dashboard)
router.get("/adminDashboard/:id", dashboardByID)
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
router.get("/trackbugs", Track)
router.get("/trackbugs/:id", TrackById)
router.put("/updateTracker/assigned/:id", UpdateTrack)
router.put("/updateTracker/close/:id", UpdateClose)
router.delete("/deletetracks/:id",DeleteTrack)
router.post("/userprofile", CreateUserProfile)

module.exports = router;
