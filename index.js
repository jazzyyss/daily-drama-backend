//modules
const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
//required files
const blogRoute = require('./routes/blog');
const commentsRoute = require('./routes/comments');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
//startup files
require('./startup/logging')();
require('./startup/db')();
//middlewares
app.use(compression());
app.use(cors());
app.use(express.json());
//using routes
app.use('/blog', blogRoute);
app.use('/comments', commentsRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);

const port = process.env.PORT || 5000;
const server = app.listen(port, err => {
    err ? console.log(`Error connecting to port ${port}`) : console.log(`Listening on port ${port}`);
});
module.exports = server;