# Approach Documentation

This document describes the approach for developing and implementing a task management application with role-based access control. The application supports user and admin roles, allowing for the creation, retrieval, update, and deletion of tasks. Admins have broader permissions compared to regular users.

### Technologies

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Containerization**: Docker

### Database Schema

**Users Table**:
- `id`: Unique identifier for the user.
- `username`: Unique username for login.
- `password`: Hashed password.
- `role`: User role (either `User` or `Admin`).
- `created_at`: Timestamp of user creation.

**Tasks Table**:
- `id`: Unique identifier for the task.
- `title`: Title of the task.
- `description`: Detailed description of the task.
- `status`: Current status of the task (`Todo`, `In Progress`, `Done`).
- `priority`: Priority level of the task (`high`, `medium`, `low`).
- `due_date`: Due date of the task.
- `user_id`: Foreign key linking to the user who owns the task.
- `created_at`: Timestamp of task creation.
- `updated_at`: Timestamp of last update.

### Endpoints

**User Endpoints**:
1. **Register User**:
   - Registers a new user with a given username, password, and role.
2. **Login User**:
   - Authenticates a user and provides a JWT token for subsequent requests.

**Task Endpoints**:
1. **Create Task**:
   - Allows users to create tasks. Admins can assign tasks to any user; otherwise, tasks are assigned to the requesting user.
2. **Get Tasks**:
   - Retrieves tasks with optional filtering and search parameters. Admins can view all tasks, while regular users can only view their own tasks.
3. **Update Task**:
   - Updates an existing task. Admins can update any task, while regular users can only update their own tasks.
4. **Delete Task**:
   - Deletes a task. Admins can delete any task, while regular users can only delete their own tasks.

### Authentication & Authorization

- **Authentication**:
  - Implemented using JWT. Tokens are issued upon successful login and must be included in the `Authorization` header for protected routes.

- **Authorization**:
  - Role-based access control ensures that users can only perform actions permitted by their role.
    - **Admin**: Can create, read, update, and delete any task, and assign tasks to any user.
    - **User**: Can create, read, update, and delete only their own tasks.

### Error Handling

- **400 Bad Request**: Returned for invalid input or parameters.
- **401 Unauthorized**: Returned for missing or invalid authentication tokens.
- **403 Forbidden**: Returned for insufficient permissions.
- **404 Not Found**: Returned when a resource does not exist.
- **500 Internal Server Error**: Returned for server-side errors.

### Filtering and Searching

- **Filters**:
  - `status`: Filter tasks by their status (`Todo`, `In Progress`, `Done`).
  - `priority`: Filter tasks by priority (`high`, `medium`, `low`).
  - `due_date`: Filter tasks by due date (`YYYY-MM-DD`).

- **Search**:
  - `search`: Search tasks by title or description (case-insensitive).

- **Pagination**:
  - `page`: Page number for pagination (default is 1).
  - `limit`: Number of tasks per page (default is 10).

### Deployment

**Local Deployment**:

1. **Using npm**:
   - Clone the repository.
   - Install dependencies: `npm install`.
   - Start the server: `npm start`.

2. **Using Docker**:
   - Build the Docker image: `docker build -t task-manager .`.
   - Run the Docker container: `docker run -p 3000:3000 -e DATABASE_URL=<your-database-url> -e JWT_SECRET=<your-jwt-secret> task-manager`.

**Docker Compose**:
   - Build and run the application using Docker Compose: `docker-compose up`.

### Development Workflow

1. **Setup**:
   - Set up the database schema.
   - Configure environment variables for JWT secret and database URL.

2. **Development**:
   - Implement and test API endpoints.
   - Use role-based access control to manage permissions.

3. **Testing**:
   - Write unit and integration tests.
   - Ensure all endpoints adhere to the expected behavior.

4. **Deployment**:
   - Deploy using Docker or npm based on the environment.

---
