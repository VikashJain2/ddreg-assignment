<<<<<<< HEAD
=======
# Backend Documentation

## Overview

This backend is built using Node.js, Express, and MongoDB. It provides a RESTful API for managing users and tasks. The backend includes user authentication, task creation, and retrieval functionalities.

## Folder Structure

```
backend/
├── .env
├── .gitignore
├── index.js
├── package.json
├── config/
│   └── connectdb.js
├── controllers/
│   ├── task.controller.js
│   └── user.controller.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── task.model.js
│   └── user.model.js
├── routes/
│   ├── task.routes.js
│   └── user.routes.js
└── services/
    └── user.service.js
```

## Configuration

### Environment Variables

The backend uses the following environment variables, defined in the `.env.example` file:

```
MONGODB_URI=mongodb://localhost:27017/'your-database'
JWT_SECRET=random@secret
CLIENT_URL=http://localhost:8080
PORT=3000
```

## API Endpoints

### User Routes

- **POST /api/auth/register**: Register a new user.
  - **Request Body**:
    ```json
    {
      "username": "exampleUser",
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "userId",
        "username": "exampleUser",
        "email": "user@example.com"
      }
    }
    ```

- **POST /api/auth/login**: Login a user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Login successful",
      "token": "jwtToken"
    }
    ```

- **GET /api/auth/logout**: Logout a user.
  - **Response**:
    ```json
    {
      "message": "Logout successful"
    }
    ```

### Task Routes

- **POST /tasks**: Create a new task (requires authentication).
  - **Request Body**:
    ```json
    {
      "title": "New Task",
      "description": "Task description",
      "dueDate": "2023-12-31",
      "priority": "High"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Task created successfully",
      "task": {
        "id": "taskId",
        "title": "New Task",
        "description": "Task description",
        "dueDate": "2023-12-31",
        "priority": "High",
        "assignedUser": "userId",
        "creator": "userId"
      }
    }
    ```

- **GET /tasks**: Get all tasks for the authenticated user.
  - **Response**:
    ```json
    [
      {
        "id": "taskId",
        "title": "Task 1",
        "description": "Task 1 description",
        "dueDate": "2023-12-31",
        "priority": "High",
        "assignedUser": "userId",
        "creator": "userId"
      },
      {
        "id": "taskId2",
        "title": "Task 2",
        "description": "Task 2 description",
        "dueDate": "2023-12-31",
        "priority": "Medium",
        "assignedUser": "userId",
        "creator": "userId"
      }
    ]
    ```

- **GET /tasks/:id**: Get a specific task by ID.
  - **Response**:
    ```json
    {
      "id": "taskId",
      "title": "Task 1",
      "description": "Task 1 description",
      "dueDate": "2023-12-31",
      "priority": "High",
      "assignedUser": "userId",
      "creator": "userId"
    }
    ```

- **PUT /tasks/:id**: Update a specific task by ID.
  - **Request Body**:
    ```json
    {
      "title": "Updated Task",
      "description": "Updated description",
      "dueDate": "2024-01-31",
      "priority": "Low"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Task updated successfully",
      "task": {
        "id": "taskId",
        "title": "Updated Task",
        "description": "Updated description",
        "dueDate": "2024-01-31",
        "priority": "Low",
        "assignedUser": "userId",
        "creator": "userId"
      }
    }
    ```

- **DELETE /tasks/:id**: Delete a specific task by ID.
  - **Response**:
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```

## Middleware

### Authentication Middleware

`auth.middleware.js` checks for a valid JWT token in the request cookies and verifies it. If the token is valid, the user information is attached to the request object.

## Models

### User Model

`user.model.js` defines the schema for the User collection in MongoDB, including fields for username, email, password, and tasks assigned.

### Task Model

`task.model.js` defines the schema for the Task collection in MongoDB, including fields for title, description, due date, priority, assigned user, and creator.

## Controllers

### User Controller

`user.controller.js` handles user registration, login, fetching user info, and logout functionalities.

### Task Controller

`task.controller.js` handles task creation, retrieval, updating, and deletion functionalities.

## Services

### User Service

`user.service.js` contains business logic for creating and logging in users, including checking for existing users and password comparison.

## Database Connection

`connectdb.js` handles the connection to the MongoDB database using Mongoose.

## Running the Server

To start the server, run the following command:

```bash
npm run server
```

The server will start on the port defined in the `.env` file (default is 3000).

## Conclusion

This backend provides a robust API for managing users and tasks, with authentication and authorization mechanisms in place. It is designed to be easily extendable and maintainable.
>>>>>>> 6112b9ba734c6b444fca7f77fbb01b106692c65e
