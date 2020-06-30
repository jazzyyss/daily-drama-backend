//modules
const express = require('express');
const app = express();
const cors = require('cors');
//required files
const blogRoute = require('./routes/blog');
const commentsRoute = require('./routes/comments');
//startup files
require('./startup/db')();
//middlewares
app.use(cors());
app.use(express.json());
//using routes
app.use('/blog', blogRoute);
app.use('/comments', commentsRoute);

const port = process.env.PORT || 5000;
const server = app.listen(port, err => {
    err ? console.log(`Error connecting to port ${port}`) : console.log(`Listening on port ${port}`);
});
module.exports = server;