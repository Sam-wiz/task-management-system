const { createTask, getTasks, updateTask, deleteTask } = require('../models/Task');
const pool = require('../config/db');

const create = async (req, res) => {
  try {
    const { title, description, status, priority, due_date, user_id } = req.body;

    const validStatuses = ['Todo', 'In Progress', 'Done'];
    const validPriorities = ['high', 'medium', 'low'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority value' });
    }

    const assigneeId = req.user.role === 'Admin' ? user_id || req.user.userId : req.user.userId;

    const task = await createTask(title, description, status, priority, due_date, assigneeId);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


const getAll = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      due_date: req.query.due_date
    };
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    console.log('User Role:', req.user.role); 
    console.log('User ID:', req.user.userId); 

    const tasks = await getTasks(req.user, filters, search, page, limit);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



const update = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority } = req.body;

    const validStatuses = ['Todo', 'In Progress', 'Done'];
    const validPriorities = ['high', 'medium', 'low'];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority value' });
    }
    const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    if (task.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const existingTask = task.rows[0];
    if (req.user.role !== 'Admin' && existingTask.user_id !== req.user.userId) {
      return res.status(403).json({ message: 'Access Denied' });
    }
    const updatedTask = await updateTask(taskId, title, description, status, priority);
    res.json(updatedTask);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


const remove = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    if (task.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const existingTask = task.rows[0];
    if (req.user.role !== 'Admin' && existingTask.user_id !== req.user.userId) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};




module.exports = { create, getAll, update, remove };
