const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: [true, 'no todo without something todo, enter something todo!'],
        trim: true,
        minlength: [1, 'enter something todo']
    },
    complete: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
