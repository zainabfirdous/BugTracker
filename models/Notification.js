const { INTEGER, STRING, TEXT, TIME, NOW } = require('sequelize');
const con = require('../config/database.js');

const Notification = con.define('notification', {
    notiID: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            notNull: {
                msg: 'notiID cannot be empty'
            }
        }
    },
    sender: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Sender cannot be empty'
            },
            isInt: {
                msg: 'Sender must be a valid integer'
            }
        }
    },
    receiver: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Receiver cannot be empty'
            },
            isInt: {
                msg: 'Receiver must be a valid integer'
            }
        }
    },
    message: {
        type: TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Message cannot be empty'
            }
        }
    },
    status: {
        type: STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Status cannot be empty'
            }
        }
    },
    bugID: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'bugID cannot be empty'
            },
            isInt: {
                msg: 'bugID must be a valid integer'
            }
        }
    },
    trackID: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'trackID cannot be empty'
            },
            isInt: {
                msg: 'trackID must be a valid integer'
            }
        }
    },
    time: {
        type: TIME,
        defaultValue: null
    },
    seenTime: {
        type: TIME,
        defaultValue: null
    }
}, {
    tableName: 'notification',
    timestamps: false,
    freezeTableName: true
});

module.exports = Notification;
