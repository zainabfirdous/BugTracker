 
const { INTEGER,STRING, DATEONLY ,NOW, TEXT, TIME} = require('sequelize');
const Sequelize = require('sequelize');

const con = require('../config/database.js');

const Bug = con.define(
    'bug',{
        bugID:{
        type:INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
    bugName:{
        type:STRING,
        allowNull:false,
    },
    priority:{
        type:STRING,
        allowNull: false,
    },
    bugDesc:{
        type:TEXT,
        allowNull:false,
    },
    projID: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'Project',
          key: 'projID',
        },
      },
    regBy: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'Employee',
          key: 'empID',
        },
    },
    crtTime:{
      type:TIME,
      defaultValue: Sequelize.literal('CURRENT_TIME')
    },
    crtDate:{
      type: DATEONLY,
      defaultValue: NOW
  },
  updDate:{
      type: DATEONLY,
      defaultValue: null
  }
},{ tableName: 'bug',timestamps: false, freezeTableName:false} 
)


module.exports = Bug;