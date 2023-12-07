const express = require('express');
const {MuscleRecord} = require('../records/muscle.record');

const muscleRouter = express.Router();

muscleRouter
    .get('/', async (req, res) => {
        const musclesList = await MuscleRecord.findAll();

        res.json({
            musclesList,
        });
    });

module.exports = {
    muscleRouter,
}