const express = require('express')
const Router = express.Router()

const Admin = require('../models/Admin.js');
const employee = require('../models/Employee.js');
const EmpProfile = require('../models/EmpProfile.js');
const userRole = require('../models/Role.js');
const hash = require('./Passwordhashing');
const bcrypt = require('bcrypt')
const Troute = require('./Tester.js')
const Droute = require('./Developer.js')
const Aroute = require('./AdminRoute.js')

Router.use("/admin", Aroute); 
Router.use("/dev", Droute); 
Router.use("/tester", Troute);


const LoginUser = async(req, res)=>{
    const {username, password} = req.body
    console.log("username , ", username);
    const emp = await EmpProfile.findOne({where:{username : username}})
    // console.log("emp.password : ",emp.password)
    // console.log("user entered hashedPassword : ", password)
    if(emp)
    {
        const isMatched = await bcrypt.compare( password, emp.password)
        if(isMatched){
            const user = await employee.findByPk(emp.empID);
            const urole = await userRole.findByPk(user.roleID);
            console.log("Emp ID : "+ emp.empID )
            return res.json({ token: "thisismytoken" , username : user.fName, urole : urole.roleName, uid:user.empID});
        }else {
            return res.json({ "error": "Wrong Password", Login : false});
        }
    }
    const admin = await Admin.findOne({where:{email:username}})
    if(admin)
    {
        const isMatched = await bcrypt.compare( password, admin.password)
        if(isMatched)
        {
            const adm = await Admin.findByPk(admin.admID);
    
    
        return res.json({ token: "thisismytoken" , username : adm.fName, urole : "Admin",uid : adm.admID});
         } else {
        // Password is incorrect.
       return res.json({ "error": "Wrong Password", Login : false});
          }}
    else{
        return res.json({"error":"No User found with username ", username})
          }
    }



Router.post("/Login", LoginUser);

module.exports = Router;









