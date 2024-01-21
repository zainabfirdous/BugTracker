const { INTEGER, STRING } = require('sequelize');
const con = require('../config/database.js');

const role = con.define
('EmpProfile',{
    roleID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    roleName:{
        type:STRING,
        allowNull: false,
    },
},{ tableName: 'role',timestamps:false, freezeTableName:false})

module.exports=role;