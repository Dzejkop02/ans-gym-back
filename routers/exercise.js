const express = require('express');
const {ExercisesRecord} = require('../records/exercise.record');

const exercisesRouter = express.Router();

exercisesRouter
    .get('/', async (req, res) => {
        const exercisesList = await ExercisesRecord.findAll();

        res.json({
            exercisesList,
        });
    })
    .get('/:id', async (req, res) => {
        const exercise = await ExercisesRecord.find(req.params.id);

        res.json({
            exercise,
        });
    });

module.exports = {
    exercisesRouter,
}