const con = require('../config/database.js');

const Admin = con.define(
    'admin',{
        adminID:{
            type:INTEGER,
            allowNull: false,
            primaryKey: true,
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
        },
        password:{
            type:STRING,
            allowNull: false,
        }
    },{ tableName: 'admin',timestamps:false, freezeTableName:false}
)