## Approach and Assumptions

### Approach

1. **Role-Based Access Control (RBAC)**:
   - The application implements role-based access control to differentiate permissions between `User` and `Admin`. 
   - **Users** can only manage their own tasks, while **Admins** have permissions to manage all tasks across different users.

2. **Database Design**:
   - Two primary tables are used: `users` and `tasks`.
   - The `users` table stores user credentials and roles. The `tasks` table stores task details and associates each task with a user.

3. **API Endpoints**:
   - The API provides endpoints for user registration, authentication, and task management.
   - **Users** can create, view, update, and delete their own tasks.
   - **Admins** can perform these operations on any task and can also assign tasks to other users.

4. **Token-Based Authentication**:
   - JWT (JSON Web Tokens) is used for user authentication and authorization.
   - Tokens are passed in the `Authorization` header for accessing protected routes.

5. **Error Handling**:
   - The application includes error handling for various scenarios, such as invalid input, unauthorized access, and server errors.

6. **Pagination and Filtering**:
   - The `GET /api/tasks` endpoint supports pagination and filtering by status, priority, due date, and search keywords.

### Assumptions

1. **Database Setup**:
   - It is assumed that PostgreSQL is used as the database system.
   - The database schema includes ENUM types for task statuses and priorities, which are used to enforce valid values.

2. **Environment Variables**:
   - It is assumed that necessary environment variables like `DATABASE_URL` and `JWT_SECRET` are properly set in the environment or Docker configuration.

3. **Authentication**:
   - It is assumed that JWT tokens are issued with the necessary claims (such as `role` and `userId`) and that they are properly validated for each request.

4. **Error Responses**:
   - The API handles errors by providing appropriate HTTP status codes and error messages. It assumes that client applications can handle and interpret these responses.

5. **Filtering and Search**:
   - It is assumed that the query parameters used for filtering and searching tasks are in a format that can be processed by SQL queries.

6. **Data Integrity**:
   - It is assumed that the application enforces data integrity, such as unique constraints on usernames and foreign key constraints between tasks and users.

7. **Server Setup**:
   - It is assumed that Node.js is used as the server runtime, and the application is capable of running either directly via `npm` or inside a Docker container.

---
