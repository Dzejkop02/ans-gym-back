const express = require('express');

const app = express();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
    console.log('Hello!');
    res.end();
});

app.listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
});
