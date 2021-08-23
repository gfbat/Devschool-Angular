const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskApp', { useNewUrlParser: true }).then(() => {
    console.log("Connection to MongoDB works!");
}).catch((e: any) => {
    console.log("Connection error to MongoDB!");
    console.log(e);
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
}