require('dotenv').config();

const express = require('express');
const router = require('./routes');

const PORT = process.env.PORT;

const app = express();

app.use(express.json()); // Позволяет работать с JSON
app.use('/api', router);

app.listen(PORT, () => console.log(`Server is now running on port: ${PORT}`));
