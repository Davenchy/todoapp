const mongoose = require('mongoose');
module.exports = function (app, User, Todo) {


    // todo api routes:

    // create -
    // read -
    // read all -
    // edit
    // set as completed
    // set as not completed
    // delete

    // create new todo
    app.post('/todoapi/create', (req, res) => {
        const text = req.body.text;
        const owner = new mongoose.Types.ObjectId();

        var todo = new Todo({owner, text});
        todo.save().then((r) => {
            res.send(r.toJSON());
        }, (e) => {
            res.status(400).send({name: e.name, message: e.message});
        });

    });

    // read all
    app.get('/todoapi/read/:id', (req, res) => {
        const id = req.params.id;
        Todo.findById(id).then((r) => {
            if (!r) return res.status(404).send({message: 'Not Found'});
            res.send(r.toJSON());
        }, (e) => {
            res.status(400).send({name: e.name, message: e.message});
        })
    });

    // list all
    app.get('/todoapi/list', (req, res) => {
        console.log('list all');
        Todo.find().then((r) => {
            res.send(r);
        }, (e) => {
            res.status(400).send({name: e.name, message: e.message});
        })
    });

    // edit todo text
    app.put('/todoapi/edit/:id', (req, res) => {
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
    app.put('/todoapi/complete/:id', (req, res) => {
        var id = req.params.id;

        Todo.findByIdAndUpdate(id, {$set: {complete: true}}, {new: true}).then((r) => {
            if (!r) return res.status(404).send({message: "Not Found"});
            res.send(r.toJSON());
        }, (e) => {
            res.status(400).send({name: e.name, message: e.message});
        })
    });

    // set todo as not completed
    app.put('/todoapi/notcomplete/:id', (req, res) => {
        var id = req.params.id;

        Todo.findByIdAndUpdate(id, {$set: {complete: false}}, {new: true}).then((r) => {
            if (!r) return res.status(404).send({message: "Not Found"});
            res.send(r.toJSON());
        }, (e) => {
            res.status(400).send({name: e.name, message: e.message});
        })
    });

    // delete todo
    app.delete('/todoapi/delete/:id', (req, res) => {
        var id = req.params.id;

        Todo.findByIdAndDelete(id).then((r) => {
            if (!r) return res.status(404).send({message: "Not Found"});
            res.send(r.toJSON());
        }, (e) => {
            res.status(400).send({name: e.name, message: e.message});
        })
    });







}
