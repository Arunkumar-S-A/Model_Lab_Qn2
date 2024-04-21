const express = require('express');
const router = express.Router();
const Todo = require('../models/todomodel');

// Route to get all todos
router.route('/').get((req, res) => {
    console.log(req.body);
    Todo.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to add a new todo
router.route('/add').post((req, res) => {
    console.log(req.body);

    const { description, completed } = req.body.description;

    if (!description) {
        return res.status(400).json('Description is required');
    }

    const newTodo = new Todo({
        description,
        completed
    });

    newTodo.save()
        .then(todo => {
            console.log('Todo saved:', todo);
            res.status(201).json('Todo added successfully');
        })
        .catch(err => {
            console.error('Error saving todo:', err);
            res.status(400).json('Error: ' + err);
        });
});

// Route to get a specific todo by ID
router.route('/:id').get((req, res) => {
    console.log(req.body);

    Todo.findById(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).json('Todo not found');
            }
            res.json(todo);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to delete a todo by ID
router.route('/:id').delete((req, res) => {
    console.log(req.body);

    Todo.findByIdAndDelete(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).json('Todo not found');
            }
            res.json('Todo deleted.');
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to update a todo by ID
router.route('/update/:id').put((req, res) => {
    console.log(req.body);
    const { description, completed } = req.body;

    if (!description) {
        return res.status(400).json('Description is required');
    }

    Todo.findById(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).json('Todo not found');
            }

            todo.description = description;
            todo.completed = completed;

            todo.save()
                .then(() => res.json('Todo updated!'))
                .catch(err => res.status(400).json('Error updating todo: ' + err));
        })
        .catch(err => res.status(400).json('Error finding todo: ' + err));
});

module.exports = router;
