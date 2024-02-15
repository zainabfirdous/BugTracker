const { INTEGER, STRING, DATE, DATEONLY ,NOW} = require('sequelize');
const con = require('../config/database.js');

const Emp = con.define
('employee',{
    empID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fName:{
        type:STRING,
        allowNull: false,
        validate:{
            isAlpha:{
            msg:'First name must contain only alphabetic characters'
        }}
    },
    lName:{
        type:STRING,
        allowNull: false,
        validate:{
            isAlpha:{
            msg:'Last name must contain only alphabetic characters'
        }}
    },
    email:{
        type:STRING,
        allowNull: false,
        validate:{
            isEmail:{
            msg: 'Invalid email format'
        }}
    },
    roleID:{
        type:INTEGER,
        allowNull: false,
        validate:{isInt: {
            msg: 'Role ID must be an integer'
        }}
    },
    crtDate:{
        type: DATEONLY,
        defaultValue: NOW
    },
    updDate:{
        type: DATEONLY,
        defaultValue: null
    }
},{ tableName: 'Employee',timestamps:false, freezeTableName:false})

module.exports = Emp;