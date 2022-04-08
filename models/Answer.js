'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class Answer extends Model {}

Answer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // exam_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },

    approach_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    correct:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    chosen_options:{
        type: DataTypes.JSON,
        allowNull: false,
    }
},{
    sequelize:db,
});

Answer.sync();
module.exports = Answer;