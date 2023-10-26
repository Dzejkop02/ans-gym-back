const {Router} = require("express");

const homeRouter = Router();

homeRouter
    .get('/', (req, res) => {
        console.log('Hello!');
        res.json({message: 'Hello!'});
    });

module.exports = {
    homeRouter,
}