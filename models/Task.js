const pool = require('../config/db');
const createTask = async (title, description, status, priority, due_date, user_id) => {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, status, priority, due_date, user_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, description, status, priority, due_date, user_id]
  );
  return result.rows[0];
};


const getTasks = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM tasks WHERE user_id = $1 ORDER BY due_date`,
    [user_id]
  );
  return result.rows;
};


const updateTask = async (taskId, title, description, status, priority) => {
  const result = await pool.query(
    `UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, updated_at = NOW()
     WHERE id = $5 RETURNING *`,
    [title, description, status, priority, taskId]
  );
  return result.rows[0];
};


const deleteTask = async (taskId) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
