 
const { INTEGER,STRING, DATEONLY ,NOW, TEXT, TIME} = require('sequelize');
const Sequelize = require('sequelize');

const con = require('../config/database.js');
const { Validator } = require('sequelize');

// Custom validation function to allow alphabets, numbers, and spaces
const isAlphanumericWithSpaces = (value) => {
    // Regular expression to match alphabets, numbers, and spaces
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(value)) {
        throw new Error('Bug Description must contain only alphabets, numbers, and spaces');
    }
};

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
          isAlpha:{
            msg: 'Priority can contain only string'
          }
        }
    },
    bugDesc:{
        type:TEXT,
        allowNull:false,
        validate: {
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
        validate:{isInt: {
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
        validate:{isInt: {
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