const { STRING, INTEGER, DATEONLY ,NOW} = require('sequelize');
const con = require('../config/database.js');

const Team = con.define(
    'team',{
        TeamID:{
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
            allowNull: false,
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
        beforeUpdate: (team, options) => {
            // Update the updDate field with the current date
            team.updDate = new Date().toISOString().split('T')[0];
            // Return the modified team object
            return Promise.resolve(team);
        }
    }
    }
)

module.exports = Team;