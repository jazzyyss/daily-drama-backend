const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

module.exports = (app) => {
    app.use(helmet())
    app.use(compression());
    app.use(cors());
    app.use(express.json());
}