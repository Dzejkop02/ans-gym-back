const {Router} = require("express");
const jwt = require("jsonwebtoken");
const {UserRecord} = require("../records/user.record");
const {hashPwd} = require("../helpers/hashPwd");

const authRouter = Router();

authRouter
    .post('/login', async (req, res) => {
        const user = await UserRecord.findToLogin(req.body.email, hashPwd(req.body.password));

        if (!user) {
            return res.json({ok: false, error: 'Błędne dane logowania!'});
        }

        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            ticketName: user.ticketName,
        }

        const token = jwt.sign(payload,
            'asdf 43e#$%#$QF 43%$#DC #$%C#$Q% #$%C#$C54 rfaerf$@#FVSDfwerf4 f2w3fFWE',
            {expiresIn: 60 * 60 * 24},
        );

        res
            .cookie('jwt', token, {
                secure: false,
                domain: 'localhost',
                httpOnly: true,
            })
            .json({ok: true, user: payload});
    })
    .get('/logout', (req, res) => {
        res
            .clearCookie('jwt', {
                secure: false,
                domain: 'localhost',
                httpOnly: true,
            })
            .json({ok: true});
    });

module.exports = {
    authRouter,
}