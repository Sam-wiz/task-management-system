const { createTask, getTasks, updateTask, deleteTask } = require('../models/Task');

const create = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const validStatuses = ['Todo', 'In Progress', 'Done'];
    const validPriorities = ['high', 'medium', 'low'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority value' });
    }

    const task = await createTask(title, description, status, priority, due_date, req.user.userId);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const tasks = await getTasks(req.user.userId);
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

    const task = await updateTask(taskId, title, description, status, priority);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { taskId } = req.params;
    await deleteTask(taskId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { create, getAll, update, remove };
