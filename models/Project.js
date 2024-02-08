const { INTEGER,STRING, DATEONLY, NOW } = require('sequelize');
const con = require('../config/database.js');

const proj = con.define(
 'project', {
    projID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    projName:{
        type:STRING,
        allowNull:false,
    },
    startDate:{
        type:DATEONLY,
        allowNull:false,
    },
    endDate:{
        type:DATEONLY,
        allowNull:false,
    },
    status:{
        type:STRING,
        allowNull:false,
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