const express = require('express');
const cors = require('cors');
const {homeRouter} = require('./routers/home.js');
const {exercisesRouter} = require("./routers/exercise");
const {muscleRouter} = require("./routers/muscle");
const {userRouter} = require("./routers/user");
const {authRouter} = require("./routers/auth");

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    // allowedHeaders: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use('/', homeRouter);
app.use('/exercise', exercisesRouter);
app.use('/muscle', muscleRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
});