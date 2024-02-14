const { INTEGER, STRING } = require('sequelize');
const con = require('../config/database.js');

const role = con.define
('role',{
    roleID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
        validate:{isInt: {
            msg: 'Role ID must be an integer'
        }}
    },
    roleName:{
        type:STRING,
        allowNull: false,
        validate:{isAlpha:{
            msg:'Role name must contain only alphabetic characters'
        }}
    },
},{ tableName: 'role',timestamps:false, freezeTableName:false})

module.exports=role;