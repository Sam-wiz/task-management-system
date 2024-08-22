const express = require('express');
const { create, getAll, update, remove } = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('', authenticateToken, create);
router.get('', authenticateToken, getAll);
router.put('/:taskId', authenticateToken, update);
router.delete('/:taskId', authenticateToken, remove);

module.exports = router;