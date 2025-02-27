const express = require('express');
const app = express();

app.use(express.json());

const dbConfig = require('./config/dbConfig')
const usersRoute = require('./routes/usersRoute')

app.use('/api/users', usersRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});