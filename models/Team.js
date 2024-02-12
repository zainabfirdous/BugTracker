const { STRING, INTEGER, DATEONLY ,NOW, Sequelize} = require('sequelize');
const con = require('../config/database.js');

const Team = con.define(
    'team',{
        teamID:{
            type:INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        admID:{
            type: INTEGER,
            allowNull: false,
            references: {
                model: 'Admin',
                key: 'adminID',
            },
        },
        teamName:{
            type:STRING,
            allowNull: false
        },
        projID:{
            type: INTEGER,
            allowNull: true,
            references: {
                model: 'Project',
                key: 'projID',
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
    },{ tableName: 'team',timestamps:false, freezeTableName:false,  hooks: {
        // Define a hook for updating updDate before saving
        beforeSave: (team, options) => {
            if (team.changed('updDate')) {
                team.updDate = Sequelize.literal('CURRENT_DATE');
            }
        }
    }}
)

module.exports = Team;