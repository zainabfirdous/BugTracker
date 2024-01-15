const { INTEGER, STRING, DATE } = require('sequelize');
const con = require('../config/database.js');

const Emp = con.define
('Employee',{
    empID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    fName:{
        type:STRING,
        allowNull: false,
    },
    lName:{
        type:STRING,
        allowNull: false,
    },
    email:{
        type:STRING,
        allowNull: false,
    },
    roleID:{
        type:INTEGER,
        allowNull: false,
    },
    crtDate:{
        type: DATE,
    },
    updDate:{
        type: DATE,
    }
},{ tableName: 'Employee',timestamps:false, freezeTableName:false})

module.exports = Emp;