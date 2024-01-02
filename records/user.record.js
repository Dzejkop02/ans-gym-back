const {pool} = require("../utils/db");

class UserRecord {
    constructor(obj) {
        this.id = obj.id;
        this.email = obj.email;
        this.pwdHash = obj.pwdHash;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
    }

    static async find(email) {
        const [results] = await pool.execute('SELECT * FROM `users` WHERE `email` = :email;', {email});
        return results[0] ? new UserRecord(results[0]) : null;
    }

    async save() {
        await pool.execute('INSERT INTO `users` (email, pwdHash, firstName, lastName) VALUES (:email, :pwdHash, :firstName, :lastName);', {
            email: this.email,
            pwdHash: this.pwdHash,
            firstName: this.firstName,
            lastName: this.lastName,
        });
    }
}

module.exports = {
    UserRecord,
};