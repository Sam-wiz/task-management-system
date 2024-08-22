const express = require('express');
const { create, getAll, update, remove } = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/tasks', authenticateToken, create);
router.get('/tasks', authenticateToken, getAll);
router.put('/tasks/:taskId', authenticateToken, update);
router.delete('/tasks/:taskId', authenticateToken, remove);

module.exports = router;