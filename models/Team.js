const { STRING, INTEGER, DATEONLY ,NOW, Sequelize} = require('sequelize');
const con = require('../config/database.js');

const Team = con.define(
    'team',{
        teamID:{
            type:INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate:{
                notNull: {
                    msg: 'adminID can not be empty'
                  }}
        },
        admID:{
            type: INTEGER,
            allowNull: false,
            references: {
                model: 'Admin',
                key: 'adminID',
            },
            validate:{
                notNull: {
                    msg: 'adminID can not be empty'
                  },
                isInt: {
                msg: 'admin ID must be an integer'
            }}
        },
        teamName:{
            type:STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'Team Name can not be empty'
                  },
                isAlphanumericWithSpace(value){
                    const regex = /^[a-zA-Z0-9\s]+$/;
                    if (!regex.test(value)) {
                        throw new Error('Team Name must contain only alphabets and numbers');
                    }
                }
            }
        },
        projID:{
            type: INTEGER,
            allowNull: true,
            references: {
                model: 'Project',
                key: 'projID',
        },validate:{
            isInt: {
            msg: 'Project ID must be an integer'
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
    },{ tableName: 'team',timestamps:false, freezeTableName:false,  hooks: {
        // Define a hook for updating updDate before updating the record
        beforeUpdate: (team, options) => {
            team.updDate = Sequelize.literal('CURRENT_DATE');
        }
    }

    }
)

module.exports = Team;