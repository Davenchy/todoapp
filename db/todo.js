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

todoSchema.methods.toJSON = function () {
    const todo = this;
    return {
        id: todo._id,
        text: todo.text,
        complete: todo.complete
    }
}

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
