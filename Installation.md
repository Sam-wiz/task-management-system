# Installation and Setup

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed. This project uses Node.js version 14.x.
2. **PostgreSQL**: Make sure PostgreSQL is installed and running.

## Installation via NPM

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sam-wiz/task-management-system-backend/
   cd task-management-system-backend/
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**

   Create a `.env` file in the root of the project directory and add the following environment variables:

   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Run Database Migrations**

   Ensure that your PostgreSQL database is set up and run the necessary migrations or schema setup:

   ```sql
   CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TYPE task_status AS ENUM ('Todo', 'In Progress', 'Done');
CREATE TYPE task_priority AS ENUM ('high', 'medium', 'low');

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status task_status DEFAULT 'Todo',
  priority task_priority DEFAULT 'medium',
  due_date TIMESTAMPTZ,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE user_role AS ENUM ('User', 'Admin');


ALTER TABLE users
ADD COLUMN role user_role DEFAULT 'User';

   ```

5. **Start the Application**

   ```bash
   npm start
   ```

   The application will be running on `http://localhost:3000`.

## Installation via Docker

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Build the Docker Image**

   ```bash
   docker build -t my-app .
   ```

3. **Create a `.env` File**

   Create a `.env` file in the root of the project directory with the following content:

   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Docker Container**

   ```bash
   docker-compose up
   ```

   The application will be running on `http://localhost:3000`.

## Troubleshooting

- **Database Connection Issues**: Ensure that the `DATABASE_URL` is correct and PostgreSQL is running.
- **Missing Environment Variables**: Make sure all required environment variables are set in the `.env` file.
- **Port Conflicts**: Ensure that port 3000 is not being used by another application.

For any additional help, refer to the [project README](README.md) or consult the project maintainers.
