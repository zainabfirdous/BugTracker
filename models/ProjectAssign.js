const { INTEGER, DATEONLY ,NOW } = require('sequelize');
const con = require('../config/database.js');

const PAssignment = con.define(
    'projectassign',{
        assignID:{
            type:INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate:{
              notNull: {
                msg: 'assignID can not be empty'
              }}
        },
        projID: {
            type: INTEGER,
            allowNull: false,
            references: {
              model: 'Project',
              key: 'projID',
            },
            validate:{
              notNull: {
                msg: 'projID can not be empty'
              },
              isInt: {
              msg: 'Project ID must be an integer'
          }}
          },
        teamID:{
            type: INTEGER,
            allowNull: false,
            references: {
              model: 'Team',
              key: 'TeamID',
            },
            validate:{
              notNull: {
                msg: 'TeamID can not be empty'
              },
              isInt: {
              msg: 'Team ID must be an integer'
          }}
        },
        empID:{
            type: INTEGER,
            allowNull: false,
            references: {
             model: 'Employee',
             key: 'empID',
        },
        validate:{
          notNull: {
            msg: 'empID can not be empty'
          },
          isInt: {
          msg: 'Employee ID must be an integer'
      }}
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