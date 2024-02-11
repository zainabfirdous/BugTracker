const { INTEGER, STRING } = require('sequelize');
const con = require('../config/database.js');

const credential = con.define
('EmpProfile',{
    empID:{
        type:INTEGER,
        allowNull: false,
        references: {
            model: 'Employee',
            key: 'empID',
       },
    },
    userName:{
        type:STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type:STRING,
        allowNull: false,
    }
},{ tableName: 'EmpProfile',timestamps:false, freezeTableName:false})

module.exports=credential;