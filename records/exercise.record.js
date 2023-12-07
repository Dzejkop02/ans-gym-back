const {pool} = require("../utils/db");

class ExerciseRecord {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.ytUrl = obj.ytUrl;
        this.equipment = obj.equipment;
        this.primaryMuscle = obj.primaryMuscle;
        this.supportedMuscles = obj.supportedMuscles.map(m => m.name); // Array (maybe empty)
    }

    static async _getSupportedMuscles(id) {
        const [results] = await pool.execute('SELECT m.id, m.name FROM `supported_muscles` sm INNER JOIN `exercises` e ON sm.exerciseId = e.id INNER JOIN `muscles` m ON m.id = sm.muscleId WHERE e.id = :id;', {
            id,
        });
        return results;
    }

    static async findAll() {
        const [results] = await pool.execute('SELECT e.id, e.name, e.ytUrl, eq.name AS equipment, m.name AS primaryMuscle FROM `exercises` e LEFT JOIN `equipments` eq ON e.equipmentId = eq.id LEFT JOIN `muscles` m ON e.primaryMuscleId = m.id;');

        return Promise.all(results.map(async result => {
            const supportedMuscles = await ExerciseRecord._getSupportedMuscles(result.id);
            return new ExerciseRecord({...result, supportedMuscles});
        }));
    }

    static async findAllWithFilter(muscleId) {
        const [results] = await pool.execute('SELECT e.id, e.name, e.ytUrl, eq.name AS equipment, m.name AS primaryMuscle, m.id AS primaryMuscleId FROM `exercises` e LEFT JOIN `equipments` eq ON e.equipmentId = eq.id LEFT JOIN `muscles` m ON e.primaryMuscleId = m.id;');

        return (await Promise.all(results.map(async result => {
            const supportedMuscles = await ExerciseRecord._getSupportedMuscles(result.id);
            return {...result, supportedMuscles};
        }))).filter(result => (result.primaryMuscleId === muscleId || result.supportedMuscles.find(el => el.id === muscleId)))
            .sort((a, b) => a.primaryMuscleId === muscleId || b.primaryMuscleId !== muscleId ? -1 : 1)
            .map(result => new ExerciseRecord({...result}));
    }

    static async find(id) {
        const [results] = await pool.execute('SELECT e.id, e.name, e.ytUrl, eq.name AS equipment, m.name AS primaryMuscle FROM `exercises` e LEFT JOIN `equipments` eq ON e.equipmentId = eq.id LEFT JOIN `muscles` m ON e.primaryMuscleId = m.id WHERE e.id = :id;', {
            id,
        });

        if (results.length !== 1) {
            return null;
        }

        const supportedMuscles = await ExerciseRecord._getSupportedMuscles(id);

        return new ExerciseRecord({
            ...results[0],
            supportedMuscles
        });
    }
}

module.exports = {
    ExercisesRecord: ExerciseRecord,
};