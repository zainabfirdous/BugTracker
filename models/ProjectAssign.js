const { INTEGER } = require('sequelize');
const con = require('../config/database.js');

const PAssignment = con.define(
    'projectassign',{
        assignID:{
            type:INTEGER,
            allowNull: false,
            primaryKey: true,
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
            allowNull: flase,
            references: {
              model: 'Team',
              key: 'TeamID',
            },
        },
        EmpID:{
            type: INTEGER,
            allowNull: false,
            references: {
             model: 'Employee',
             key: 'empID',
        },
        }
    },{ tableName: 'projassign',timestamps:false, freezeTableName:false}
)

module.exports = PAssignment;