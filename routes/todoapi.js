const mongoose = require('mongoose');
const router = require('express').Router();
const Todo = require('../db/todo');
const authenticate = require('../db/authenticate');


// todo api routes:

// create -
// read -
// read all -
// edit
// set as completed
// set as not completed
// delete

// create new todo
router.post('/',authenticate(true), (req, res) => {

    const text = req.body.text;
    const owner = req.auth.user._id;

    var todo = new Todo({owner, text});
    todo.save().then((r) => {
        res.send(r);
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    });

});

// list all
router.get('/',authenticate(true), (req, res) => {
    Todo.find({'owner': req.auth.user._id}).then((r) => {
        res.send(r);
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    })
});

// read all
router.get('/:id',authenticate(true), (req, res) => {
    const id = req.params.id;
    Todo.findOne({'_id': id, 'owner': req.auth.user._id}).then((r) => {
        if (!r) return res.status(404).send({message: 'Not Found'});
        res.send(r);
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    })
});


// edit todo text
router.patch('/:id', authenticate(true), (req, res) => {
    var id = req.params.id;
    var text = req.body.text;

    Todo.updateOne({'_id': id, 'owner': req.auth.user._id}, {$set: {text}}, {new: true}).then((r) => {
        if (!r) return res.status(404).send({message: "Not Found"});
        Todo.findById(id).then((r) => {
            if (!r) return res.status(404).send({message: "Not Found"});
            res.send(r);
        }, (e) => res.status(400).send({name: e.name, message: e.message}))

    }, (e) => res.status(400).send({name: e.name, message: e.message}))
});


// set todo as completed
router.patch('/:id/complete', authenticate(true), (req, res) => {
    var id = req.params.id;

    console.log('complete')

    Todo.updateOne({'_id': id, 'owner': req.auth.user._id}, {$set: {complete: true}}, {new: true}).then((r) => {
        if (!r) return res.status(404).send({message: "Not Found"});
        Todo.findById(id).then((r) => {
            if (!r) return res.status(404).send({message: "Not Found"});
            res.send(r);
        }, (e) => res.status(400).send({name: e.name, message: e.message}))

    }, (e) => res.status(400).send({name: e.name, message: e.message}))
});

// set todo as not completed
router.patch('/:id/notcomplete', authenticate(true), (req, res) => {
    var id = req.params.id;

    console.log('not complete')

    Todo.updateOne({'_id': id, 'owner': req.auth.user._id}, {$set: {complete: false}}, {new: true}).then((r) => {
        if (!r) return res.status(404).send({message: "Not Found"});
        Todo.findById(id).then((r) => {
            if (!r) return res.status(404).send({message: "Not Found"});
            res.send(r);
        }, (e) => res.status(400).send({name: e.name, message: e.message}))

    }, (e) => res.status(400).send({name: e.name, message: e.message}))

});

// delete todo
router.delete('/:id', authenticate(true), (req, res) => {
    var id = req.params.id;

    Todo.deleteOne({'_id': id, 'owner': req.auth.user._id}).then((r) => {
        if (!r) return res.status(404).send({message: "Not Found"});
        res.send(r);
    }, (e) => {
        res.status(400).send({name: e.name, message: e.message});
    })
});


module.exports = router;
