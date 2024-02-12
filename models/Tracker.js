const { DATEONLY,DATE, INTEGER, TIME, STRING  ,NOW} = require('sequelize');
const con = require('../config/database.js');

const tracking = con.define(
    'tracking',{
        trackID:{
            type:INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        bugID:{
            type: INTEGER,
            allowNull: false,
            references: {
              model: 'Bug',
              key: 'bugID',
            },
        },
        assignBy:{
            type: INTEGER,
            allowNull: true,
            references: {
              model: 'Employee',
              key: 'empID',
            },
            defaultValue:null
        },
        assignTo:{
            type: INTEGER,
            allowNull: true,
            references: {
              model: 'Employee',
              key: 'empID',
            },
            defaultValue: null
        },
        assignDate:{
            type:DATE,
            allowNull: true,
            defaultValue: null
        },
        assignTime:{
            type:TIME,
            allowNull: true,
            defaultValue: null
        },
        dueDate:{
            type:DATEONLY,
            allowNull: true,
            defaultValue: null
        },
        dueTime:{
            type:TIME,
            allowNull: true,
            defaultValue: null
        },
        compDate:{
            type:DATEONLY,
            allowNull:true,
            defaultValue: null
        },
        compTime:{
            type:TIME,
            allowNull:true,
            defaultValue: null
        },
        status:{
            type:STRING,
            allowNull:false
        },
        crtDate:{
            type: DATEONLY,
            defaultValue: NOW
        },
        updDate:{
            type: DATEONLY,
            defaultValue: null
        }
    },{ tableName: 'tracking',timestamps:false, freezeTableName:false} 
)

module.exports = tracking;