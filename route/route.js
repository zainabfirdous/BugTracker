const express = require('express');
const router = express.Router();
const employee = require('../models/Employee.js');
const EmpProfile = require('../models/EmpProfile.js');
const Project = require('../models/Project.js')


router.get("/get", async (req, res) => {
    try {
        // Fetch all employees from the database
        const employees = await employee.findAll();

        // Render a template or send JSON response with the employees
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
    }
})


router.post("/newEmployee", async (req, res) => {
    try {
        const body = req.body;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const data = { ...body };
        data.crtDate = formattedDate;
        data.updDate = null;
        const newEmp = await employee.create(data);
        res.json(newEmp);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await employee.destroy({ where: { empID: id } });
        res.json(deletedCount);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.json({ error: "This Employee Can't Delete, (FK-In_Use)" });
    }
    
})

router.post('/login', async (req, res) => {
    const username = req.body.userName;
    const pass = req.body.password;
    const user = await EmpProfile.findOne({
        attributes: ['empID', 'userName', 'password'], // Specify the columns you need
        where: { userName: username }
    });

    if (user) {
        // The user exists in the database.
        console.log(user);

        // Checking if the password entered is matching the original password
        if (user.password === pass) {
            //   res.send('Login successful!');
            res.json({ token: "thisismytoken" });
        } else {
            // Password is incorrect.
            res.send('Incorrect Password');
        }
    } else {
        // The user does not exist in the database
        res.send('User not found');
    }
})


router.put("/updateEmployee", async (req, res) => {
    try {
        const data = req.body;
        const updateObject = { ...data };
        delete updateObject.empID;
        const updatedCount = await employee.update(updateObject, {
        where: { empID: data.empID },
    });
    res.json(updatedCount);
    } catch (error) {
        console.error('Error while Updating employee:', error);
        res.json({ error: "Can't Update" });
    }
})

router.get("/getprojects", async (req, res) => {
    try {
        const proj = await Project.findAll();
        res.json(proj);
    } catch (error) {
        console.error('Error fetching Projects:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post("/newProject", async (req, res) => {
    try {
        const body = req.body;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const data = { ...body };
        data.crtDate = formattedDate;
        data.updDate = null;
        const newproj = await Project.create(data);
        res.json(newproj);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.put("/updateProject", async (req, res) => {
    try {
        const data = req.body;
        const updateObject = { ...data };
        delete updateObject.projID;
        const updatedCount = await Project.update(updateObject, {
        where: { projID: data.projID },
    });
    res.json(updatedCount);
    } catch (error) {
        console.error('Error while Updating employee:', error);
        res.json({ error: "Can't Update" });
    }
})

router.delete("/deleteproj/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await Project.destroy({ where: { projID: id } });
        res.json(deletedCount);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.json({ error: "This Employee Can't Delete, (FK-In_Use)" });
    }
    
})


module.exports = router;