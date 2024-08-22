## Description

This project is a task management application with role-based access control. It allows users to create, read, update, and delete tasks. Users are assigned different roles with varying permissions:

- **User**: Can create, access, update, and delete their own tasks.
- **Admin**: Can perform all actions of a User plus manage tasks for any user and assign tasks to users.

## Features

- **User Management**: Registration and login with role-based permissions.
- **Task Management**: Create, view, update, and delete tasks with role-based access control.
- **Filtering and Search**: Filter tasks by status, priority, and due date, and search by title or description.
- **Pagination**: Support for paginated task retrieval.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **PostgreSQL**: Relational database for storing user and task data.
- **JWT**: Token-based authentication for secure API access.
- **Docker**: Containerization for consistent development and deployment environments.

## Directory Structure

- `models/`: Contains database models and queries.
- `controllers/`: Contains business logic for handling requests.
- `routes/`: Defines the API endpoints and middleware.
- `middleware/`: Contains authentication and authorization middleware.
- `config/`: Configuration files, including database connection setup.
- `index.js`: Entry point of the application.

## Running the Application

For detailed instructions on how to run the application locally, refer to the [Installation](Installation.md) file.

## API Endpoint Doc

For detailed info check out the collection on [Postman](https://www.postman.com/sam-wiz/workspace/gokapture/collection/34260692-aa450db0-3701-4d39-9e9d-7b620d11f5d3?action=share&creator=34260692)

## Aproach Doc

Check out the [Approach](Approach.md) doc

## Contributing

If you would like to contribute to this project, please follow the standard Git workflow:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [samrudhvvandakudri2005@gmail.com](mailto:samrudhvvandakudri2005@gmail.com).
