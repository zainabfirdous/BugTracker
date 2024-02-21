const { INTEGER, STRING } = require('sequelize');
const con = require('../config/database.js');

const role = con.define
('role',{
    roleID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
        validate:{
            notNull: {
                msg: 'RoleID can not be empty'
              },
            isInt: {
            msg: 'Role ID must be an integer'
        }}
    },
    roleName:{
        type:STRING,
        allowNull: false,
        validate:{
            notNull: {
                msg: 'Role name can not be empty'
              },
            isAlpha:{
            msg:'Role name must contain only alphabetic characters'
        }}
    },
},{ tableName: 'role',timestamps:false, freezeTableName:false})

module.exports=role;