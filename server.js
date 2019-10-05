const express = require('express');
const app = express();

//setting middleware
app.use(express.static('src'));

const server = app.listen(3000);