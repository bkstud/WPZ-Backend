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
    }
},
{
    sequelize:db,
});

ExamApproach.sync();
module.exports = ExamApproach;


