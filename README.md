# Smart Task Management

This is a task management application built using the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. The project implements role-based access control (RBAC), task assignment with priorities, task dependencies, and notifications. It includes both the frontend (React) and backend (Node.js + Express) components, along with real-time notifications and full CRUD operations.

[GitHub Repository](https://github.com/Tohidul0/Task-Management)

## Project Overview

Smart Task Management is a collaborative task management tool designed to help users efficiently manage tasks and projects with different priorities. Key features of this project include:

- **JWT Authentication**: Secure login and user sessions with JWT and cookie management.
- **Role-Based Access Control (RBAC)**: Admin users can manage tasks and users, while regular users can only view and manage their own tasks.
- **Task Management**: Users can assign tasks with priorities (High, Medium, Low), set task dependencies, and view/manage their tasks.
- **Notifications**: Real-time notifications are sent to users when tasks are assigned or updated.
- **Full CRUD Operations**: Both task and user management are handled via the backend API.

---

## Technologies Used

### Frontend
- **React.js**: JavaScript library for building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Redux**: For state management.
- **React Router**: For navigation.
- **Swagger UI**: For API documentation.

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Framework for building the API.
- **TypeScript**: For type safety on the backend.
- **MongoDB**: Database for storing user and task data.
- **JWT**: For secure authentication and user session management.
- **Swagger**: For API documentation.

### Development Tools
- **Docker**: For containerizing the application.
- **Docker Compose**: For managing multi-container Docker applications.

---

## Features

- **User Authentication**: Register, login, and JWT-based authentication with cookies for secure user sessions.
- **Dashboard**: Both admins and users can view their ongoing tasks. Tasks are displayed in a chart format as well.
- **Role-Based Access Control (RBAC)**: 
  - Admins can assign tasks and manage all users.
  - Regular users can only view and manage their own tasks.
- **Task Management**: 
  - Assign tasks with priorities: High, Medium, Low.
  - Users can update, delete, and view their tasks.
  - Admin users can see and manage all tasks in the system.
- **Task Dependencies**: Tasks can have dependencies that users can view and manage.
- **Notifications**: Real-time notifications when tasks are assigned to users.
- **CRUD Operations**: Full CRUD functionality for managing tasks and users through the backend API.
- **API Documentation**: Swagger UI provides detailed API documentation for easy understanding of endpoints, request bodies, and responses.

---

## Installation

### Frontend Setup

1. **Clone the repository**:
   ```bash
2.
   git clone https://github.com/Tohidul0/Task-Management.git


 ** Navigate to the frontend directory**:


cd frontend
Install the dependencies:

bash
Copy code
npm install
Run the frontend app:

bash
Copy code
npm start
The frontend application will be running on http://localhost:5173.

Backend Setup
Navigate to the backend directory:

bash
Copy code
cd backend
Create a .env file and add the following environment variables:

bash
Copy code
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-jwt-secret>
Install the backend dependencies:

bash
Copy code
npm install
Run the backend server:

bash
Copy code
npm run dev
The backend server will be running on http://localhost:3000.

API Documentation
The API documentation is available via Swagger UI. To view it, open the Swagger UI at the following endpoint:

bash
Copy code
http://localhost:3000/api-docs
This UI includes detailed information about all the available API endpoints, request bodies, and expected responses.

Environment Variables
Create a .env file in the backend folder with the following variables:

bash
Copy code
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-jwt-secret>
##Conclusion
This project demonstrates the ability to manage tasks, implement role-based access control, handle real-time notifications, and design a modular, scalable architecture using MERN stack and TypeScript. The application is built with flexibility in mind, allowing admins and users to efficiently manage tasks and collaborate seamlessly.


