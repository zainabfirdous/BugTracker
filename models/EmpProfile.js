const { INTEGER, STRING, NOW, DATEONLY } = require('sequelize');
const con = require('../config/database.js');
const hash = require('../route/Passwordhashing');
const credential = con.define
('EmpProfile',{
    empID:{
        type:INTEGER,
        allowNull: false,
        references: {
            model: 'Employee',
            key: 'empID',
       },
       validate: {
        notNull: {
            msg: 'empID can not be empty'
          }}
        },
    username:{
        type:STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Username can not be empty'
              },
            isAlphanumericWithSpace(value){
                const regex = /^[a-zA-Z0-9\s]+$/;
                if (!regex.test(value)) {
                    throw new Error('Username must contain only alphabets and numbers');
                }
            }
        }
    },
    password:{
        type:STRING,
        allowNull: false,
        validate: {
            isStrongPassword(value) {
                const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
                if (!regex.test(value)) {
                    throw new Error('Password must be 8-20 characters long and contain at least 1 alphabets, 1 digits, and 1 special character');
                }
            }
        }
    },
    // crtDate:{
    //     type: DATEONLY,
    //     defaultValue: NOW
    // },
    // updDate:{
    //     type: DATEONLY,
    //     defaultValue: null
    // }
},{ tableName: 'EmpProfile',timestamps:false, freezeTableName:false, hooks: {
    async beforeCreate(empProfile) {
        const hashedPassword = await hash(empProfile.password);
        empProfile.password = hashedPassword;
    },
    async beforeUpdate(empProfile) {
        if (empProfile.changed('password')) {

            const hashedPassword = await hash(empProfile.password);
            console.log("hashedPassword : ",hashedPassword)
            empProfile.password = hashedPassword;
        }
    }
}});

credential.removeAttribute('id');

module.exports=credential;