const { INTEGER,STRING, DATEONLY } = require('sequelize');
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
 },{ tableName: 'project',timestamps:false, freezeTableName:false} 
)

module.exports = proj;