const { INTEGER, STRING } = require('sequelize');
const con = require('../config/database.js');

const Admin = con.define(
    'admin',{
        admID:{
            type:INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fName:{
            type:STRING,
            allowNull: false,
        },
        lName:{
            type:STRING,
            allowNull: false,
        },
        email:{
            type:STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type:STRING,
            allowNull: false,
        }
    },{ tableName: 'admin',timestamps:false, freezeTableName:false}
)

module.exports=Admin;