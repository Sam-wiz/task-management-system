const pool = require('../config/db');
const createTask = async (title, description, status, priority, due_date, user_id) => {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, status, priority, due_date, user_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, description, status, priority, due_date, user_id]
  );
  return result.rows[0];
};


const getTasks = async (user_id, filters = {}, search = '', page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { status, priority, due_date } = filters;
  let query = `SELECT * FROM tasks WHERE user_id = $1`;
  let queryParams = [user_id];

  if (status) {
    query += ` AND status = $${queryParams.length + 1}`;
    queryParams.push(status);
  }

  if (priority) {
    query += ` AND priority = $${queryParams.length + 1}`;
    queryParams.push(priority);
  }

  if (due_date) {
    query += ` AND due_date = $${queryParams.length + 1}`;
    queryParams.push(due_date);
  }

  if (search) {
    query += ` AND (title ILIKE $${queryParams.length + 1} OR description ILIKE $${queryParams.length + 1})`;
    queryParams.push(`%${search}%`);
  }

  query += ` ORDER BY due_date LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
  queryParams.push(limit, offset);

  const result = await pool.query(query, queryParams);
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
