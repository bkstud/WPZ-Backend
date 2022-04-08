'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');


class ExamApproach extends Model {}
ExamApproach.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },

    finish_time: {
        type: DataTypes.TIME,
        allowNull: true,
    }
},
{
    sequelize:db,
    timestamps:false,
});

ExamApproach.sync();
module.exports = ExamApproach;


