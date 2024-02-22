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
            validate:{
                    notNull: {
                        msg: 'BugID can not be empty'
                      },
                isInt: {
                msg: 'Bug ID must be an integer'
            }}
        },
        assignBy:{
            type: INTEGER,
            allowNull: true,
            references: {
              model: 'Employee',
              key: 'empID',
            },
            defaultValue:null,
            validate:{
                isInt: {
                msg: 'Admin Not found!!!'
            }}
        },
        assignTo:{
            type: INTEGER,
            allowNull: true,
            references: {
              model: 'Employee',
              key: 'empID',
            },
            defaultValue: null,
            validate:{
                isInt: {
                msg: 'Employee Not found!!!'
            }}
        },
        assignDate:{
            type:DATE,
            allowNull: true,
            defaultValue: null,
            validate: {
                isNotPastDate(value) {
                    if (value !== null) {
                    console.log('Value: ', value)
                    const currentDate = new Date();
                    console.log('current date: ', currentDate)
                    console.log('Value Date: ', new Date(value));
                    if (new Date(value) < currentDate) {
                        throw new Error('Assign date must be a future date');
                    }}
                },
                isDate: {
                    msg: 'Assign date must be in date format'
                }
            }
        },
        assignTime:{
            type:TIME,
            allowNull: true,
            defaultValue: null,
            validate: {
                isNotPastTime(value) {
                    if (value !== null) {
                    const currentTime = new Date();
                    const providedTime = new Date(value);
    
                    if ( providedTime < currentTime) {
                        throw new Error('Time cannot be in the past');
                    }}
                }
            }
        },
        dueDate:{
            type:DATEONLY,
            allowNull: true,
            defaultValue: null,
            validate: {
                isNotPastDate(value) {
                    if (value !== null) {
                    const currentDate = new Date();
                    if (new Date(value) < currentDate) {
                        throw new Error('Due date must be a future date');
                    }}
                },
                isDate: {
                    msg: 'Due date must be in date format'
                }
            }
        },
        dueTime:{
            type:TIME,
            allowNull: true,
            defaultValue: null,
            validate: {
                isNotPastTime(value) {
                    if (value !== null) {
                    const currentTime = new Date();
                    const providedTime = new Date(value);
    
                    if (providedTime < currentTime) {
                        throw new Error('DueTime cannot be in the past');
                    }}
                }
            }
        },
        compDate:{
            type:DATEONLY,
            allowNull:true,
            defaultValue: null,
            validate: {
                isNotPastDate(value) {
                    if (value !== null) {
                    const currentDate = new Date();
                    if (new Date(value) <= currentDate) {
                        throw new Error('Comp date must be a future date or current date');
                    }}
                },
                isDate: {
                    msg: 'Comp date must be in date format or current date'
                }
            }
        },
        compTime:{
            type:TIME,
            allowNull:true,
            defaultValue: null,
            validate: {
                isNotPastTime(value) {
                    if (value !== null) {
                    const currentTime = new Date();
                    const providedTime = new Date(value);
    
                    if (providedTime < currentTime) {
                        throw new Error('CompTime cannot be in the past');
                    }}
                }
            }
        },
        status:{
            type:STRING,
            allowNull:false,
            validate:{
                notNull: {
                    msg: 'status can not be empty'
                  },
                isAlpha:{
                    msg:'Status can not be string'
                }
            }
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