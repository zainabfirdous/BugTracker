const employee = require('../models/Employee.js');
const Project = require('../models/Project.js')
const Bug = require('../models/Bug.js')
const Admin = require('../models/Admin.js')




const express = require('express');
const router = express.Router();

router.get("/adminDashboard", async(req, res)=>{
    try{
        const admin = await Admin.findByPk(adminID);
        res.json(admin);
    }catch(error)
    {
        console.error('Error fetching details of admin: '+error);
        res.status(500).send('Internal Server Error');
    }
})

router.get("/getEmployees", async (req, res) => {
    try {
        // Fetch all employees from the database
        const employees = await employee.findAll();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get("getEmpByID/:id", async (req,res) =>{
    try{
        const empID = req.params.empID;
        const emp_byid = await Project.findByPk(empID);
        res.send(emp_byid);
    }catch(error){
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
    }
    
})


router.post("/newEmployee", async (req, res) => {
    try {
        const body = req.body;
        const data = { ...body };
        data.crtDate = formattedDate;
        data.updDate = null;
        const newEmp = await employee.create(data);
        res.json(newEmp);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.json({ error: "Error While Adding Please Check" });
    }
})

router.delete("/deleteEmp/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await employee.destroy({ where: { empID: id } });
        res.json(deletedCount);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.json({ error: "This Employee Can't be deleted, (FK-In_Use)" });
    }
    
})


router.put("/updateEmployee", async (req, res) => {
    try {
        const data = req.body;
        const updateObject = { ...data };
        const employees = await employee.findByPk(updateObject.empID);
        console.log(employees.crtDate + " " + formattedDate );
        delete updateObject.empID;
        updateObject.crtDate = employees.crtDate;
        updateObject.updDate = formattedDate;
        const updatedCount = await employee.update(updateObject, {
        where: { empID: data.empID },
    });
        
    res.json(updatedCount);
    } catch (error) {
        console.error('Error while Updating employee:', error);
        res.json({ error: "Can't Update" });
    }
})

router.get("/getProjects", async (req, res) => {
    try {
        const proj = await Project.findAll();
        res.json(proj);
    } catch (error) {
        console.error('Error fetching Projects:', error);
        res.json({ error: "Error While Getting Projects Info" });
    }
})

router.post("/newProject", async (req, res) => {
    try {
        const body = req.body;
        const data = { ...body };
        data.crtDate = formattedDate;
        data.updDate = null;
        const newproj = await Project.create(data);
        res.json(newproj);
    } catch (error) {
        console.error('Error creating project:', error);
        res.json({ error: "Error While Adding Please Check" });
    }
})

router.get("/getprojbyid/:projID", async (req,res) =>{
    const pprojID = req.params.projID;
    const projectg = await Project.findByPk(pprojID);
    res.send(projectg);
})

router.put("/updateProject", async (req, res) => {
    try {
        const data = req.body;
        const updateObject = { ...data };
        const projectg = await Project.findByPk(updateObject.projID);
        console.log(projectg.crtDate + " " + formattedDate );
        delete updateObject.projID;
        updateObject.crtDate = projectg.crtDate;
        updateObject.updDate = formattedDate;
        const updatedCount = await Project.update(updateObject, {
        where: { projID: data.projID },
    });
    res.json(updatedCount);
    } catch (error) {
        console.error('Error while Updating project:', error);
        res.json({ error: "Can't Update" });
    }
})

router.delete("/deleteproj/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await Project.destroy({ where: { projID: id } });
        res.json(deletedCount);
    } catch (error) {
        console.error('Error deleting project:', error);
        res.json({ error: "This project Can't be deleted, (FK-In_Use)" });
    }
    
})

router.get("/getbugs", async (req, res) => {
    try {
        const bug = await Bug.findAll();
        res.json(bug);
    } catch (error) {
        console.error('Error fetching bugs:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.put("/updateBug", async (req, res) => {
    try {
        const data = req.body;
        const updateObject = { ...data };
        delete updateObject.bugID;
        const updatedCount = await Bug.update(updateObject, {
        where: { bugID: data.bugID },
    });
    res.json(updatedCount);
    } catch (error) {
        console.error('Error while Updating Bug:', error);
        res.json({ error: "Can't Update" });
    }
})

router.delete("/deletebug/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await Bug.destroy({ where: { bugID: id } });
        res.json(deletedCount);
    } catch (error) {
        console.error('Error while deleting bug:', error);
        res.json({ error: "This Bug Can't be Deleted, (FK-In_Use)" });
    }
    
})

router.get("/BugbyID/:id", async(req, res)=>{
    try{
        const bugID = req.params.bugID;
        const bug_byid = await Project.findByPk(bugID);
        res.send(bug_byid);
    }catch(error){
        console.error('Error fetching Bug:', error);
        res.status(500).send('Internal Server Error');
    }
})
