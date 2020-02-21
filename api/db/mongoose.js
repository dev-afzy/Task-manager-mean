// This file will handle connection to the mongoDB database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log('connected successfully'))
    .catch(e => console.log(e));

module.exports = mongoose;