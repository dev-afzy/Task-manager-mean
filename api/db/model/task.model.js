const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskMOdel = new Schema({
    title: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Task = mongoose.model('Task', taskMOdel);
module.exports = Task;