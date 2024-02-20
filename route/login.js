const express = require('express')
const Router = express.Router()
const {verifyAdmin} = require('./VerifyToken')
const {verifyTester} = require('./VerifyToken')
const {verifyDev} = require('./VerifyToken')
const Admin = require('../models/Admin.js');
const employee = require('../models/Employee.js');
const EmpProfile = require('../models/EmpProfile.js');
const userRole = require('../models/Role.js');
const bcrypt = require('bcrypt')
const Troute = require('./Tester.js')
const Droute = require('./Developer.js')
const Aroute = require('./AdminRoute.js')
const jwt = require("jsonwebtoken");


Router.use("/admin", verifyAdmin, Aroute); 
Router.use("/dev", verifyDev , Droute); 
Router.use("/tester", verifyTester , Troute);


const secretKey = process.env.JWT_SECRET_KEY ;
const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
};

const LoginUser = async(req, res)=>{
    const {username, password} = req.body
    console.log("username , ", username);
    const emp = await EmpProfile.findOne({where:{username : username}})
    if(emp)
    {
        const isMatched = await bcrypt.compare( password, emp.password)
        if(isMatched){
            const user = await employee.findByPk(emp.empID);
            const urole = await userRole.findByPk(user.roleID);
            console.log("Emp ID : "+ emp.empID )
            const token = generateToken({ empID: emp.empID, username: user.fName, role: urole.roleName });
           return res.status(200).json({ token: token , username : user.fName, urole : urole.roleName, uid:user.empID});
        }else {
            return res.status(401).json({ "error": "Wrong Password", Login : false});
        }
    }
    const admin = await Admin.findOne({where:{email:username}})
    if(admin)
    {
        const isMatched = await bcrypt.compare( password, admin.password)
        if(isMatched)
        {
            const adm = await Admin.findByPk(admin.admID);
    
           const token = generateToken({ empID: adm.admID, username: adm.email, role: 'Admin'});;
           return res.status(200).json({ token: token , username : adm.fName, urole : "Admin",uid : adm.admID});
         } else {
       return res.status(401).json({ "error": "Wrong Password", Login : false});
          }}
    else{
        return res.status(404).json({"error":"No User found with username ", username})
          }
    }



Router.post("/Login", LoginUser);

module.exports = Router;









