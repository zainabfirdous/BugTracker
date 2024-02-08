const { INTEGER,STRING,DATE} = require('sequelize');
const con = require('../config/database.js');

const Bug = con.define(
    'bug',{
        bugID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
        },
    bugName:{
        type:STRING,
        allowNull:false,
    },
    priority:{
        type:INTEGER,
        allowNull: false,
    },
    bugDesc:{
        type:STRING,
        allowNull:false,
    },
    projID: {
        type: INTEGER,
        allowNull: true,
        references: {
          model: 'Project',
          key: 'projID',
        },
      },
    regBy: {
        type: INTEGER,
        allowNull: true,
        references: {
          model: 'Employee',
          key: 'empID',
        },
    },
    crtDate:{
        type: DATE,
    },
    updDate:{
        type: DATE,
    },
},{ tableName: 'bug',timestamps:false, freezeTableName:false} 
)


module.exports = Bug;