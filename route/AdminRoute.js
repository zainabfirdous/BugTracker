const employee = require('../models/Employee.js');
const Project = require('../models/Project.js')
const Bug = require('../models/Bug.js')
const Admin = require('../models/Admin.js')
const Team = require('../models/Team.js')
const PAssign = require('../models/ProjectAssign.js')
const Tracker = require('../models/Tracker.js')



const express = require('express');
const router = express.Router();



const dashboard = async(req, res)=>{
    try{
       // const admin = await Admin.findByPk(adminID);
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
       // const admin = await Admin.findByPk(adminID);
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
        // Fetch all employees from the database
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
        const emp_byid = await Project.findByPk(empID);
        res.send(emp_byid);
    }catch(error){
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
    }

    
}


const CreateEmp =  async (req, res) => {
    try {
        const body = req.body;
        const data = { ...body };
        const newEmp = await employee.create(data);
        res.json(newEmp);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.json({ error: "Error While Adding Please Check" });
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
        const data = req.body;
        //const updateObject = { ...data };
        //const employees = await employee.findByPk(updateObject.empID);
        // console.log(employees.crtDate + " " + formattedDate );
        // delete updateObject.empID;
        // updateObject.crtDate = employees.crtDate;
        // updateObject.updDate = formattedDate;
        const updatedCount = await employee.update(data, {
        where: { empID: data.empID },
    });
        
    res.json(updatedCount);
    } catch (error) {
        console.error('Error while Updating employee:', error);
        res.json({ error: "Can't Update" });
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
        const data = { ...body };
        // data.crtDate = formattedDate;
        // data.updDate = null;
        const newproj = await Project.create(data);
        res.json(newproj);
    } catch (error) {
        console.error('Error creating project:', error);
        res.json({ error: "Error While Adding Please Check" });
    }
}

const ProjectById = async (req,res) =>{
    const projID = req.params.projID;
    const projectg = await Project.findByPk(projID);
    res.send(projectg);
}

const UpdateProject = async (req, res) => {
    try {
        const data = req.body;
        // const updateObject = { ...data };
        // const projectg = await Project.findByPk(updateObject.projID);
        // console.log(projectg.crtDate + " " + formattedDate );
        // delete updateObject.projID;
        // updateObject.crtDate = projectg.crtDate;
        // updateObject.updDate = formattedDate;
        const updatedCount = await Project.update(data, {
        where: { projID: data.projID },
    });
    res.json(updatedCount);
    } catch (error) {
        console.error('Error while Updating project:', error);
        res.json({ error: "Can't Update" });
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
        const data = req.body;
        // const updateObject = { ...data };
        // delete updateObject.bugID;
        const updatedCount = await Bug.update(data, {
        where: { bugID: data.bugID },
    });
    res.json(updatedCount);
    } catch (error) {
        console.error('Error while Updating Bug:', error);
        res.json({ error: "Can't Update" });
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
        const bugID = req.params.bugID;
        const bug_byid = await Project.findByPk(bugID);
        res.send(bug_byid);
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
        const data = {...body}
        const newTeam = await Team.create(data)
        res.json(newTeam)
    }catch (error) {
        console.error('Error creating team:', error);
        res.json({ error: "Error While Adding Please Check" });
    }
}

const Updateteam = async(req, res)=>{
    try{
        const body = req.body;
        //const data = {...body}
        const count = await Team.update(body, {
            where: { teamID: body.teamID }
        })
        res.json(count);
    }catch(error){
        console.error('Error while Updating Team:', error);
        res.json({ error: "Can't Update" });
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
        console.error('Error creating team:', error);
        res.json({ error: "Error While Adding Please Check" });
    }
    
}

const UpdateProjectAssign = async(req, res)=>{
    try{
        const body = req.body;
        //const data = {...body}
        const count = await PAssign.update(body, {
            where: { assignID: body.assignID }
        })
        res.json(count);
    }catch(error){
        console.error('Error while Updating Project Assignment details:', error);
        res.json({ error: "Can't Project Assignment details" });
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
        const body = req.body
        req.body.status = "Assigned"
        console.log("Hello ",body);
        const updateCount = await Tracker.update(body,{
            where:{trackID: body.trackID}
        })
        res.json(updateCount)
    }catch(error){
        console.error('Error updating bug tracking details: ', error);
        res.json({ error: "Can't update details" })
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
router.put("/updateTracker", UpdateTrack)
router.delete("/deletetracks/:id",DeleteTrack)


module.exports = router;
