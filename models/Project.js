const { INTEGER,STRING, DATEONLY, NOW } = require('sequelize');
const con = require('../config/database.js');

const proj = con.define(
 'project', {
    projID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            notNull: {
                msg: 'ProjID can not be empty'
              }}

    },
    projName:{
        type:STRING,
        allowNull:false,
        validate: {
            notNull: {
                msg: 'Project name can not be empty'
              },
            isAlphanumericWithSpace(value){
                const regex = /^[a-zA-Z0-9\s]+$/;
                if (!regex.test(value)) {
                    throw new Error('Project Name must contain only alphabets and numbers');
                }
            }
        }
    },
    startDate:{
        type:DATEONLY,
        allowNull:false,
        validate: {
            notNull: {
                msg: 'Start Date can not be empty'
              },
            isNotPastDate(value) {
                if (value !== null) {
                const currentDate = new Date();
                if (new Date(value) < currentDate) {
                    throw new Error('Start date must be a future date');
                }
            isDate: {
                msg: 'Start date must be in date format'
            }}
        }
    }
    },
    endDate:{
        type:DATEONLY,
        allowNull:false,
        validate: {
            notNull: {
                msg: 'End Date can not be empty'
              },
            isNotPastDate(value) {
                if (value !== null) {
                const currentDate = new Date();
                if (new Date(value) < currentDate) {
                    throw new Error('End date must be a future date');
                }
            isDate: {
                msg: 'End date must be in date format'
            }}
        }
    }},
    status:{
        type:STRING,
        allowNull:false,
        validate:{
            notNull: {
                msg: 'Status can not be empty'
              },
            isAlpha:{
                msg:'status must be string'
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
 },{ tableName: 'project',timestamps:false, freezeTableName:false} 
)

module.exports = proj;