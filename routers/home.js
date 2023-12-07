const {Router} = require("express");
const {MuscleRecord} = require("../records/muscle.record");
const {ExercisesRecord} = require("../records/exercise.record");

const homeRouter = Router();

homeRouter
    .get('/', async (req, res) => {
        const [musclesList, exercisesList] = await Promise.all([
            MuscleRecord.findAll(),
            ExercisesRecord.findAll(),
        ]);

        res.json({
            musclesList,
            exercisesList,
        });
    });

module.exports = {
    homeRouter,
}