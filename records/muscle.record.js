const {pool} = require("../utils/db");

class MuscleRecord {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
    }

    static async findAll() {
        const [results] = await pool.execute('SELECT * FROM `muscles` ORDER BY name;');
        return results.map(result => new MuscleRecord(result));
    }
}

module.exports = {
    MuscleRecord,
};