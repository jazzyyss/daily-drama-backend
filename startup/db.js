const mongoose = require('mongoose');
const config = require('config');

//mongoose parameters
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = () => {
    mongoose.connect(config.get('db'))
        .then(() => console.log(`Connected to MongoDB at ${config.get('db')}`));
}