# Task Manager Application

This project is a full-stack task management application built with a Node.js backend and a React frontend. The backend uses Express.js for the server, Mongoose for MongoDB interactions, and various other libraries for authentication, validation, and security. The frontend is built with React and Vite, utilizing Redux for state management and Tailwind CSS for styling.

## Table of Contents

- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Frontend Features](#frontend-features)
- [Example Usage](#example-usage)

## Project Structure

```
ddreg-assignment/
├── backend/
│   ├── config/
│   │   └── connectdb.js
│   ├── controllers/
│   │   ├── task.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── task.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── task.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── task.service.js
│   │   └── user.service.js
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Charts.jsx
│   │   │   ├── CreateTask.jsx
│   │   │   ├── DeleteModal.jsx
│   │   │   ├── Filters.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── TaskDetailsModal.jsx
│   │   │   ├── TaskTable.jsx
│   │   │   └── UpdateModal.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── UserForm.jsx
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── taskSlice.js
│   │   ├── utils/
│   │   │   ├── axiosInstance.js
│   │   │   └── summaryAPI.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── Provider/
│   │       └── AuthProvider.jsx
│   ├── .gitignore
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
└── README.md
```

## Backend Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    MONGODB_URI=mongodb://localhost:27017/<Your db name>
    JWT_SECRET=random@secret
    CLIENT_URL=http://localhost:5173
    PORT=3000
    ```

4. Start the backend server:
    ```sh
    npm run server
    ```

### Folder Structure

- `config/`: Contains the database connection configuration.
- `controllers/`: Contains the logic for handling requests and responses.
- `middleware/`: Contains middleware functions for authentication.
- `models/`: Contains the Mongoose schemas for the database.
- `routes/`: Contains the route definitions for the API.
- `services/`: Contains the business logic for interacting with the database.

## Frontend Setup

### Prerequisites

- Node.js

### Installation

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

### Folder Structure

- `components/`: Contains reusable React components.
- `pages/`: Contains the main pages of the application.
- `store/`: Contains the Redux store and slices.
- `utils/`: Contains utility functions and configurations.
- `Provider/`: Contains the authentication provider component.

## API Documentation

### User Routes

- **Register User**
  - **URL**: `/api/auth/register`
  - **Method**: `POST`
  - **Body**:
     ```json
     {
        "username": "string",
        "email": "string",
        "password": "string"
     }
     ```
  - **Response**:
     ```json
     {
        "success": true,
        "message": "User registered successfully",
        "token": "string"
     }
     ```

- **Login User**
  - **URL**: `/api/auth/login`
  - **Method**: `POST`
  - **Body**:
     ```json
     {
        "email": "string",
        "password": "string"
     }
     ```
  - **Response**:
     ```json
     {
        "success": true,
        "message": "User logged in successfully",
        "token": "string"
     }
     ```

- **Logout User**
  - **URL**: `/api/auth/logout`
  - **Method**: `GET`
  - **Response**:
     ```json
     {
        "success": true,
        "message": "User logged out successfully"
     }
     ```

### Task Routes

- **Create Task**
  - **URL**: `/tasks`
  - **Method**: `POST`
  - **Body**:
     ```json
     {
        "title": "string",
        "description": "string",
        "dueDate": "date",
        "priority": "High|Medium|Low"
     }
     ```
  - **Response**:
     ```json
     {
        "success": true,
        "message": "Task created successfully",
        "newTask": {
          "title": "string",
          "description": "string",
          "dueDate": "date",
          "priority": "High|Medium|Low",
          "createdBy": "string",
          "completed": false,
          "completedAt": null,
          "_id": "string",
          "createdAt": "date",
          "updatedAt": "date"
        }
     }
     ```

- **Get All Tasks**
  - **URL**: `/tasks`
  - **Method**: `GET`
  - **Response**:
     ```json
     {
        "success": true,
        "task": [
          {
             "_id": "string",
             "title": "string",
             "description": "string",
             "dueDate": "date",
             "priority": "High|Medium|Low",
             "status": "Pending|In Progress|Completed",
             "createdBy": "string",
             "completed": false,
             "completedAt": null,
             "createdAt": "date",
             "updatedAt": "date"
          }
        ]
     }
     ```

- **Get Task By ID**
  - **URL**: `/tasks/:id`
  - **Method**: `GET`
  - **Response**:
     ```json
     {
        "success": true,
        "task": {
          "_id": "string",
          "title": "string",
          "description": "string",
          "dueDate": "date",
          "priority": "High|Medium|Low",
          "status": "Pending|In Progress|Completed",
          "createdBy": "string",
          "completed": false,
          "completedAt": null,
          "createdAt": "date",
          "updatedAt": "date"
        }
     }
     ```

- **Update Task**
  - **URL**: `/tasks/:id`
  - **Method**: `PUT`
  - **Body**:
     ```json
     {
        "title": "string",
        "description": "string",
        "dueDate": "date",
        "priority": "High|Medium|Low",
        "status": "Pending|In Progress|Completed"
     }
     ```
  - **Response**:
     ```json
     {
        "success": true,
        "message": "Task updated successfully",
        "data": {
          "_id": "string",
          "title": "string",
          "description": "string",
          "dueDate": "date",
          "priority": "High|Medium|Low",
          "status": "Pending|In Progress|Completed",
          "createdBy": "string",
          "completed": false,
          "completedAt": null,
          "createdAt": "date",
          "updatedAt": "date"
        }
     }
     ```

- **Delete Task**
  - **URL**: `/tasks/:id`
  - **Method**: `DELETE`
  - **Response**:
     ```json
     {
        "success": true,
        "message": "Task deleted successfully"
     }
     ```

- **Get Dashboard Analytics**
  - **URL**: `/analytics`
  - **Method**: `GET`
  - **Response**:
     ```json
     {
        "success": true,
        "message": "Dashboard analytics fetched successfully",
        "data": {
          "priorityData": {
             "highPriority": 0,
             "mediumPriority": 0,
             "lowPriority": 0,
             "totalTasks": 0
          },
          "dayWiseCompletionData": [
             {
                "day": "date",
                "totalTasks": 0,
                "completedTasks": 0,
                "completionPercentage": 0
             }
          ]
        }
     }
     ```

## Frontend Features

- **User Authentication**: Users can register, log in, and log out.
- **Task Management**: Users can create, update, delete, and view tasks.
- **Task Filtering**: Users can filter tasks by status, priority, and search queries.
- **Task Analytics**: Users can view task priority distribution and completion over time using charts.
- **Responsive Design**: The application is responsive and works well on different screen sizes.

## Example Usage

### Register a New User

```sh
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
     "username": "john_doe",
     "email": "john@example.com",
     "password": "password123"
  }'
```

### Log in a User

```sh
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
     "email": "john@example.com",
     "password": "password123"
  }'
```

### Create a New Task

```sh
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
     "title": "New Task",
     "description": "This is a new task",
     "dueDate": "2023-12-31",
     "priority": "High"
  }'
```

### Get All Tasks

```sh
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer <token>"
```

### Update a Task

```sh
curl -X PUT http://localhost:3000/tasks/<task_id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
     "title": "Updated Task",
     "description": "This is an updated task",
     "dueDate": "2023-12-31",
     "priority": "Medium",
     "status": "In Progress"
  }'
```

### Delete a Task

```sh
curl -X DELETE http://localhost:3000/tasks/<task_id> \
  -H "Authorization: Bearer <token>"
```

### Get Dashboard Analytics

```sh
curl -X GET http://localhost:3000/analytics \
  -H "Authorization: Bearer <token>"
```

## Conclusion

This project provides a comprehensive task management solution with a robust backend and a user-friendly frontend. It includes features for user authentication, task management, and data visualization, making it a powerful tool for managing tasks efficiently.

Feel free to contribute to this project by submitting issues or pull requests on the GitHub repository.
