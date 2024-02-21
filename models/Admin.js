const { INTEGER, STRING } = require('sequelize');
const con = require('../config/database.js');

const Admin = con.define(
    'admin',{
        admID:{
            type:INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate:{
                notNull: {
                    msg: 'empID can not be empty'
                  }}
        },
        fName:{
            type:STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'First name can not be empty'
                  },
                isAlpha:{
                msg:'First name must contain only alphabetic characters'
            }}
        },
        lName:{
            type:STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'Last name can not be empty'
                  },
                isAlpha:{
                msg:'Last name must contain only alphabetic characters'
            }}
        },
        email:{
            type:STRING,
            allowNull: false,
            unique: true,
            validate:{
                notNull: {
                    msg: 'Email can not be null'
                  },
                isEmail:{
                msg: 'Invalid email format'
            }}
        },
        password:{
            type:STRING,
            allowNull: false,
            validate:{
                isStrongPassword(value) {
                    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
                    if (!regex.test(value)) {
                        throw new Error('Password must be 8-12 characters long and contain at least 1 alphabets, 1 digits, and 1 special character');
                    }
                }
                
            }
        }
    },{ tableName: 'admin',timestamps:false, freezeTableName:false, hooks: {
        async beforeCreate(empProfile) {
            const hashedPassword = await hash(empProfile.password);
            empProfile.password = hashedPassword;
        },
        async beforeUpdate(empProfile) {
            console.log("inside trigger")
            if (empProfile.changed('password')) {
    
                const hashedPassword = await hash(empProfile.password);
                console.log("hashedPassword : ",hashedPassword)
                empProfile.password = hashedPassword;
            }
        }}}
)

module.exports=Admin;