const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listModel = new Schema({
    title: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    }
});

const List = mongoose.model('List', listModel);
module.exports = List;