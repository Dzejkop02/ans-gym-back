const {Router} = require("express");
const {UserRecord} = require("../records/user.record");
const {hashPwd} = require("../helpers/hashPwd");

const userRouter = Router();

userRouter
    .post('/', async (req, res) => {
        const userData = req.body;

        if (!userData.email.includes('@')) {
            res.json({
                ok: false,
                error: 'Błędny email.'
            });
            return;
        }

        if (!userData.firstName || !userData.lastName ) {
            res.json({
                ok: false,
                error: 'Podaj imię i nazwisko.'
            });
            return;
        }

        const foundUser = await UserRecord.find(userData.email);

        if (foundUser) {
            res.json({
                ok: false,
                error: 'Ten email jest już zajęty.'
            });
            return;
        }

        const newUser = new UserRecord(userData);
        newUser.pwdHash = hashPwd(userData.password);
        await newUser.save();

        res.json({
            ok: true,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
        });
    });

module.exports = {
    userRouter,
}