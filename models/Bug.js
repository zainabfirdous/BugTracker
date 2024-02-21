 
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
        validate: {
          notNull: {
            msg: 'Bug name can not be empty'
          },
          isAlphanumericWithSpace(value){
            const regex = /^[a-zA-Z0-9\s]+$/;
            if (!regex.test(value)) {
                throw new Error('Bug Name must contain only alphabets and numbers');
            }
        }
      }
    },
    priority:{
        type:STRING,
        allowNull: false,
        validate:{
          notNull: {
            msg: 'Priority can not be empty'
          },
          isAlpha:{
            msg: 'Priority can contain only string'
          }
        }
    },
    bugDesc:{
        type:TEXT,
        allowNull:false,
        validate: {
          notNull: {
            msg: 'Bug Description can not be empty'
          },
          isAlphanumericWithSpace(value){
            const regex = /^[a-zA-Z0-9\s]+$/;
            if (!regex.test(value)) {
                throw new Error('Bug Description must contain only alphabets and numbers');
            }
        }
      }
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
            msg: 'ProjID can not be empty'
          },
          isInt: {
          msg: 'Project ID must be an integer'
      }}
      },
    regBy: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'Employee',
          key: 'empID',
        },
        validate:{
          notNull: {
            msg: 'Employee ID can not be empty'
          },
          isInt: {
          msg: 'Employee ID must be an integer'
      }}
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