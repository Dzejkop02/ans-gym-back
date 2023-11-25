const {pool} = require("../utils/db");

class ExerciseRecord {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.ytUrl = obj.ytUrl;
        this.equipment = obj.equipment;
        this.primaryMuscle = obj.primaryMuscle;
        this.supportedMuscles = obj.supportedMuscles; // Array (may be empty)
    }

    static async _getSupportedMuscles(id) {
        const [results] = await pool.execute('SELECT m.name FROM `supported_muscles` sm INNER JOIN `exercises` e ON sm.exerciseId = e.id INNER JOIN `muscles` m ON m.id = sm.muscleId WHERE e.id = :id;', {
            id,
        });
        return results.map(result => result.name);
    }

    static async findAll() {
        const [results] = await pool.execute('SELECT e.id, e.name, e.ytUrl, eq.name AS equipment, m.name AS primaryMuscle FROM `exercises` e LEFT JOIN `equipments` eq ON e.equipmentId = eq.id LEFT JOIN `muscles` m ON e.primaryMuscleId = m.id;');

        return Promise.all(results.map(async result => {
            const supportedMuscles = await ExerciseRecord._getSupportedMuscles(result.id);
            return new ExerciseRecord({...result, supportedMuscles});
        }));
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