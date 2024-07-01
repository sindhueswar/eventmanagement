# Event Management System

## Description

This project is an event management system that provides CRUD operations using JWT token-based authentication and authorization.

## Technologies Used

- Backend:
  - Node.js
  - Express
  - MongoDB

- Frontend:
  - Vite
  - React

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- MongoDB installed and running locally or accessible remotely

### Installation and Setup

1. **Clone the repository:**

   ```bash
   
   git clone https://github.com/sindhuesawr/event-management.git
   cd event-management
   
2.**Install backend dependencies:**
    ```bash

    npm install
    Set up environment variables:

Create a .env file in the root of the project with the following content:
    ```bash
    
    DB_URI= <your_mongodb_string>
    SECRET= <your_secret>

Adjust DB_URI and SECRET as per your MongoDB setup and JWT secret.

**3.Install frontend dependencies:**
    ```bash
    
     cd client
     npm install
    
Running the Application
**4.Start the backend server:**

In the project root directory:
    ```bash
    
    npm start


This will start the Node.js server using Express.

Start the frontend development server:

Open a new terminal window/tab, navigate to the client directory, and run:
    ```bash
    
    npm run dev
This will start the Vite development server for the React frontend.
