const { DataTypes, Model } = require('sequelize')
const db = require('../config/database')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    },
    sex: {
        type: DataTypes.CHAR
    }
}, {
    sequelize: db
})

module.exports = User