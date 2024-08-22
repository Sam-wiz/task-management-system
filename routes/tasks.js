const express = require('express');
const { create, getAll, update, remove } = require('../controllers/taskController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.post('', authenticateToken, authorizeRole(['Admin', 'User']), create);
router.get('', authenticateToken, authorizeRole(['Admin', 'User']), getAll);
router.put('/:taskId', authenticateToken, authorizeRole(['Admin', 'User']), update);
router.delete('/:taskId', authenticateToken, authorizeRole(['Admin']), remove);

module.exports = router;
