'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class Exam extends Model {}
Exam.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    max_approaches: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: true,
    }},
    {
        sequelize:db,
});

Exam.sync();

module.exports = Exam
