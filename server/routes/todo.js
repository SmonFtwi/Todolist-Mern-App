const express = require('express');
const router = express.Router();
const Todo = require('../model/todo');
const User = require('../model/user.model')
const authMiddleware = require('../middleware/authMiddleware')

// get 
router.get('/todo', authMiddleware, async (req, res, next) => {
    try {
      const userId = req.user.id; // Get the user ID from the token
      const todos = await Todo.find({ user: userId }); // Retrieve todos associated with the user ID
   
  
      res.json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error); // Log any errors
      res.status(500).json({ error: 'An error occurred while fetching todos' });
    }
  });

  // completed task only
  router.get('/todo/completed', authMiddleware, async (req, res, next) => {
    try {
      const userId = req.user.id; // Get the user ID from the token
        const todos = await Todo.find({
          user: userId,
          $and: [{complete: 'true'} ],
        });
    res.json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error); // Log any errors
      res.status(500).json({ error: 'An error occurred while fetching todos' });
    }
  });
  
  // today tasks 
  router.get('/todo/today', authMiddleware, async (req, res, next) => {
    try {
      const userId = req.user.id; // Get the user ID from the token
     
      
    const today = new Date().toISOString().split('T')[0];
    const todos = await Todo.find({
      user: userId,
      $and: [{ dueDate: today }],
    });
    res.json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error); // Log any errors
      res.status(500).json({ error: 'An error occurred while fetching todos' });
    }
  });
 // this week tasks 
 router.get('/todo/thisWeek', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id; // Get the user ID from the token
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const todos = await Todo.find({
        user: userId,
        $and: [
          { dueDate: { $gte: today } }, // Todos with due dates greater than or equal to today
          { dueDate: { $lte: nextWeek } }, // Todos with due dates less than or equal to nextWeek
        ],
      });
      
       res.json(todos);

  } catch (error) {
    console.error('Error fetching todos:', error); // Log any errors
    res.status(500).json({ error: 'An error occurred while fetching todos' });
  }
});

// Post 
router.post('/todo/new',authMiddleware ,async (req, res, next) => {
    try {
        console.log(req.user);
      const userId = req.user.id; // Modify this based on your authentication method
      
      console.log('User ID from token:', userId);
      const newTodo =  new Todo({
        user: userId,
        title: req.body.title,
        dueDate: req.body.dueDate,
         // Link the todo to the user
      });
      console.log(newTodo.user)
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
      
     
    
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'An error occurred while creating the todo' });
    }
  });
  
  router.delete('/todo/delete/:id' , authMiddleware, async(req, res) => {
    const userId = req.user.id; // Get the user ID from the token
    const todos = await Todo.find({ user: userId });
    if (todos){
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result)
    }

   
});

router.put('/todo/complete/:id', authMiddleware, async (req, res) => {
  const userId = req.user.id; // Get the user ID from the token
    const todos = await Todo.find({ user: userId });
    if (todos){
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.complete = !todo.complete;

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error("Error toggling completion status: ", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
});
//put 
router.put('/todo/update/:id', authMiddleware,async (req, res) => {
  const userId = req.user.id; // Get the user ID from the token
  const todos = await Todo.find({ user: userId });
  if (todos){
	const todo = await Todo.findById(req.params.id);

	todo.title = req.body.title;
  todo.dueDate = req.body.dueDate

	todo.save();

	res.json(todo);
  }
});
  module.exports = router;