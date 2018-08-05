const mongoose = require('mongoose');
const router = require('express').Router();
const Todo = require('../db/todo');


// todo api routes:

// create -
// read -
// read all -
// edit
// set as completed
// set as not completed
// delete

// create new todo
router.post('/', (req, res) => {
    const text = req.body.text;
    const owner = new mongoose.Types.ObjectId();

    var todo = new Todo({owner, text});
    todo.save().then((r) => {
        res.send(r.toJSON());
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    });

});

// list all
router.get('/', (req, res) => {
    console.log('list data')
    Todo.find().then((r) => {
        res.send(r);
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    })
});

// read all
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Todo.findById(id).then((r) => {
        if (!r) return res.status(404).send({message: 'Not Found'});
        res.send(r.toJSON());
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    })
});


// edit todo text
router.patch('/:id', (req, res) => {
    var id = req.params.id;
    var text = req.body.text;

    Todo.findByIdAndUpdate(id, {$set: {text}}, {new: true}).then((r) => {
        if (!r) return res.status(404).send('Not Found');
        res.send(r.toJSON());
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    });
});


// set todo as completed
router.patch('/:id/complete', (req, res) => {
    var id = req.params.id;

    Todo.findByIdAndUpdate(id, {$set: {complete: true}}, {new: true}).then((r) => {
        if (!r) return res.status(404).send({message: "Not Found"});
        res.send(r.toJSON());
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    })
});

// set todo as not completed
router.patch('/:id/notcomplete', (req, res) => {
    var id = req.params.id;

    Todo.findByIdAndUpdate(id, {$set: {complete: false}}, {new: true}).then((r) => {
        if (!r) return res.status(404).send({message: "Not Found"});
        res.send(r.toJSON());
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    })
});

// delete todo
router.delete('/:id', (req, res) => {
    var id = req.params.id;

    Todo.findByIdAndDelete(id).then((r) => {
        if (!r) return res.status(404).send({message: "Not Found"});
        res.send(r.toJSON());
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    })
});


module.exports = router;
