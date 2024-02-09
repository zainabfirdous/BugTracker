const { INTEGER, DATEONLY ,NOW } = require('sequelize');
const con = require('../config/database.js');

const PAssignment = con.define(
    'projectassign',{
        assignID:{
            type:INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        projID: {
            type: INTEGER,
            allowNull: false,
            references: {
              model: 'Project',
              key: 'projID',
            },
          },
        teamID:{
            type: INTEGER,
            allowNull: false,
            references: {
              model: 'Team',
              key: 'TeamID',
            },
        },
        empID:{
            type: INTEGER,
            allowNull: false,
            references: {
             model: 'Employee',
             key: 'empID',
        },
        },
        crtDate:{
          type: DATEONLY,
          defaultValue: NOW
      },
      updDate:{
          type: DATEONLY,
          defaultValue: null
      }
    },{ tableName: 'projectassign',timestamps:false, freezeTableName:false}
)

module.exports = PAssignment;