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
            allowNull: false,
            references: {
              model: 'Employee',
              key: 'empID',
            },
        },
        assignTo:{
            type: INTEGER,
            allowNull: true,
            references: {
              model: 'Employee',
              key: 'empID',
            },
        },
        assignTS:{
            type:DATE,
            allowNull: true
        },
        dueDate:{
            type:DATEONLY,
            allowNull: false
        },
        dueTime:{
            type:TIME,
            allowNull: false
        },
        compDate:{
            type:DATEONLY,
            allowNull:false
        },
        compTime:{
            type:TIME,
            allowNull:false
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