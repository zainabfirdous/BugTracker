const { INTEGER, STRING, NOW, DATEONLY } = require('sequelize');
const con = require('../config/database.js');

const credential = con.define
('EmpProfile',{
    empID:{
        type:INTEGER,
        allowNull: false,
        references: {
            model: 'Employee',
            key: 'empID',
       },
    },
    userName:{
        type:STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAlphanumeric: {
                msg: 'Username must contain only alphabets and numbers'
            }
        }
    },
    password:{
        type:STRING,
        allowNull: false,
        validate: {
            isStrongPassword(value) {
                const regex = /^(?=.*[A-Za-z]{4})(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
                if (!regex.test(value)) {
                    throw new Error('Password must be 8-12 characters long and contain at least 4 alphabets, 4 digits, and 1 special character');
                }
            }
        }
    },
    crtDate:{
        type: DATEONLY,
        defaultValue: NOW
    },
    updDate:{
        type: DATEONLY,
        defaultValue: null
    }
},{ tableName: 'EmpProfile',timestamps:false, freezeTableName:false})

module.exports=credential;