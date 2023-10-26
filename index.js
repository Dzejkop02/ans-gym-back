const express = require('express');
const cors = require('cors');
const {homeRouter} = require('./routers/home.js');

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

app.listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
});