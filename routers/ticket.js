const express = require('express');
const jwt = require("jsonwebtoken");
const {UserRecord} = require("../records/user.record");

const ticketRouter = express.Router();

ticketRouter
    .post('/', async (req, res) => {
        const token = req.cookies.jwt;

        if(!token) {
            res.json({ok: false, error: 'Not logged in.'});
            return;
        }

        const data = await jwt.verify(token,
            'asdf 43e#$%#$QF 43%$#DC #$%C#$Q% #$%C#$C54 rfaerf$@#FVSDfwerf4 f2w3fFWE',
        );

        const user = await UserRecord.find(data.email);
        const newTicket = req.body.ticketName;

        if (!['Silver', 'Gold', 'Platinum'].includes(newTicket)) {
            res.json({ok: false, error: 'Invalid ticket name!'});
            return;
        }

        const ticketUntil = new Date();
        ticketUntil.setMonth(ticketUntil.getMonth() + 1)

        await user.addTicket(newTicket, ticketUntil);

        // Update JWT
        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            ticketName: user.ticketName,
            ticketUntil: user.ticketUntil,
        }

        const newToken = jwt.sign(payload,
            'asdf 43e#$%#$QF 43%$#DC #$%C#$Q% #$%C#$C54 rfaerf$@#FVSDfwerf4 f2w3fFWE',
            {expiresIn: 60 * 60 * 24},
        );

        res
            .cookie('jwt', newToken, {
                secure: false,
                domain: 'localhost',
                httpOnly: true,
            })
            .json({ok: true, user: payload});
    })

module.exports = {
    ticketRouter,
}