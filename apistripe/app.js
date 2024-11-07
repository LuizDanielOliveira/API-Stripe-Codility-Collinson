const express = require('express');
const cors = require('cors');
const api = require('./api');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', api);

app.listen(4000, () => {
    console.log('Servidor rodando na porta 3000');
});

module.exports = app;
