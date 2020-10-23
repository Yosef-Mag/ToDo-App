const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo')



router.get('/todos', (req, res) => {
	Todo.find()
	    .then(todos => res.json(todos));
});


router.post('/', (req, res) => {
    const newTodo = new Todo({
        content: req.body.content
    });
        newTodo.save().then(todo => res.json(todo));
});


router.delete("/delete/:id", (req, res) => { 
    Todo.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
            .catch(err => res.status(404).json({ success: false }));
});



router.patch('/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(item => item.update({ content: req.body.content }).then(() => res.json({ success: true })))
});


module.exports = router;