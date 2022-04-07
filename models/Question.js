'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class Question extends Model {}
Question.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    options:{
        type:DataTypes.JSON,
        allowNull:false
    },
    exam_id :{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    
},
{
    sequelize:db,
    timestamps:false}
)
Question.sync();
module.exports = Question;