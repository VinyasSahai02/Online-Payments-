const express = require('express');
const app = express();

const dbConfig = require('./config/dbConfig')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});