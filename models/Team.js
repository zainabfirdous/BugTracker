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
            validate:{isInt: {
                msg: 'admin ID must be an integer'
            }}
        },
        teamName:{
            type:STRING,
            allowNull: false,
            validate:{isAlpha:{
                msg:'Team name must contain only alphabetic characters'
            }}
        },
        projID:{
            type: INTEGER,
            allowNull: true,
            references: {
                model: 'Project',
                key: 'projID',
        },validate:{isInt: {
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