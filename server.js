// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000; // Set the port for the server

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://salarkhan842:5F6qINhrHM4OyNkB@cluster1.i1neo5q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a Mongoose model for Todo items
const Todo = mongoose.model('Todo', { text: String });

// Route to create a new Todo
app.post('/todos', async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text }); // Create a new Todo object
    await todo.save(); // Save the Todo object to the database
    res.status(201).json(todo); // Respond with the created Todo object
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});

// Route to get all Todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find(); // Find all Todo objects in the database
    res.json(todos); // Respond with the array of Todo objects
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});

// Route to update a Todo
app.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true }); // Find and update the specified Todo object
    res.json(todo); // Respond with the updated Todo object
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});

// Route to delete a Todo
app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id); // Find and delete the specified Todo object
    res.status(204).end(); // Respond with status 204 (No Content) to indicate success
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
