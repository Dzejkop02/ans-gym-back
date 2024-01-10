const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const {homeRouter} = require('./routers/home.js');
const {exercisesRouter} = require("./routers/exercise");
const {muscleRouter} = require("./routers/muscle");
const {userRouter} = require("./routers/user");
const {authRouter} = require("./routers/auth");
const {ticketRouter} = require("./routers/ticket");

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    // allowedHeaders: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(cookieParser());

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use('/', homeRouter);
app.use('/exercise', exercisesRouter);
app.use('/muscle', muscleRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/ticket', ticketRouter);

app.listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
});