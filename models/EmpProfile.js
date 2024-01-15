const { INTEGER, STRING } = require('sequelize');
const con = require('../config/database.js');

const credential = con.define
('EmpProfile',{
    empID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: false,
    },
    userName:{
        type:STRING,
        allowNull: false,
    },
    password:{
        type:STRING,
        allowNull: false,
    }
},{ tableName: 'EmpProfile',timestamps:false, freezeTableName:false})

module.exports=credential;