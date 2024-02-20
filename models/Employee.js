const { INTEGER, STRING, DATE, DATEONLY ,NOW} = require('sequelize');
const con = require('../config/database.js');

const Emp = con.define
('employee',{
    empID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate:{
            notNull: {
                msg: 'empID can not be null'
              }}
    },
    fName:{
        type:STRING,
        allowNull: false,
        validate:{
            notNull: {
                msg: 'First name can not be null', // Custom error message for notNull validation
              },
            isAlpha:{
            msg:'First name must contain only alphabetic characters'
        }}
    },
    lName:{
        type:STRING,
        allowNull: false,
        validate:{
            notNull: {
                msg: 'Last name can not be null'},
            isAlpha:{
            msg:'Last name must contain only alphabetic characters'
        }}
    },
    email:{
        type:STRING,
        allowNull: false,
        validate:{
            notNull: {
                msg: 'Email can not be null'},
            isEmail:{
            msg: 'Invalid email format'
        }}
    },
    roleID:{
        type:INTEGER,
        allowNull: false,
        validate:{
            notNull: {
                msg: 'RoleID can not be null'},
            isInt: {
            msg: 'Role must be Valid'
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