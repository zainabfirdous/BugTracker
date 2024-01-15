const express = require('express');
const router = express.Router();
const employee = require('../models/Employee.js');
const EmpProfile = require('../models/EmpProfile.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


router.get("/", async(req,res)=>{
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

router.post("/newEmployee", async(req, res)=>{
    try{
        const body = req.body;
        const newEmp = await employee.create(body);
        res.json(newEmp);
    }catch(error)
    {
        console.error('Error creating employee:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/login', async(req,res)=>{
        const username=req.body.userName;
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
                res.send('Login successful!');
            } else {
                // Password is incorrect.
                res.send('Incorrect Password');
            }
        } else {
            // The user does not exist in the database
            res.send('User not found');
        }
    })

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/user',
//     failureRedirect: '/login',
//     failureFlash: true
//   }));


// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/login');
//   }
  
//   router.get('/user', ensureAuthenticated, (req, res) => {
//     res.send('Welcome to the dashboard!');
//   });

//   router.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
//   });


module.exports = router;