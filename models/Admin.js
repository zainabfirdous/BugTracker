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
            validate:{isAlpha:{
                msg:'First name must contain only alphabetic characters'
            }}
        },
        lName:{
            type:STRING,
            allowNull: false,
            validate:{isAlpha:{
                msg:'Last name must contain only alphabetic characters'
            }}
        },
        email:{
            type:STRING,
            allowNull: false,
            unique: true,
            validate:{isEmail:{
                msg: 'Invalid email format'
            }}
        },
        password:{
            type:STRING,
            allowNull: false,
            validate:{
                isStrongPassword(value) {
                    const regex = /^(?=.*[A-Za-z]{4})(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
                    if (!regex.test(value)) {
                        throw new Error('Password must be 8-12 characters long and contain at least 4 alphabets, 4 digits, and 1 special character');
                    }
                }
                
            }
        }
    },{ tableName: 'admin',timestamps:false, freezeTableName:false}
)

module.exports=Admin;