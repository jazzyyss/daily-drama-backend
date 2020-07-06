const mongoose = require('mongoose');
const config = require('config');

const db = `mongodb://jas1197:${config.get('db_password')}@cluster0-shard-00-00.qsqvz.mongodb.net:27017,cluster0-shard-00-01.qsqvz.mongodb.net:27017,cluster0-shard-00-02.qsqvz.mongodb.net:27017/dailydrama?authSource=admin&replicaSet=atlas-k4t2jk-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true`
//mongoose parameters
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = () => {
    mongoose.connect(config.get('db'))
        .then(() => console.log(`Connected to MongoDB at ${config.get('db')}`));
}