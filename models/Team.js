const { STRING } = require('sequelize');
const con = require('../config/database.js');

const Team = con.define(
    'team',{
        TeamID:{
            type:INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        adminID:{
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
        }
    },{ tableName: 'team',timestamps:false, freezeTableName:false} 
)

module.exports = Team;