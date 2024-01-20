const { INTEGER,STRING, DATEONLY,DATE } = require('sequelize');
const con = require('../config/database.js');

const proj = con.define(
 'project', {
    projID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
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
        type: DATE,
    },
    updDate:{
        type: DATE,
    }
 },{ tableName: 'project',timestamps:false, freezeTableName:false} 
)

module.exports = proj;